(function () {
  var root = document.documentElement, btn = document.getElementById('theme');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function current() {
    return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  }
  function paint() {
    btn.textContent = current() === 'dark' ? 'Light mode' : 'Dark mode';
  }
  try { var saved = localStorage.getItem('theme'); if (saved) { root.setAttribute('data-theme', saved); } } catch (e) { }
  paint();
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { }
    paint();
  });
  var links = document.querySelectorAll('nav .links a[href^="#"]'), map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[e.target.id]; if (a) { a.classList.add('active'); }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) { io.observe(s); } });
  }
})();
