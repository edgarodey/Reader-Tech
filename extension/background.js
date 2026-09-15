// Reader Side Panel Extension Service Worker

// Enable opening side panel when user clicks the extension action icon in the toolbar
chrome.runtime.onInstalled.addListener(async () => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }
});

// Listener for messages between content script and sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ status: "PONG" });
  }
  return true;
});
