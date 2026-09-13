// Anthrobyte shared shell v2 — V7 visual language for the subpages:
// V7 copper mark + lighting, opening lockup sequence, scroll-keyframe choreography,
// masked line reveals, cursor, scramble, menu, grain, header theme, next-page progress.
export function blade(THREE) {
  const s = new THREE.Shape();
  s.moveTo(-0.857, 1.510);
  s.bezierCurveTo(-0.971, 1.510, -1.065, 1.418, -1.043, 1.306);
  s.bezierCurveTo(-1.029, 1.238, -1.009, 1.170, -0.982, 1.105);
  s.bezierCurveTo(-0.929, 0.977, -0.851, 0.860, -0.752, 0.762);
  s.bezierCurveTo(-0.654, 0.663, -0.537, 0.585, -0.409, 0.532);
  s.bezierCurveTo(-0.280, 0.479, -0.142, 0.451, -0.003, 0.451);
  s.bezierCurveTo(0.136, 0.451, 0.274, 0.479, 0.402, 0.532);
  s.bezierCurveTo(0.531, 0.585, 0.647, 0.663, 0.746, 0.762);
  s.bezierCurveTo(0.844, 0.860, 0.922, 0.977, 0.975, 1.105);
  s.bezierCurveTo(1.002, 1.170, 1.023, 1.238, 1.036, 1.306);
  s.bezierCurveTo(1.058, 1.418, 0.964, 1.510, 0.850, 1.510);
  s.lineTo(-0.857, 1.510);
  return s;
}
const PETALS = ['M7.43692 3.35091e-06C6.35895 3.52645e-06 5.46602 0.881876 5.67379 1.93963C5.80208 2.59276 5.99517 3.23313 6.25112 3.85105C6.75684 5.07199 7.4981 6.18135 8.43256 7.11582C9.36702 8.05028 10.4764 8.79153 11.6973 9.29726C12.9183 9.80299 14.2268 10.0633 15.5484 10.0633C16.8699 10.0633 18.1785 9.80299 19.3994 9.29726C20.6204 8.79153 21.7297 8.05027 22.6642 7.11581C23.5986 6.18135 24.3399 5.07198 24.8456 3.85105C25.1016 3.23313 25.2947 2.59276 25.423 1.93962C25.6307 0.881872 24.7378 -2.69777e-07 23.6598 0L7.43692 3.35091e-06Z', 'M22.823 26.7423C22.284 27.6758 21.0738 28.0082 20.2617 27.2994C19.7602 26.8617 19.3021 26.3743 18.895 25.8437C18.0905 24.7953 17.5004 23.5986 17.1583 22.3221C16.8163 21.0456 16.729 19.7143 16.9015 18.4041C17.074 17.0938 17.5029 15.8304 18.1637 14.6859C18.8244 13.5415 19.7041 12.5383 20.7526 11.7338C21.801 10.9293 22.9976 10.3392 24.2741 9.9972C25.5506 9.65516 26.882 9.5679 28.1922 9.74039C28.8553 9.82769 29.5065 9.98066 30.1362 10.1961C31.1562 10.5451 31.4734 11.7593 30.9344 12.6928L22.823 26.7423Z', 'M0.259461 12.6235C-0.279521 11.69 0.0377339 10.4757 1.05766 10.1268C1.68744 9.91132 2.33856 9.75835 3.00167 9.67105C4.31189 9.49856 5.64326 9.58582 6.91975 9.92786C8.19625 10.2699 9.39288 10.86 10.4413 11.6645C11.4898 12.469 12.3695 13.4721 13.0302 14.6166C13.691 15.7611 14.1199 17.0245 14.2924 18.3347C14.4649 19.6449 14.3776 20.9763 14.0356 22.2528C13.6935 23.5293 13.1034 24.7259 12.2989 25.7744C11.8918 26.305 11.4337 26.7924 10.9322 27.2301C10.1201 27.9389 8.9099 27.6065 8.37091 26.673L0.259461 12.6235Z'];

