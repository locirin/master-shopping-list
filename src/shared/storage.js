const STORAGE_KEY = "msl_state_v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lists: [], items: [] };
    return JSON.parse(raw);
  } catch {
    return { lists: [], items: [] };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore write errors for now
  }
}
