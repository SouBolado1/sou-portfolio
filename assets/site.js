/* Scroll reveal + count-up. No dependencies. */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dot-separated thousands — 2.760.640, not 2,760,640. Intentional; see README.
  function fmt(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';

    var to = Number(el.dataset.to);
    var suffix = el.dataset.suffix || '';

    if (reduced || !Number.isFinite(to)) {
      el.textContent = fmt(to) + suffix;
      return;
    }

    var dur = 900;
    var t0 = performance.now();
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function reveal(el) {
    el.classList.add('is-revealed');
    el.querySelectorAll('[data-count]').forEach(countUp);
    if (el.hasAttribute('data-count')) countUp(el);
  }

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(reveal);
    document.querySelectorAll('[data-count]').forEach(countUp);
    return;
  }

  // Stagger within each group of four, matching the prototype's cadence.
  nodes.forEach(function (n, i) {
    n.style.setProperty('--reveal-delay', (i % 4) * 60 + 'ms');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      reveal(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  nodes.forEach(function (n) { io.observe(n); });

  // Anything still unrevealed after the first few seconds shows anyway, so a
  // missed intersection can never leave content invisible.
  setTimeout(function () { nodes.forEach(reveal); }, 2600);
})();
