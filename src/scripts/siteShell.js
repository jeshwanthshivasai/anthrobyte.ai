import * as THREE from 'three';

export function blade(T = THREE) {
  const s = new T.Shape();
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

export function mountShell(win, opts = {}) {
  const doc = win.document;
  const S = { 
    disposed: false, 
    raf: 0, 
    s: win.scrollY || 0, 
    hotExt: -1, 
    keys: null 
  };
  
  const accent = opts.accent || '#FF6028';
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, mn, mx) => Math.min(mx, Math.max(mn, v));

  // Masked line reveals: [data-lm]
  const lms = Array.from(doc.querySelectorAll('[data-lm]'));
  lms.forEach((el) => {
    const w = doc.createElement('div');
    w.setAttribute('data-lmw', '');
    el.parentNode?.insertBefore(w, el);
    w.appendChild(el);
    if (['SPAN', 'A', 'EM'].includes(el.tagName)) el.style.display = 'inline-block';
    el.style.transform = 'translateY(118%)';
    el.style.transition = reduced ? 'none' : `transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) ${parseInt(el.getAttribute('data-lm') || '0', 10)}ms`;
    if (reduced) el.style.transform = 'none';
  });

  const lio = new win.IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && en.target) {
        en.target.style.transform = 'translateY(0)';
        lio.unobserve(en.target);
      }
    });
  }, { threshold: 0.05 });
  if (!reduced) lms.forEach((el) => lio.observe(el));

  // Legacy scroll reveals: [data-rv]
  const rvs = Array.from(doc.querySelectorAll('[data-rv]'));
  rvs.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = reduced ? 'none' : 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transitionDelay = `${parseInt(el.getAttribute('data-rv') || '0', 10)}ms`;
  });

  const io = new win.IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && en.target) {
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.16 });
  rvs.forEach((el) => io.observe(el));

  // Three.js Copper Mark & Scroll Choreography
  let renderer = null, scene = null, cam = null, master = null, t = 0;
  let layers = [], bodyMats = [], frontMats = [], lamps = null, a = 1.78;
  const DEF = { x: 0, y: 0, rx: -0.88, ry: 0.34, rz: 0.08, sc: 0.3, gap: 0.5, lb: 1, op: 1, hot: -1 };

  const resolveKeys = () => {
    if (!opts.keys) return;
    const vh = win.innerHeight;
    S.keys = opts.keys.map((k) => {
      let at = k.at ?? 0;
      if (k.el) {
        const el = doc.querySelector(k.el);
        if (el) at = el.offsetTop / vh + (k.dAt || 0);
      }
      return Object.assign({}, DEF, k, { at });
    }).sort((p, q) => p.at - q.at);
  };

  const glHost = doc.getElementById('hero-gl');
  if (glHost && !opts.noGL) {
    try {
      const Wf = () => glHost.clientWidth || win.innerWidth;
      const Hf = () => glHost.clientHeight || win.innerHeight;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 1.5));
      renderer.setSize(Wf(), Hf());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      glHost.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      a = Wf() / Hf();
      cam = new THREE.OrthographicCamera(-a, a, 1, -1, -40, 60);
      cam.position.set(0, 0, 10);
      cam.lookAt(0, 0, 0);

      const geo = new THREE.ExtrudeGeometry(blade(THREE), {
        depth: 0.17,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.026,
        bevelSegments: 3,
        curveSegments: 22
      });
      geo.translate(0, 0, -0.085);

      const AC = new THREE.Color(accent);
      master = new THREE.Group();
      const nL = (opts.pose && opts.pose.layers) || 5;

      for (let L = 0; L < nL; L++) {
        const lay = new THREE.Group();
        const bm = new THREE.MeshStandardMaterial({
          color: 0x2a1408,
          metalness: 1,
          roughness: 0.22,
          transparent: true,
          emissive: AC,
          emissiveIntensity: 0
        });
        const fm = new THREE.MeshStandardMaterial({
          color: 0x140a05,
          metalness: 1,
          roughness: 0.3,
          transparent: true,
          emissive: AC,
          emissiveIntensity: 0
        });
        bodyMats.push(bm);
        frontMats.push(fm);

        for (let b = 0; b < 3; b++) {
          const g = new THREE.Group();
          g.rotation.z = (b * Math.PI * 2) / 3;
          const m = new THREE.Mesh(geo, [fm, bm]);
          m.position.y = -0.11;
          g.add(m);
          lay.add(g);
        }
        master.add(lay);
        layers.push(lay);
      }

      [Math.PI / 2, Math.PI / 2 + 2.0944, Math.PI / 2 + 4.1888].forEach((thp) => {
        const pl = new THREE.PointLight(0xffa060, 1.1, 2.5, 1);
        pl.position.set(Math.cos(thp) * 2.1, Math.sin(thp) * 2.1, 0);
        master.add(pl);
      });
      scene.add(master);

      const hemi = new THREE.HemisphereLight(0xfff2e4, 0x1a120c, 0.1);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xffffff, 0.3);
      key.position.set(2.4, 3.5, 4.0);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffb37a, 3.4);
      rim.position.set(-3.5, 2, -2.5);
      scene.add(rim);
      const rim2 = new THREE.DirectionalLight(0xff7a35, 3.0);
      rim2.position.set(3.2, 0.8, -2.8);
      scene.add(rim2);
      const under = new THREE.DirectionalLight(0xff8a4a, 3.4);
      under.position.set(0.6, -2.6, 2.2);
      scene.add(under);
      const glowL = new THREE.PointLight(AC, 6, 11, 2);
      glowL.position.set(0, -0.4, -1.2);
      scene.add(glowL);

      lamps = { hemi, key, rim, rim2, under, glowL };

      const roS = () => {
        a = Wf() / Hf();
        cam.left = -a;
        cam.right = a;
        cam.updateProjectionMatrix();
        renderer.setSize(Wf(), Hf());
        resolveKeys();
      };
      win.addEventListener('resize', roS);
      S.roS = roS;

      S.pose = Object.assign({}, DEF, opts.pose || {});
      resolveKeys();
      win.setTimeout(resolveKeys, 600);
    } catch (e) {
      console.warn('WebGL init skipped:', e);
    }
  }

  const sampleKeys = (u) => {
    const K = S.keys;
    if (!K || !K.length) return S.pose;
    if (u <= K[0].at) return K[0];
    if (u >= K[K.length - 1].at) return K[K.length - 1];
    let i = 0;
    while (i < K.length - 2 && u > K[i + 1].at) i++;
    const A = K[i], B = K[i + 1];
    const tt = clamp((u - A.at) / Math.max(0.0001, B.at - A.at), 0, 1);
    const e2 = tt * tt * (3 - 2 * tt);
    const o = {};
    ['x', 'y', 'rx', 'ry', 'rz', 'sc', 'gap', 'lb', 'op'].forEach((f) => {
      o[f] = lerp(A[f], B[f], e2);
    });
    o.hot = tt < 0.5 ? A.hot : B.hot;
    return o;
  };

  const loop = () => {
    if (S.disposed) return;
    S.raf = win.requestAnimationFrame(loop);
    t += 0.016;

    if (renderer && master) {
      S.s += ((win.scrollY || 0) - S.s) * (reduced ? 1 : 0.09);
      const u = S.s / win.innerHeight;
      const p = sampleKeys(u);
      const wob = reduced ? 0 : Math.sin(t * 0.55) * 0.008;
      master.rotation.x = p.rx;
      master.rotation.y = p.ry;
      master.rotation.z = p.rz;
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
        bodyMats[L].opacity = dOp;
        frontMats[L].opacity = dOp;
      }

      master.visible = p.op > 0.015 || bodyMats.some((m2) => m2.opacity > 0.015);

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

  return {
    dispose: () => {
      S.disposed = true;
      win.cancelAnimationFrame(S.raf);
      if (S.roS) win.removeEventListener('resize', S.roS);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    },
    setHot: (i) => {
      S.hotExt = i;
    }
  };
}