export async function mountShell(win, opts) {
  const doc = win.document;
  const S = { disposed: false, menuOpen: false, nextP: 0, hdrDark: true, raf: 0, s: win.scrollY || 0, hotExt: -1, keys: null };
  const $ = (id) => doc.getElementById(id);
  const accent = opts.accent || '#FF6028';
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, mn, mx) => Math.min(mx, Math.max(mn, v));

  // runtime css (loader + masked lines)
  const st = doc.createElement('style');
  st.textContent = '@keyframes abPetal{0%{transform:scale(.15);opacity:0}60%{opacity:1}100%{transform:scale(1);opacity:1}}' +
    '[data-lmw]{display:block;overflow:hidden}';
  doc.head.appendChild(st);

  // grain
  const gc = doc.createElement('canvas'); gc.width = gc.height = 128;
  const gx = gc.getContext('2d'), gd = gx.createImageData(128, 128);
  for (let i = 0; i < gd.data.length; i += 4) { const v = Math.random() * 255 | 0; gd.data[i] = gd.data[i+1] = gd.data[i+2] = v; gd.data[i+3] = 255; }
  gx.putImageData(gd, 0, 0);
  const grain = $('grain');
  if (grain) { grain.style.backgroundImage = 'url(' + gc.toDataURL() + ')'; grain.style.backgroundSize = '128px 128px'; }

  // page transition
  const goPage = (url) => {
    try { win.sessionStorage.setItem('abNav', '1'); } catch (e) {}
    const o = doc.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;z-index:90;background:#f4f2ee;opacity:0;transition:opacity .3s ease;pointer-events:none';
    doc.body.appendChild(o);
    requestAnimationFrame(() => { o.style.opacity = 1; });
    win.setTimeout(() => { win.location.href = url; }, 330);
  };

  // scramble
  const scramble = (el) => {
    if (reduced || !el.hasAttribute('data-scr') || el.dataset.busy) return;
    const orig = el.dataset.orig || el.textContent; el.dataset.orig = orig; el.dataset.busy = '1';
    const chars = '#/\\<>*+-=';
    const T0 = win.performance.now(), dur = 420;
    const stp = (now) => {
      const k = Math.min(1, (now - T0) / dur);
      const n = Math.floor(orig.length * k);
      let out = orig.slice(0, n);
      for (let i = n; i < orig.length; i++) out += orig[i] === ' ' ? ' ' : chars[Math.random() * chars.length | 0];
      el.textContent = out;
      if (k < 1 && !S.disposed) win.requestAnimationFrame(stp); else { el.textContent = orig; delete el.dataset.busy; }
    };
    win.requestAnimationFrame(stp);
  };

  // cursor
  const cur = $('cur'), curr = $('curr');
  let mx = -100, my = -100, rx = -100, ry = -100, grow = 1, lastHov = null;
  const fine = win.matchMedia('(pointer:fine)').matches;
  let mm = null, ov = null;
  if (fine) {
    mm = (e) => { mx = e.clientX; my = e.clientY; };
    win.addEventListener('mousemove', mm);
    ov = (e) => {
      const hit = e.target.closest('a,[data-h]');
      grow = hit ? 1.9 : 1;
      if (hit && hit !== lastHov) { lastHov = hit; scramble(hit); }
      if (!hit) lastHov = null;
    };
    doc.addEventListener('mouseover', ov);
  } else { if (cur) cur.style.display = 'none'; if (curr) curr.style.display = 'none'; }

  // menu
  const mb = $('menu-btn'), menu = $('menu');
  if (menu) menu.style.visibility = 'hidden';
  const setMenu = (open) => {
    S.menuOpen = open;
    if (menu) { menu.style.opacity = open ? 1 : 0; menu.style.pointerEvents = open ? 'auto' : 'none'; if (open) menu.style.visibility = 'visible'; else win.setTimeout(() => { if (!S.menuOpen) menu.style.visibility = 'hidden'; }, 450); }
    if (mb) mb.textContent = open ? 'CLOSE' : 'MENU';
    theme();
  };
  if (mb) mb.addEventListener('click', () => setMenu(!S.menuOpen));
  doc.querySelectorAll('[data-nav]').forEach(ln => {
    ln.addEventListener('click', (e) => {
      e.preventDefault();
      const url = ln.getAttribute('data-nav');
      if (url === opts.self || url === '#') { setMenu(false); win.scrollTo({ top: 0, behavior: 'smooth' }); }
      else goPage(url);
    });
    const d = ln.getAttribute('data-desc');
    if (d) ln.addEventListener('mouseenter', () => { const md = $('menu-desc'); if (md) md.textContent = d; });
  });

  // keyboard access
  doc.querySelectorAll('[data-h]:not(a)').forEach(el => { el.tabIndex = 0; el.setAttribute('role', 'button'); });
  const onKey = (e) => {
    if (e.key === 'Escape' && S.menuOpen) { setMenu(false); return; }
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const t2 = e.target && e.target.closest ? e.target.closest('[data-h]:not(a)') : null;
    if (t2) { e.preventDefault(); t2.click(); }
  };
  doc.addEventListener('keydown', onKey);

  // ---- opening sequence: mark + wordmark lockup, then circle void ----
  const loader = $('loader'), lhole = $('lhole'), lart = $('lart');
  let quick = false; try { quick = !!win.sessionStorage.getItem('abNav'); win.sessionStorage.removeItem('abNav'); } catch (e) {}
  if (loader && lhole && lart) {
    lart.style.display = 'none';
    let lock = null;
    if (!quick && !reduced) {
      lock = doc.createElement('div');
      lock.style.cssText = 'position:fixed;inset:0;z-index:51;display:flex;align-items:center;justify-content:center;gap:16px;pointer-events:none';
      const ms = 'width:46px;height:42px;flex:none';
      let svg = '<svg style="' + ms + '" viewBox="-0.5 -0.5 32.2 29.2">';
      PETALS.forEach((d, i) => { svg += '<path d="' + d + '" fill="' + accent + '" style="transform-origin:15.6px 14px;transform:scale(.15);opacity:0;animation:abPetal .55s cubic-bezier(.22,1,.36,1) ' + (i * 110) + 'ms forwards"></path>'; });
      svg += '</svg>';
      let wm = '<span style="display:inline-flex;overflow:hidden">';
      'anthrobyte'.split('').forEach((ch, i) => {
        wm += '<span data-wmch style="display:inline-block;font:600 34px \'Space Grotesk\',sans-serif;letter-spacing:-.02em;color:#17130f;transform:translateY(120%);transition:transform .6s cubic-bezier(.22,1,.36,1) ' + (180 + i * 34) + 'ms">' + ch + '</span>';
      });
      wm += '</span>';
      lock.innerHTML = svg + wm;
      doc.body.appendChild(lock);
      requestAnimationFrame(() => requestAnimationFrame(() => { lock.querySelectorAll('[data-wmch]').forEach(sp => { sp.style.transform = 'translateY(0)'; }); }));
    }
    const s0 = Math.min(4.2, win.innerHeight * 0.14 / 28);
    const place = (s) => {
      const t = 'translate(' + (win.innerWidth / 2) + ',' + (win.innerHeight / 2) + ') scale(' + s + ')';
      lhole.setAttribute('transform', t);
    };
    place(0.001);
    const T0 = win.performance.now(), hold = quick || reduced ? 120 : 1500, expMs = quick ? 550 : 800;
    const easeIO = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
    const step = (now) => {
      if (S.disposed) return;
      const e = now - T0;
      if (e > hold) {
        const xp = Math.min(1, (e - hold) / expMs);
        const sEnd = Math.hypot(win.innerWidth, win.innerHeight) / 8;
        place(0.001 + (sEnd - 0.001) * easeIO(xp));
        if (lock) lock.style.opacity = Math.max(0, 1 - xp / 0.4);
        loader.style.opacity = xp > 0.72 ? Math.max(0, 1 - (xp - 0.72) / 0.28) : 1;
        if (xp >= 1) { loader.style.display = 'none'; if (lock) lock.remove(); return; }
      }
      win.requestAnimationFrame(step);
    };
    win.requestAnimationFrame(step);
  }

  // ---- masked line reveals: [data-lm] ----
  const lms = Array.from(doc.querySelectorAll('[data-lm]'));
  lms.forEach(el => {
    const w = doc.createElement('div'); w.setAttribute('data-lmw', '');
    el.parentNode.insertBefore(w, el); w.appendChild(el);
    if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'EM') el.style.display = 'inline-block';
    el.style.transform = 'translateY(118%)';
    el.style.transition = reduced ? 'none' : 'transform .95s cubic-bezier(.22,1,.36,1) ' + (parseInt(el.getAttribute('data-lm') || '0', 10)) + 'ms';
    if (reduced) el.style.transform = 'none';
  });
  const lio = new win.IntersectionObserver((es) => {
    es.forEach(en => { if (en.isIntersecting) { en.target.style.transform = 'translateY(0)'; lio.unobserve(en.target); } });
  }, { threshold: 0.05 });
  if (!reduced) lms.forEach(el => lio.observe(el));

  // scroll reveals (legacy fade)
  const rvs = Array.from(doc.querySelectorAll('[data-rv]'));
  rvs.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = reduced ? 'none' : 'opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)';
    el.style.transitionDelay = (parseInt(el.getAttribute('data-rv') || '0', 10)) + 'ms';
  });
  const io = new win.IntersectionObserver((es) => {
    es.forEach(en => { if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = 'translateY(0)'; io.unobserve(en.target); } });
  }, { threshold: 0.16 });
  rvs.forEach(el => io.observe(el));

  // per-layer hot rows: [data-hot="layerIndex"]
  const hotEls = Array.from(doc.querySelectorAll('[data-hot]'));
  if (hotEls.length) {
    const hio = new win.IntersectionObserver((es) => {
      es.forEach(en => {
        const idx = parseInt(en.target.getAttribute('data-hot'), 10);
        if (en.isIntersecting) S.hotExt = idx;
        else if (S.hotExt === idx) S.hotExt = -1;
      });
    }, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
    hotEls.forEach(el => hio.observe(el));
  }

  // header theme
  const lgD = $('lg-d'), lgL = $('lg-l');
  const hero = doc.querySelector(opts.heroSel || '#hero');
  const ft = doc.querySelector('footer');
  const theme = () => {
    const hb = hero ? hero.getBoundingClientRect().bottom : 0;
    const fn = ft ? ft.getBoundingClientRect().top < 80 : false;
    const dark = S.menuOpen || fn || hb > 70;
    if (dark === S.hdrDark) return;
    S.hdrDark = dark;
    if (lgD) lgD.style.opacity = dark ? 1 : 0;
    if (lgL) lgL.style.opacity = dark ? 0 : 1;
    if (mb) mb.style.color = dark ? '#f2f0eb' : '#17130f';
  };
  const onScroll = () => theme();
  win.addEventListener('scroll', onScroll, { passive: true });

  // next-page progress
  const nf = $('next-fill');
  let onWheel = null;
  if (nf && opts.nextUrl) {
    let fired = false;
    onWheel = (e) => {
      const atBottom = win.scrollY + win.innerHeight >= doc.documentElement.scrollHeight - 6;
      if (atBottom && e.deltaY > 0) {
        S.nextP = Math.min(1, S.nextP + e.deltaY / 1500);
        if (S.nextP >= 1 && !fired) { fired = true; goPage(opts.nextUrl); }
      }
    };
    win.addEventListener('wheel', onWheel, { passive: true });
  }

  // ---- V7 copper mark + scroll choreography ----
  let renderer = null, scene = null, cam = null, master = null, t = 0;
  let layers = [], bodyMats = [], frontMats = [], lamps = null, a = 1.78;
  const glProbeOK = (() => { try { const t2 = doc.createElement('canvas'); return !!(t2.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) || t2.getContext('webgl', { failIfMajorPerformanceCaveat: true })); } catch (e) { return false; } })();
  const DEF = { x: 0, y: 0, rx: -0.88, ry: 0.34, rz: 0.08, sc: 0.3, gap: 0.5, lb: 1, op: 1, hot: -1 };
  const resolveKeys = () => {
    if (!opts.keys) return;
    const vh = win.innerHeight;
    S.keys = opts.keys.map(k => {
      let at = k.at ?? 0;
      if (k.el) { const el = doc.querySelector(k.el); if (el) at = el.offsetTop / vh + (k.dAt || 0); }
      return Object.assign({}, DEF, k, { at });
    }).sort((p, q) => p.at - q.at);
  };
  try {
    const glHost = $('hero-gl');
    if (glHost && !opts.noGL && glProbeOK) {
      const THREE = await import('https://esm.sh/three@0.161.0');
      if (S.disposed) return { dispose: () => {}, goPage };
      const Wf = () => glHost.clientWidth || win.innerWidth, Hf = () => glHost.clientHeight || win.innerHeight;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 1.5));
      renderer.setSize(Wf(), Hf());
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
      glHost.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      a = Wf() / Hf();
      cam = new THREE.OrthographicCamera(-a, a, 1, -1, -40, 60);
      cam.position.set(0, 0, 10); cam.lookAt(0, 0, 0);
      const geo = new THREE.ExtrudeGeometry(blade(THREE), { depth: 0.17, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.026, bevelSegments: 3, curveSegments: 22 });
      geo.translate(0, 0, -0.085);
      const AC = new THREE.Color(accent);
      master = new THREE.Group();
      const nL = (opts.pose && opts.pose.layers) || 5;
      for (let L = 0; L < nL; L++) {
        const lay = new THREE.Group();
        const bm = new THREE.MeshStandardMaterial({ color: 0x2a1408, metalness: 1, roughness: 0.22, transparent: true, emissive: AC, emissiveIntensity: 0 });
        const fm = new THREE.MeshStandardMaterial({ color: 0x140a05, metalness: 1, roughness: 0.3, transparent: true, emissive: AC, emissiveIntensity: 0 });
        bodyMats.push(bm); frontMats.push(fm);
        for (let b = 0; b < 3; b++) {
          const g = new THREE.Group(); g.rotation.z = b * Math.PI * 2 / 3;
          const m = new THREE.Mesh(geo, [fm, bm]); m.position.y = -0.11; g.add(m);
          lay.add(g);
        }
        master.add(lay); layers.push(lay);
      }
      [Math.PI / 2, Math.PI / 2 + 2.0944, Math.PI / 2 + 4.1888].forEach((thp) => {
        const pl = new THREE.PointLight(0xffa060, 1.1, 2.5, 1);
        pl.position.set(Math.cos(thp) * 2.1, Math.sin(thp) * 2.1, 0);
        master.add(pl);
      });
      scene.add(master);
      const hemi = new THREE.HemisphereLight(0xfff2e4, 0x1a120c, 0.1); scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 0.3); key.position.set(2.4, 3.5, 4.0); scene.add(key);
      const rim = new THREE.DirectionalLight(0xffb37a, 3.4); rim.position.set(-3.5, 2, -2.5); scene.add(rim);
      const rim2 = new THREE.DirectionalLight(0xff7a35, 3.0); rim2.position.set(3.2, 0.8, -2.8); scene.add(rim2);
      const under = new THREE.DirectionalLight(0xff8a4a, 3.4); under.position.set(0.6, -2.6, 2.2); scene.add(under);
      const glowL = new THREE.PointLight(AC, 6, 11, 2); glowL.position.set(0, -0.4, -1.2); scene.add(glowL);
      lamps = { hemi, key, rim, rim2, under, glowL };
      const roS = () => { a = Wf() / Hf(); cam.left = -a; cam.right = a; cam.updateProjectionMatrix(); renderer.setSize(Wf(), Hf()); resolveKeys(); };
      win.addEventListener('resize', roS);
      S.roS = roS;
      S.pose = Object.assign({}, DEF, opts.pose || {});
      resolveKeys();
      win.setTimeout(resolveKeys, 900);
      win.addEventListener('load', resolveKeys);
    }
  } catch (e) { /* WebGL optional */ }

  const sampleKeys = (u) => {
    const K = S.keys;
    if (!K || !K.length) return S.pose;
    if (u <= K[0].at) return K[0];
    if (u >= K[K.length - 1].at) return K[K.length - 1];
    let i = 0; while (i < K.length - 2 && u > K[i + 1].at) i++;
    const A = K[i], B = K[i + 1];
    const tt = clamp((u - A.at) / Math.max(0.0001, B.at - A.at), 0, 1);
    const e2 = tt * tt * (3 - 2 * tt);
    const o = {};
    ['x', 'y', 'rx', 'ry', 'rz', 'sc', 'gap', 'lb', 'op'].forEach(f => { o[f] = lerp(A[f], B[f], e2); });
    o.hot = tt < 0.5 ? A.hot : B.hot;
    return o;
  };

  const loop = () => {
    if (S.disposed) return;
    S.raf = win.requestAnimationFrame(loop);
    t += 0.016;
    if (fine) {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (cur) cur.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
      if (curr) curr.style.transform = 'translate(' + (rx - 15) + 'px,' + (ry - 15) + 'px) scale(' + grow + ')';
    }
    if (nf) { if (!S.menuOpen) S.nextP *= 0.965; nf.style.width = (S.nextP * 100) + '%'; }
    if (renderer && master) {
      S.s += ((win.scrollY || 0) - S.s) * (reduced ? 1 : 0.09);
      const u = S.s / win.innerHeight;
      const p = sampleKeys(u);
      const wob = reduced ? 0 : Math.sin(t * 0.55) * 0.008;
      master.rotation.x = p.rx; master.rotation.y = p.ry; master.rotation.z = p.rz;
      master.position.set(p.x * a, p.y + wob, 0);
      master.scale.setScalar(Math.max(p.sc, 0.0001));
      const hot = S.hotExt >= 0 ? S.hotExt : (p.hot ?? -1);
      for (let L = 0; L < layers.length; L++) {
        layers[L].position.z = (L - (layers.length - 1) / 2) * p.gap;
        const tgt = hot === L ? 0.62 : 0;
        bodyMats[L].emissiveIntensity += (tgt - bodyMats[L].emissiveIntensity) * 0.14;
        frontMats[L].emissiveIntensity += (tgt - frontMats[L].emissiveIntensity) * 0.14;
        const opT = hot === L ? Math.max(p.op, 0.62) : p.op;
        const dOp = bodyMats[L].opacity + (opT - bodyMats[L].opacity) * 0.16;
        bodyMats[L].opacity = dOp; frontMats[L].opacity = dOp;
      }
      master.visible = p.op > 0.015 || bodyMats.some(m2 => m2.opacity > 0.015);
      if (lamps) {
        const lb = p.lb, LB = 1 + 1.5 * lb;
        const ang = -2.2 + t * 0.1;
        lamps.glowL.position.set(Math.cos(ang) * 1.6, -0.45 + Math.sin(t * 0.27) * 0.5, Math.sin(ang) * 1.6);
        lamps.glowL.intensity = 6 * (1 - lb * 0.55) * (0.78 + 0.22 * Math.sin(t * 0.4));
        lamps.rim.intensity = 3.4 * LB * (0.8 + 0.2 * Math.sin(t * 0.31 + 1.3));
        lamps.rim2.intensity = 3.0 * LB * (0.8 + 0.2 * Math.sin(t * 0.26 + 0.5));
        lamps.under.intensity = 3.4 * LB * (0.82 + 0.18 * Math.sin(t * 0.37 + 0.6));
        lamps.key.intensity = 0.3 + 3.2 * lb;
        lamps.hemi.intensity = 0.1 + 0.75 * lb;
      }
      renderer.render(scene, cam);
    }
  };
  loop();

  const dispose = () => {
    S.disposed = true;
    win.cancelAnimationFrame(S.raf);
    if (mm) win.removeEventListener('mousemove', mm);
    if (ov) doc.removeEventListener('mouseover', ov);
    doc.removeEventListener('keydown', onKey);
    win.removeEventListener('scroll', onScroll);
    if (onWheel) win.removeEventListener('wheel', onWheel);
    if (S.roS) { win.removeEventListener('resize', S.roS); win.removeEventListener('load', resolveKeys); }
    if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
    st.remove();
  };
  return { dispose, goPage, setHot: (i) => { S.hotExt = i; } };
}
