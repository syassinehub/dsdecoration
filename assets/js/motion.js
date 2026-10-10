// DS Décoration : animations (GSAP + ScrollTrigger + SplitText, défilement Lenis).
// Tout est désactivé si le visiteur a demandé à réduire les animations.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText || !window.Lenis) {
    root.classList.remove('motion');
    return;
  }
  window.__motion = true;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var SplitText = window.SplitText;
  gsap.registerPlugin(ScrollTrigger, SplitText, window.CustomEase);
  window.CustomEase.create('paint', 'M0,0 C0.7,0 0.2,1 1,1');
  gsap.defaults({ ease: 'paint', duration: 1 });

  var desktop = window.matchMedia('(min-width: 961px)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  // Défilement fluide, synchronisé avec ScrollTrigger
  var lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ---------- Rideau entre les pages : trois couches aux couleurs du logo ----------
  var layers = $$('.curtain-layer');
  var label = $('.curtain-label');
  var labels = { '': 'Accueil', 'nos-realisations': 'Réalisations', 'contact': 'Contact', 'mentions-legales': 'Mentions légales' };

  function curtainOut() {
    var tl = gsap.timeline();
    tl.to(label, { yPercent: -60, autoAlpha: 0, duration: .5, ease: 'power2.in' })
      .to(layers.slice().reverse(), { scaleY: 0, transformOrigin: 'top', duration: .9, stagger: .12 }, '-=.15');
    return tl;
  }

  function curtainIn(href, name) {
    label.textContent = name;
    gsap.set(label, { yPercent: 60, autoAlpha: 0 });
    gsap.timeline({ onComplete: function () { window.location.href = href; } })
      .to(layers, { scaleY: 1, transformOrigin: 'bottom', duration: .7, stagger: .1 })
      .to(label, { yPercent: 0, autoAlpha: 1, duration: .5, ease: 'power3.out' }, '-=.35');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.pathname === window.location.pathname && url.hash) return;
    e.preventDefault();
    var key = url.pathname.replace(/^\/|\/$/g, '').split('/').pop();
    curtainIn(url.href, labels[key] || 'DS Décoration');
  });

  // Retour arrière depuis le cache du navigateur : on retire le rideau
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) gsap.set(layers, { scaleY: 0 });
  });

  // ---------- En-tête : se cache en descendant, revient en remontant ----------
  var header = $('.site-header');
  var menu = document.getElementById('menu');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: function (self) {
      var hide = self.direction === 1 && self.scroll() > 240 && !(menu && menu.classList.contains('open'));
      header.classList.toggle('is-hidden', hide);
    }
  });

  // ---------- Titres découpés en lignes ----------
  function splitLines(el, vars) {
    return SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit: function (self) {
        return gsap.from(self.lines, Object.assign({ yPercent: 110, duration: 1.1, stagger: .09 }, vars));
      }
    });
  }

  // Révélation d'une image : volet + léger zoom arrière
  function revealImage(picture, delay) {
    var img = $('img', picture);
    gsap.timeline({ scrollTrigger: { trigger: picture, start: 'top 88%' }, delay: delay || 0 })
      .fromTo(picture, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3 })
      .from(img, { scale: 1.3, duration: 1.6 }, 0);
  }

  function enter() {
    var tl = curtainOut();

    // Accueil : ouverture
    var opening = $('.opening');
    if (opening) {
      var picture = $('.opening-visual picture');
      var shapes = $$('.shapes polygon');
      var h1 = $('h1', opening);
      tl.add(function () { splitLines(h1, { stagger: .12, duration: 1.2 }); }, '-=.55');
      tl.from($('.intro', opening), { y: 30, autoAlpha: 0, duration: 1 }, '<.35');
      tl.from($$('.actions > *', opening), { y: 24, autoAlpha: 0, stagger: .1, duration: .9 }, '<.15');
      tl.fromTo(picture, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, '<-.4');
      tl.from($('img', picture), { scale: 1.35, duration: 1.8 }, '<');
      tl.from(shapes, {
        y: -160, rotation: function (i) { return [-35, 25, -18][i]; }, autoAlpha: 0,
        transformOrigin: '50% 50%', duration: 1.1, stagger: .12, ease: 'back.out(1.5)'
      }, '<.6');
      tl.from($('.opening-visual figcaption'), { autoAlpha: 0, x: -20, duration: .8 }, '<.4');

      // Parallaxe au défilement
      gsap.to($('img', picture), {
        yPercent: 8, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.shapes', {
        y: -90, rotation: -6, ease: 'none',
        scrollTrigger: { trigger: opening, start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    // Pages intérieures : en-tête
    var head = $('.page-head') || $('.lost');
    if (head) {
      tl.from($$('.crumbs', head), { autoAlpha: 0, y: 12, duration: .6 }, '-=.6');
      tl.add(function () { splitLines($('h1', head), { stagger: .1 }); }, '<');
      tl.from($$('.intro, .actions', head), { autoAlpha: 0, y: 26, duration: .9, stagger: .1 }, '<.3');
    }

    tl.add(scrollAnimations, '-=.4');
  }

  // ---------- Animations au défilement ----------
  function scrollAnimations() {
    // Titres de section
    $$('h2[data-split]').forEach(function (h2) {
      splitLines(h2, { scrollTrigger: { trigger: h2, start: 'top 88%' } });
    });
    $$('.block-head > p').forEach(function (p) {
      gsap.from(p, { autoAlpha: 0, y: 30, scrollTrigger: { trigger: p, start: 'top 90%' } });
    });

    // Bandeau défilant des métiers : la vitesse et le sens suivent le défilement
    var track = $('.marquee-track');
    if (track) {
      var loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      var settle = null;
      ScrollTrigger.create({
        trigger: '.marquee',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: function (self) {
          var boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 350);
          gsap.to(loop, { timeScale: boost * self.direction, duration: .2, overwrite: true });
          clearTimeout(settle);
          settle = setTimeout(function () {
            gsap.to(loop, { timeScale: self.direction, duration: 1.2, overwrite: true });
          }, 120);
        }
      });
      gsap.from('.marquee-sep svg', {
        rotation: 360, ease: 'none',
        scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }

    // Métiers : titres qui montent, ligne par ligne
    $$('.trade-row').forEach(function (row) {
      gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
        .from($('h3', row), { yPercent: 60, autoAlpha: 0, duration: 1 }, 0)
        .from($$('p, .trade-thumb', row), { y: 24, autoAlpha: 0, duration: .9, stagger: .08 }, .15);
    });

    // Liste « Pour qui / Où / … »
    var facts = $$('.facts > div');
    if (facts.length) {
      gsap.from(facts, {
        autoAlpha: 0, x: -40, stagger: .12, duration: .9,
        scrollTrigger: { trigger: '.facts', start: 'top 80%' }
      });
      gsap.from('.team .prose p', {
        autoAlpha: 0, y: 26, stagger: .12, duration: .9,
        scrollTrigger: { trigger: '.team', start: 'top 70%' }
      });
    }

    // Étapes : la ligne orange avance avec le défilement et allume chaque étape
    var steps = $$('.steps li');
    if (steps.length) {
      if (desktop) {
        var stl = gsap.timeline({
          scrollTrigger: { trigger: '.steps', start: 'top 80%', end: 'bottom 55%', scrub: .8 }
        });
        stl.to('.steps-line span', { scaleX: 1, ease: 'none', duration: steps.length }, 0);
        steps.forEach(function (li, i) {
          stl.from(li, { autoAlpha: .12, y: 40, duration: .8, ease: 'power2.out' }, i * .9);
        });
      } else {
        steps.forEach(function (li) {
          gsap.from(li, { autoAlpha: 0, y: 40, scrollTrigger: { trigger: li, start: 'top 88%' } });
        });
      }
    }

    // Accueil : l'éventail des photos « avant » s'ouvre au défilement
    var fan = $$('.fan-cards img');
    if (fan.length) {
      gsap.timeline({ scrollTrigger: { trigger: '.fan', start: 'top 85%', end: 'center 45%', scrub: 1 } })
        .from(fan[0], { xPercent: 45, rotation: 9, y: 40 }, 0)
        .from(fan[1], { rotation: -2, y: 80, scale: .9 }, 0)
        .from(fan[2], { xPercent: -45, rotation: -10, y: 40 }, 0);
      gsap.from('.fan', { autoAlpha: 0, y: 60, duration: 1.1, scrollTrigger: { trigger: '.fan', start: 'top 88%' } });
      gsap.from('.teaser .prose p', { autoAlpha: 0, y: 26, stagger: .12, scrollTrigger: { trigger: '.teaser', start: 'top 70%' } });
    }

    // Réalisations : fiches de chantier en défilement horizontal (ordinateur)
    var cases = $('.cases');
    if (cases) {
      var caseEls = $$('.case', cases);
      if (desktop) {
        cases.classList.add('is-horizontal');
        var track = $('.cases-track', cases);
        var distance = function () { return track.scrollWidth - window.innerWidth; };
        var slide = gsap.to(track, {
          x: function () { return -distance(); }, ease: 'none',
          scrollTrigger: {
            trigger: cases, pin: true, scrub: 1, invalidateOnRefresh: true,
            end: function () { return '+=' + distance(); }
          }
        });
        gsap.to('.cases-bar span', {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: cases, start: 'top top', end: function () { return '+=' + distance(); }, scrub: true }
        });
        caseEls.forEach(function (c, i) {
          var img = $('.case-photo img', c);
          gsap.set(img, { scale: 1.18 });
          gsap.fromTo(img, { xPercent: -7 }, {
            xPercent: 7, ease: 'none',
            scrollTrigger: { trigger: c, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true }
          });
          // La première fiche est visible dès l'arrivée : elle se déclenche sur la section elle-même
          var when = i === 0
            ? { trigger: cases, start: 'top 65%' }
            : { trigger: c, containerAnimation: slide, start: 'left 70%' };
          gsap.timeline({ scrollTrigger: when })
            .from($$('.case-count, h2, .case-text > p', c), { y: 40, autoAlpha: 0, stagger: .08, duration: .9 })
            .from($$('.case-before li', c), {
              y: 50, rotation: function (i) { return [-8, 6, -4][i % 3]; }, autoAlpha: 0,
              stagger: .1, duration: .9, ease: 'back.out(1.6)'
            }, '-=.5');
        });
      } else {
        caseEls.forEach(function (c) {
          revealImage($('.case-photo', c));
          gsap.from($$('.case-text > *', c), { y: 30, autoAlpha: 0, stagger: .08, scrollTrigger: { trigger: c, start: 'top 60%' } });
        });
      }
    }

    // Bandeau contact
    var callout = $('.callout');
    if (callout) {
      gsap.from($$('.callout .intro, .callout .person, .callout .actions, .callout > .wrap > .btn'), {
        autoAlpha: 0, y: 34, stagger: .1, duration: .9,
        scrollTrigger: { trigger: callout, start: 'top 70%' }
      });
      var cs = $$('.callout-shapes polygon');
      if (cs.length) {
        gsap.from(cs, {
          x: 120, rotation: function (i) { return [40, -30, 20][i]; }, autoAlpha: 0,
          transformOrigin: '50% 50%', stagger: .12, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: callout, start: 'top 75%' }
        });
        gsap.to('.callout-shapes', {
          yPercent: -18, rotation: 8, ease: 'none',
          scrollTrigger: { trigger: callout, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
    }

    // Avis clients
    $$('.review').forEach(function (r, i) {
      gsap.from(r, { autoAlpha: 0, y: 40, duration: 1, delay: desktop ? (i % 2) * .12 : 0, scrollTrigger: { trigger: r, start: 'top 88%' } });
    });
    if ($('.reviews-end')) {
      gsap.from('.reviews-end > *', { autoAlpha: 0, y: 24, stagger: .1, scrollTrigger: { trigger: '.reviews-end', start: 'top 92%' } });
    }

    // Page contact
    var contact = $('.contact');
    if (contact) {
      gsap.from($$('.contact > div > h2, .contact-list > div'), {
        autoAlpha: 0, x: -30, stagger: .08, duration: .9, scrollTrigger: { trigger: contact, start: 'top 80%' }
      });
      gsap.from($$('.form > *'), {
        autoAlpha: 0, y: 26, stagger: .05, duration: .8, scrollTrigger: { trigger: '.form', start: 'top 80%' }
      });
    }

    // Mentions légales
    $$('.legal h2, .legal p').forEach(function (el) {
      gsap.from(el, { autoAlpha: 0, y: 20, duration: .8, scrollTrigger: { trigger: el, start: 'top 92%' } });
    });

    // Pied de page
    gsap.from($$('.footer-grid > div'), {
      autoAlpha: 0, y: 30, stagger: .1, duration: .9, scrollTrigger: { trigger: '.site-footer', start: 'top 85%' }
    });

    ScrollTrigger.refresh();
  }

  // ---------- Interactions au pointeur (ordinateur) ----------
  if (finePointer) {
    // Boutons « aimantés »
    $$('.actions .btn, .callout .btn, .header-phone, .site-header .btn').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * .3);
        yTo((e.clientY - r.top - r.height / 2) * .4);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .4)', overwrite: true });
      });
    });

    // Curseur « Agrandir » sur la galerie
    var cursor = $('.cursor');
    var targets = $$('button[data-full]');
    if (cursor && targets.length) {
      var cx = gsap.quickTo(cursor, 'x', { duration: .45, ease: 'power3.out' });
      var cy = gsap.quickTo(cursor, 'y', { duration: .45, ease: 'power3.out' });
      window.addEventListener('mousemove', function (e) { cx(e.clientX); cy(e.clientY); });
      targets.forEach(function (t) {
        t.addEventListener('mouseenter', function () { gsap.to(cursor, { scale: 1, duration: .45, ease: 'back.out(2)' }); });
        t.addEventListener('mouseleave', function () { gsap.to(cursor, { scale: 0, duration: .3, ease: 'power2.in' }); });
        t.addEventListener('click', function () { gsap.to(cursor, { scale: 0, duration: .2 }); });
      });
    }

    // Métiers : la photo de matière apparaît et suit la souris
    var preview = $('.trade-preview');
    var previewRows = $$('.trade-row[data-preview]');
    if (preview && previewRows.length) {
      var pimg = $('img', preview);
      var px = gsap.quickTo(preview, 'x', { duration: .6, ease: 'power3.out' });
      var py = gsap.quickTo(preview, 'y', { duration: .6, ease: 'power3.out' });
      var prot = gsap.quickTo(preview, 'rotation', { duration: .8, ease: 'power3.out' });
      var lastX = 0;
      var place = function (e) {
        px(e.clientX + 30);
        py(e.clientY - preview.offsetHeight / 2);
        prot(Math.max(-12, Math.min(12, (e.clientX - lastX) * .6)));
        lastX = e.clientX;
      };
      gsap.set(preview, { scale: .6 });
      previewRows.forEach(function (row) {
        row.addEventListener('mouseenter', function (e) {
          pimg.src = row.getAttribute('data-preview');
          lastX = e.clientX;
          gsap.set(preview, { x: e.clientX + 30, y: e.clientY - preview.offsetHeight / 2 });
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: .5, ease: 'power3.out', overwrite: 'auto' });
          gsap.fromTo(pimg, { scale: 1.4 }, { scale: 1, duration: .8, ease: 'power3.out' });
        });
        row.addEventListener('mousemove', place);
        row.addEventListener('mouseleave', function () {
          gsap.to(preview, { autoAlpha: 0, scale: .6, duration: .35, ease: 'power2.in', overwrite: 'auto' });
        });
      });
    }
  }

  // Lancement : on attend les polices pour découper les titres correctement
  var start = function () { enter(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
