// DS DECORATION — interactions du site (menu, apparitions, galerie, formulaire)
(function () {
  const root = document.documentElement;
  root.classList.add('js');

  // Ombre sous l'en-tête au défilement
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav a').forEach((a) =>
      a.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Apparition des blocs
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Galerie : visionneuse plein écran
  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (items.length) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Visionneuse de photos');
    box.innerHTML =
      '<figure style="margin:0"><img alt=""><figcaption class="lightbox__caption"></figcaption></figure>' +
      '<button class="lightbox__close" aria-label="Fermer">&times;</button>' +
      '<button class="lightbox__prev" aria-label="Photo précédente">&#8249;</button>' +
      '<button class="lightbox__next" aria-label="Photo suivante">&#8250;</button>';
    document.body.appendChild(box);
    const img = box.querySelector('img');
    const cap = box.querySelector('figcaption');
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const el = items[index];
      img.src = el.getAttribute('data-lightbox');
      img.alt = el.querySelector('img').alt;
      cap.textContent = el.getAttribute('data-caption') || '';
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox__close').focus();
    };
    const close = () => {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    items.forEach((el, i) =>
      el.addEventListener('click', (e) => {
        e.preventDefault();
        open(i);
      })
    );
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lightbox__next').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', (e) => e.target === box && close());
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  // Formulaire de contact : ouvre la messagerie avec le message pré-rempli
  // (aucun serveur nécessaire — voir README pour brancher un service d'envoi)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get('website')) return; // pot de miel anti-spam
      const subject = 'Demande de devis — ' + (data.get('prestation') || 'Renseignements');
      const body = [
        'Nom : ' + data.get('nom'),
        'Email : ' + data.get('email'),
        'Téléphone : ' + (data.get('telephone') || '—'),
        'Ville du chantier : ' + (data.get('ville') || '—'),
        'Prestation : ' + (data.get('prestation') || '—'),
        '',
        data.get('message'),
      ].join('\n');
      window.location.href =
        'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      form.querySelector('.form__status').classList.add('is-visible');
    });
  }

  // Année du copyright
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
})();
