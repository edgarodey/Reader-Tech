// Reader Side Panel Logic

let currentTab = null;
let currentDocInfo = null;
let sentences = [];
let currentIndex = -1;
let isPlaying = false;
let isPaused = false;
let speechVoices = [];
let selectedVoiceId = "";
let selectedGender = "female";
let currentRate = 1.0;

const docTitleEl = document.getElementById("docTitle");
const docUrlEl = document.getElementById("docUrl");
const statusTextEl = document.getElementById("statusText");
const sentenceTextEl = document.getElementById("sentenceText");
const chunkCounterEl = document.getElementById("chunkCounter");
const progressSliderEl = document.getElementById("progressSlider");
const progressPercentEl = document.getElementById("progressPercent");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnGenderToggle = document.getElementById("btnGenderToggle");
const selectSpeed = document.getElementById("selectSpeed");
const selectVoice = document.getElementById("selectVoice");
const btnFetchText = document.getElementById("btnFetchText");
const btnOpenInApp = document.getElementById("btnOpenInApp");

// Sentence splitter helper
function splitSentences(text) {
  if (!text) return [];
  return text
    .replace(/\r\n/g, "\n")
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"'])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
}

// Heuristic voice classification
function classifyVoices(rawList) {
  return rawList.map((v) => {
    const lower = (v.name + " " + (v.voiceURI || "")).toLowerCase();
    let gender = "neutral";
    if (
      /\b(david|guy|george|james|mark|daniel|oliver|arthur|stefan|ryan|liam|richard|tom|thomas|alex|fred|ralph|junior|albert|male|en-us-standard-b|en-us-standard-d|en-us-wavenet-b|en-us-wavenet-d)\b/i.test(lower) ||
      lower.includes("(male)")
    ) {
      gender = "male";
    } else if (
      /\b(zira|jenny|sonia|aria|sara|sarah|emma|ava|samantha|victoria|karen|catherine|susan|hazel|heera|female|en-us-standard-a|en-us-standard-c|en-us-standard-e|en-us-wavenet-a|en-us-wavenet-c)\b/i.test(lower) ||
      lower.includes("(female)")
    ) {
      gender = "female";
    }

    const isNatural =
      lower.includes("natural") ||
      lower.includes("neural") ||
      lower.includes("online") ||
      lower.includes("google") ||
      lower.includes("enhanced") ||
      lower.includes("wavenet");

    return {
      id: v.voiceURI || v.name,
      name: v.name,
      lang: v.lang,
      gender,
      isNatural,
    };
  });
}

// Load and populate speech voices
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  const raw = window.speechSynthesis.getVoices();
  if (!raw || raw.length === 0) return;

  speechVoices = classifyVoices(raw).sort((a, b) => {
    if (a.isNatural && !b.isNatural) return -1;
    if (!a.isNatural && b.isNatural) return 1;
    return 0;
  });

  selectVoice.innerHTML = "";
  speechVoices.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = `${v.name} (${v.lang}) ${v.gender === "male" ? "• 👨 Male" : v.gender === "female" ? "• 👩 Female" : ""} ${v.isNatural ? "• ✨ Natural" : ""}`;
    selectVoice.appendChild(opt);
  });

  // Pick initial voice matching selected gender
  const initial =
    speechVoices.find((v) => v.gender === selectedGender && v.isNatural) ||
    speechVoices.find((v) => v.gender === selectedGender) ||
    speechVoices[0];

  if (initial) {
    selectedVoiceId = initial.id;
    selectVoice.value = initial.id;
  }
}

// 1-Tap Gender Switcher
function toggleGender() {
  selectedGender = selectedGender === "male" ? "female" : "male";
  btnGenderToggle.textContent = selectedGender === "male" ? "👨 Male" : "👩 Female";

  const match =
    speechVoices.find((v) => v.gender === selectedGender && v.isNatural) ||
    speechVoices.find((v) => v.gender === selectedGender);

  if (match) {
    selectedVoiceId = match.id;
    selectVoice.value = match.id;
  }
}

// Speech synthesis execution
function speakCurrentSentence() {
  if (!("speechSynthesis" in window) || currentIndex < 0 || currentIndex >= sentences.length) {
    return;
  }

  window.speechSynthesis.cancel();
  const text = sentences[currentIndex];
  sentenceTextEl.textContent = text;
  chunkCounterEl.textContent = `${currentIndex + 1} / ${sentences.length}`;

  const pct = Math.round(((currentIndex + 1) / sentences.length) * 100);
  progressSliderEl.value = pct;
  progressPercentEl.textContent = `${pct}%`;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = currentRate;
  utterance.pitch = 1.02; // Warm inflection default

  if (selectedVoiceId) {
    const raw = window.speechSynthesis.getVoices();
    const matched = raw.find((v) => (v.voiceURI || v.name) === selectedVoiceId);
    if (matched) utterance.voice = matched;
  }

  utterance.onend = () => {
    if (isPlaying && currentIndex + 1 < sentences.length) {
      currentIndex++;
      speakCurrentSentence();
    } else {
      isPlaying = false;
      btnPlay.textContent = "▶";
    }
  };

  utterance.onerror = (e) => {
    console.warn("Speech error:", e);
    if (isPlaying && currentIndex + 1 < sentences.length) {
      currentIndex++;
      speakCurrentSentence();
    }
  };

  window.speechSynthesis.speak(utterance);
}

