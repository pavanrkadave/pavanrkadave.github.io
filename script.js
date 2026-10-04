(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('yr').textContent = new Date().getFullYear();

  // Cursor glow
  const root = document.documentElement;
  addEventListener('pointermove', e => {
    root.style.setProperty('--x', e.clientX + 'px');
    root.style.setProperty('--y', e.clientY + 'px');
  }, { passive: true });

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Terminal typing
  const term = document.getElementById('term');
  const lines = JSON.parse(term.dataset.lines);
  const render = n => {
    term.innerHTML = lines.slice(0, n).map(l =>
      l.startsWith('$') ? `<span class="p">$</span>${l.slice(1)}` :
      l.startsWith('✔') ? `<span class="ok">${l}</span>` : l
    ).join('\n');
  };
  if (reduce) { render(lines.length); }
  else {
    let i = 0;
    const tick = () => {
      render(++i);
      if (i < lines.length) setTimeout(tick, lines[i].startsWith('$') ? 900 : 450);
    };
    setTimeout(tick, 600);
  }

  // Count-up metrics
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce || target === 0) return;
    const obs = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const step = t => {
        const p = Math.min((t - t0) / 1200, 1);
        el.textContent = pre + Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    obs.observe(el);
  });

  // Keyboard: press 1-4 style jump via "g" then letter is overkill; Cmd/Ctrl+K jumps to contact
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
