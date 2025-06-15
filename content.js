// MIT License (c) 2025 Yuta Watanabe

(function () {
  const STORAGE_KEY = 'UDEMY_DARK_MODE_ENABLED';

  const darkBackground = '#1e1e1e';
  const darkTransparent = 'rgba(30, 30, 30, 0.85)';
  const lightText = '#eeeeee';
  const highlightGreen = '#4CAF50';
  const highlightRed = '#F44336';

  function applyDarkMode() {
    const elements = document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const style = window.getComputedStyle(el);
      const bgColor = style.getPropertyValue('background-color');
      const bg = style.getPropertyValue('background');
      const tag = el.tagName.toLowerCase();
      const text = el.textContent.trim();

      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        el.style.backgroundColor = darkBackground;
      }

      if (bg && bg.includes('gradient')) {
        el.style.background = darkTransparent;
      }

      if (
        ['p', 'div', 'span', 'svg', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
      ) {
        el.style.color = lightText;
      }

      if (tag === 'span') {
        if (text.includes('不正解')) {
          el.style.color = highlightRed;
          el.style.fontWeight = 'bold';
        } else if (text.includes('正解')) {
          el.style.color = highlightGreen;
          el.style.fontWeight = 'bold';
        }
      }
    }

    document.body.style.backgroundColor = darkBackground;
    document.body.style.color = lightText;
  }

  function removeDarkMode() {
    const elements = document.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      el.style.backgroundColor = '';
      el.style.background = '';
      el.style.color = '';
      el.style.fontWeight = '';
    }

    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }

  function init() {
    chrome.storage.local.get([STORAGE_KEY], (data) => {
      if (data[STORAGE_KEY]) {
        applyDarkMode();

        const observer = new MutationObserver(() => {
          applyDarkMode();
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      } else {
        removeDarkMode();
      }
    });
  }

  init();
})();
