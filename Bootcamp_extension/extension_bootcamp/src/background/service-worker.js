chrome.runtime.onInstalled.addListener(() => {
  console.log("Notas Rápidas instalada!");
  chrome.storage.local.set({ notes: [] });
});
