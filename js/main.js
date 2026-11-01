(function () {
  'use strict';

  var THEME_KEY = 'gml_reader_theme';

  var SUN_SVG = '<svg class="theme-icon icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14.13,14.13Q15,13.25 15,12T14.13,9.88T12,9T9.88,9.88T9,12t0.88,2.13T12,15t2.13-0.88ZM8.46,15.54Q7,14.08 7,12Q7,9.92 8.46,8.46T12,7t3.54,1.46T17,12t-1.46,3.54T12,17q-2.07,0-3.54-1.46ZM5,13H1V11H5v2Zm18,0H19V11h4v2ZM11,5V1h2V5H11Zm0,18V19h2v4H11ZM6.4,7.75L3.88,5.32L5.3,3.85l2.4,2.5L6.4,7.75Zm12.3,12.4l-2.42-2.52l1.32-1.38l2.52,2.43L18.7,20.15ZM16.25,6.4l2.43-2.52L20.15,5.3l-2.5,2.4l-1.4-1.3ZM3.85,18.7l2.53-2.43L7.75,17.6L5.33,20.13L3.85,18.7ZM12,12Z"/></svg>';
  var MOON_SVG = '<svg class="theme-icon icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12,21q-3.75,0-6.38-2.63T3,12T5.63,5.63T12,3q0.35,0 0.69,0.02q0.34,0.02 0.66,0.07q-1.03,0.73-1.64,1.89T11.1,7.5q0,2.25 1.57,3.82T16.5,12.9q1.38,0 2.53-0.61t1.88-1.64q0.05,0.33 0.07,0.66T21,12q0,3.75-2.63,6.38T12,21Zm0-2q2.2,0 3.95-1.21t2.55-3.16q-0.5,0.13-1,0.2t-1,0.08q-3.07,0-5.24-2.16Q9.1,10.58 9.1,7.5q0-0.5 0.08-1t0.2-1Q7.43,6.3 6.21,8.05T5,12q0,2.9 2.05,4.95T12,19Zm-0.25-6.75Z"/></svg>';

  function getSavedTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateBtn(theme);
  }

  function updateBtn(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Przełącz na motyw jasny' : 'Przełącz na motyw ciemny');
    btn.setAttribute('title', theme === 'dark' ? 'Przełącz na motyw jasny' : 'Przełącz na motyw ciemny');
  }

  applyTheme(getSavedTheme());

  document.addEventListener('DOMContentLoaded', function () {
    updateBtn(getSavedTheme());

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Kopiowanie emaila
    var copyBtn = document.getElementById('copy-email-btn');
    var msg = document.getElementById('copy-msg');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var email = copyBtn.getAttribute('data-email') || 'jokiel.nikodem@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(showMsg).catch(function () {
            fallback(email);
          });
        } else {
          fallback(email);
        }
      });
    }

    function showMsg() {
      if (!msg) return;
      msg.classList.add('visible');
      setTimeout(function () {
        msg.classList.remove('visible');
      }, 3000);
    }

    function fallback(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showMsg();
      } catch (e) {
        alert('Kopiowanie: ' + text);
      }
      document.body.removeChild(ta);
    }

    // Menu mobilne
    var mobBtn = document.getElementById('mobile-toggle');
    var navLinks = document.getElementById('nav-links');
    if (mobBtn && navLinks) {
      mobBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.toggle('show');
      });

      document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !mobBtn.contains(e.target)) {
          navLinks.classList.remove('show');
        }
      });
    }

    // Podświetlanie sekcji w spisie treści instrukcji (Scroll spy)
    var tocLinks = document.querySelectorAll('.toc-list a');
    var trackedElements = document.querySelectorAll('.manual-content section, .manual-content [id]');

    if (tocLinks.length > 0 && trackedElements.length > 0 && 'IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            if (id) {
              tocLinks.forEach(function (link) {
                if (link.getAttribute('href') === '#' + id) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          }
        });
      }, {
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0
      });

      trackedElements.forEach(function (el) {
        if (el.getAttribute('id')) {
          observer.observe(el);
        }
      });
    }
  });
})();
