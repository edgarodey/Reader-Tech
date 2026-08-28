import { getDB, type SettingsRecord } from "./db";

export const DEFAULT_SETTINGS: SettingsRecord = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  fontSize: 18,
  lineHeight: 1.75,
  theme: "light",
  autoOCR: false,
  activeEngineId: "web-speech",
};

const SETTINGS_KEY = "user_preferences";

export async function getSettings(): Promise<SettingsRecord> {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }
  try {
    const db = await getDB();
    const val = await db.get("settings", SETTINGS_KEY);
    return val ? { ...DEFAULT_SETTINGS, ...val } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Partial<SettingsRecord>): Promise<SettingsRecord> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  try {
    const db = await getDB();
    await db.put("settings", updated, SETTINGS_KEY);
  } catch (err) {
    console.error("Failed to persist settings:", err);
  }
  return updated;
}
