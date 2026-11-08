(function () {
  var KEY = 'msmath-done-v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var done = load();

  function paint() {
    document.querySelectorAll('[data-done]').forEach(function (b) {
      var on = done.indexOf(b.getAttribute('data-done')) > -1;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (b.classList.contains('big')) b.textContent = on ? '✓ 이해했어요' : '이 단원을 이해했어요';
    });
    var p = document.getElementById('prog');
    if (p) {
      var total = document.querySelectorAll('.chk[data-done]').length;
      p.innerHTML = '이해한 단원 <b>' + done.filter(function (d) { return document.querySelector('.chk[data-done="' + d + '"]'); }).length + '</b> / ' + total;
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-done]');
    if (b) {
      e.preventDefault();
      var id = b.getAttribute('data-done'), i = done.indexOf(id);
      if (i > -1) done.splice(i, 1); else done.push(id);
      save(done); paint(); return;
    }
    if (document.body.classList.contains('hide')) {
      var a = e.target.closest('.map a');
      if (a) {
        var l = a.querySelector('.lbl');
        if (l && !l.classList.contains('shown')) { e.preventDefault(); l.classList.add('shown'); }
      }
    }
  });
  var hb = document.getElementById('hideBtn');
  if (hb) hb.addEventListener('click', function () {
    var on = !document.body.classList.contains('hide');
    document.body.classList.toggle('hide', on);
    hb.setAttribute('aria-pressed', on ? 'true' : 'false');
    hb.textContent = on ? '목차 다시 보이기' : '목차 가리고 외우기';
    document.querySelectorAll('.lbl.shown').forEach(function (l) { l.classList.remove('shown'); });
  });
  paint();
})();
