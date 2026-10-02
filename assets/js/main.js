// DS Décoration : menu mobile, visionneuse des photos, formulaire de devis, carte.
(function () {
  // Menu mobile
  var button = document.querySelector('.menu-button');
  var menu = document.getElementById('menu');
  if (button && menu) {
    button.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? 'Fermer' : 'Menu';
    });
  }

  // Visionneuse : agrandit les photos de la galerie
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot button'));
  if (shots.length) {
    var viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Photo agrandie');
    viewer.innerHTML =
      '<div class="viewer-bar"><div><button type="button" data-go="-1">Précédente</button> ' +
      '<button type="button" data-go="1">Suivante</button></div>' +
      '<button type="button" data-close>Fermer</button></div><img alt=""><p></p>';
    document.body.appendChild(viewer);
    var img = viewer.querySelector('img');
    var caption = viewer.querySelector('p');
    var current = 0;
    var opener = null;

    var show = function (i) {
      current = (i + shots.length) % shots.length;
      var shot = shots[current];
      img.style.visibility = 'hidden';
      img.onload = function () { img.style.visibility = ''; };
      img.src = shot.getAttribute('data-full');
      img.alt = shot.querySelector('img').alt;
      var fc = shot.closest('figure').querySelector('figcaption');
      caption.textContent = fc.firstChild.textContent.trim() + ' : ' + fc.querySelector('span').textContent.trim();
    };
    var animated = function () {
      return window.gsap && document.documentElement.classList.contains('motion');
    };
    var close = function () {
      var done = function () {
        viewer.classList.remove('open');
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
        if (opener) opener.focus();
      };
      if (animated()) {
        window.gsap.to(viewer, { autoAlpha: 0, duration: .35, ease: 'power2.in', onComplete: function () {
          window.gsap.set(viewer, { clearProps: 'opacity,visibility' });
          done();
        } });
      } else {
        done();
      }
    };
    // Agrandit la photo depuis la position de sa vignette
    var zoomFrom = function (thumb) {
      if (!animated()) return;
      var from = thumb.getBoundingClientRect();
      var run = function () {
        var to = img.getBoundingClientRect();
        if (!to.width) return;
        window.gsap.fromTo(img, {
          x: from.left + from.width / 2 - (to.left + to.width / 2),
          y: from.top + from.height / 2 - (to.top + to.height / 2),
          scale: from.width / to.width
        }, { x: 0, y: 0, scale: 1, duration: .8, ease: 'expo.out' });
      };
      if (img.complete && img.naturalWidth) run(); else img.addEventListener('load', run, { once: true });
      window.gsap.fromTo(viewer, { backgroundColor: 'rgba(23, 29, 35, 0)' }, { backgroundColor: 'rgba(23, 29, 35, .96)', duration: .5 });
      window.gsap.from([caption, viewer.querySelector('.viewer-bar')], { autoAlpha: 0, y: 16, duration: .5, delay: .3 });
    };

    shots.forEach(function (shot, i) {
      shot.addEventListener('click', function () {
        opener = shot;
        show(i);
        viewer.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (window.__lenis) window.__lenis.stop();
        zoomFrom(shot.querySelector('img'));
        viewer.querySelector('[data-close]').focus();
      });
    });
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer || e.target.hasAttribute('data-close')) close();
      if (e.target.hasAttribute('data-go')) show(current + Number(e.target.getAttribute('data-go')));
    });
    document.addEventListener('keydown', function (e) {
      if (!viewer.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // Formulaire de devis : prépare un e-mail dans la messagerie du visiteur
  var form = document.getElementById('devis-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      if (data.get('site')) return;
      var lines = [
        'Nom : ' + data.get('nom'),
        'E-mail : ' + data.get('email'),
        'Téléphone : ' + (data.get('telephone') || 'non renseigné'),
        'Commune du chantier : ' + (data.get('commune') || 'non renseignée'),
        'Travaux : ' + (data.get('travaux') || 'non précisé'),
        '',
        data.get('message')
      ];
      var subject = 'Demande de devis' + (data.get('travaux') ? ' : ' + data.get('travaux') : '');
      window.location.href = 'mailto:' + form.getAttribute('data-to') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      form.querySelector('.form-done').classList.add('show');
    });
  }

  // Carte : chargée seulement à la demande (pas de cookies Google sans action du visiteur)
  var mapButton = document.querySelector('[data-load-map]');
  if (mapButton) {
    mapButton.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.title = 'Plan d’accès, 291 route de Loex à Nangy';
      frame.src = mapButton.getAttribute('data-load-map');
      frame.loading = 'lazy';
      mapButton.closest('.map').appendChild(frame);
      mapButton.remove();
    });
  }
})();