// Play / Pause toggle
function togglePlay() {
  if (sentences.length === 0) {
    fetchActivePageContent();
    return;
  }

  if (isPlaying) {
    isPlaying = false;
    isPaused = true;
    window.speechSynthesis.pause();
    btnPlay.textContent = "▶";
  } else {
    isPlaying = true;
    if (isPaused) {
      isPaused = false;
      window.speechSynthesis.resume();
    } else {
      if (currentIndex < 0) currentIndex = 0;
      speakCurrentSentence();
    }
    btnPlay.textContent = "⏸";
  }
}

// Fetch content from active tab
async function fetchActivePageContent() {
  try {
    statusTextEl.textContent = "Reading tab...";
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    currentTab = tab;

    chrome.tabs.sendMessage(tab.id, { type: "GET_COURSE_PAGE_INFO" }, (response) => {
      if (!response) {
        statusTextEl.textContent = "No reader connection";
        sentenceTextEl.textContent = "Could not connect to page. Try refreshing the Miva tab.";
        return;
      }

      currentDocInfo = response;
      docTitleEl.textContent = response.title || "Course Material";
      docUrlEl.textContent = response.url;
      statusTextEl.textContent = response.hasPdf ? "PDF Detected" : "Web Content";

      if (response.hasPdf) {
        sentenceTextEl.textContent = `PDF detected: ${response.title}.\nClick "⚡ Read Current Miva Page" or "Full App ↗" to transfer in-memory.`;
      }

      // If page has text preview, populate sentences
      if (response.textPreview) {
        sentences = splitSentences(response.textPreview);
        if (sentences.length > 0) {
          currentIndex = 0;
          sentenceTextEl.textContent = sentences[0];
          chunkCounterEl.textContent = `1 / ${sentences.length}`;
        }
      }
    });
  } catch (err) {
    console.error(err);
    statusTextEl.textContent = "Error scanning tab";
  }
}

// Open in Full Reader Web App (sends buffer or URL)
async function openInFullApp() {
  if (!currentTab) return;

  statusTextEl.textContent = "Transferring to Reader...";
  const readerUrl = "http://localhost:3000/import";

  // Request in-memory PDF buffer from content script
  chrome.tabs.sendMessage(currentTab.id, { type: "FETCH_PDF_BUFFER" }, (res) => {
    if (res && res.success && res.byteArray) {
      const buffer = new Uint8Array(res.byteArray).buffer;
      const readerTab = window.open(readerUrl, "_blank");

      const onMsg = (e) => {
        if (e.data && e.data.type === "READER_RECEIVER_READY") {
          readerTab.postMessage({ type: "READER_IMPORT_PDF", buffer, fileName: res.title + ".pdf" }, "*");
          window.removeEventListener("message", onMsg);
        }
      };
      window.addEventListener("message", onMsg);
      setTimeout(() => {
        readerTab.postMessage({ type: "READER_IMPORT_PDF", buffer, fileName: res.title + ".pdf" }, "*");
      }, 1500);
    } else {
      // Fallback: open reader with URL parameter
      const target = currentDocInfo?.pdfUrl
        ? `${readerUrl}?url=${encodeURIComponent(currentDocInfo.pdfUrl)}`
        : readerUrl;
      window.open(target, "_blank");
    }
  });
}

// Event Listeners
btnPlay.addEventListener("click", togglePlay);
btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    speakCurrentSentence();
  }
});
btnNext.addEventListener("click", () => {
  if (currentIndex + 1 < sentences.length) {
    currentIndex++;
    speakCurrentSentence();
  }
});
btnGenderToggle.addEventListener("click", toggleGender);
selectSpeed.addEventListener("change", (e) => {
  currentRate = parseFloat(e.target.value) || 1.0;
  if (isPlaying) speakCurrentSentence();
});
selectVoice.addEventListener("change", (e) => {
  selectedVoiceId = e.target.value;
  if (isPlaying) speakCurrentSentence();
});
btnFetchText.addEventListener("click", fetchActivePageContent);
btnOpenInApp.addEventListener("click", openInFullApp);

progressSliderEl.addEventListener("input", (e) => {
  const pct = parseFloat(e.target.value);
  if (sentences.length > 0) {
    currentIndex = Math.min(sentences.length - 1, Math.floor((pct / 100) * sentences.length));
    speakCurrentSentence();
  }
});

// Initialization
if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
fetchActivePageContent();
