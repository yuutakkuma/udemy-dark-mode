// MIT License (c) 2025 Yuta Watanabe
const STORAGE_KEY = 'UDEMY_DARK_MODE_ENABLED';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');

  chrome.storage.local.get([STORAGE_KEY], (data) => {
    toggle.checked = data[STORAGE_KEY] ?? true;
  });

  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ [STORAGE_KEY]: toggle.checked }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => location.reload()
          });
        }
      });
    });
  });
});
