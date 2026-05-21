document.addEventListener('DOMContentLoaded', () => {
  const programsData = [
    {
      id: 'split',
      title: 'Split',
      description: 'Разделение тренировок по группам мышц для максимальной проработки и восстановления.',
      image: './assets/split.jpg'
    },
    {
      id: 'fullbody',
      title: 'Full Body',
      description: 'Комплексная проработка всего тела за одну тренировку. Идеально для прогресса и тонуса.',
      image: './assets/verh.jpg'
    },
    {
      id: 'upper-lower',
      title: 'Верх / Низ',
      description: 'Чередование дней для верхней и нижней части тела. Баланс силы и выносливости.',
      image: './assets/full-b.jpg'
    },
    {
      id: 'cross-fit',
      title: 'Кросс фит',
      description: 'Интенсивные функциональные тренировки, развивающие силу, выносливость и скорость.',
      image: './assets/cross.jpg'
    },
    {
      id: 'verh-tela',
      title: 'Грудь • Плечи / Спина • Руки',
      description: 'Классическая программа для набора мышечной массы и проработки верха тела.',
      image: './assets/verh-niz.jpg'
    },
    {
      id: '(PPL)',
      title: 'Push Pull Legs (PPL)',
      description: 'Эффективная система тренировок с разделением мышц по типу нагрузки: жим, тяга и ноги.',
      image: './assets/ppl.jpg'
    }

  ];

  const grid = document.getElementById('programs-grid');
  if (!grid) return;

  // Динамическое создание карточек
  programsData.forEach((program, index) => {
    const card = document.createElement('a');
    card.href = `/${program.id}`;
    card.className = 'program-card';
    card.setAttribute('data-program', program.id);
    card.style.animationDelay = `${index * 150}ms`;

    card.innerHTML = `
      <div class="program-card-bg" style="background-image: url('${program.image}');"></div>
      <div class="program-card-overlay"></div>
      <div class="program-card-arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      <div class="program-card-content">
        <h3 class="program-card-name">${program.title}</h3>
        <p class="program-card-desc">${program.description}</p>
      </div>
    `;

    grid.appendChild(card);
  });

  // === Анимация появления карточек тарифов при скролле ===
const pricingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Каскадная задержка для плавного появления
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 120);
      pricingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.pricing-card').forEach(card => {
  pricingObserver.observe(card);
});

  // Плавное появление при скролле (Intersection Observer)
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Применяем начальные стили для анимации
  const cards = document.querySelectorAll('.program-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
  // === TRAINERS MODAL LOGIC (ISOLATED) ===
(function() {
  const modal = document.getElementById('trainerModal');
  const modalClose = modal?.querySelector('.trainer-modal-close');
  const modalOverlay = modal?.querySelector('.trainer-modal-overlay');
  const modalName = document.getElementById('modalTrainerName');
  const modalPhoneBtn = document.getElementById('modalPhoneBtn');
  const modalSocialBtn = document.getElementById('modalSocialBtn');

  if (!modal || !modalClose) return;

  // Открытие модального окна
  document.querySelectorAll('.trainer-contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.trainerName;
      const phone = btn.dataset.trainerPhone;
      const social = btn.dataset.trainerSocial;

      if (modalName) modalName.textContent = name;
      if (modalPhoneBtn) modalPhoneBtn.href = `tel:${phone}`;
      if (modalSocialBtn) modalSocialBtn.href = social;

      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Блокируем скролл
    });
  });

  // Закрытие модального окна
  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Предотвращение закрытия при клике внутри контента
  modal.querySelector('.trainer-modal-content')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });
})();
});
