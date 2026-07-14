// ===================================================
// SkillsMate Solutions — Career Compass 2026
// Core Interactions
// ===================================================

document.addEventListener('DOMContentLoaded', function () {

  /* AOS init */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* Navbar scroll state */
  const navbar = document.getElementById('mainNav');
  const onScrollNav = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav);
  onScrollNav();

  /* Scroll progress bar */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  /* Close mobile nav on link click */
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('.navbar-collapse');
      if (nav.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  /* Button ripple effect */
  document.querySelectorAll('.btn-cta').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* Animated counters */
  const counters = document.querySelectorAll('.js-counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        const target = +entry.target.dataset.target;
        const suffix = entry.target.dataset.suffix || '';
        let cur = 0;
        const steps = 50;
        const inc = target / steps;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= target) { cur = target; clearInterval(timer); }
          entry.target.textContent = Math.floor(cur) + suffix;
        }, 24);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* Roadmap scroll-fill (signature "Career Compass" path) */
  const roadmapWrap = document.querySelector('.roadmap-wrap');
  const roadmapFill = document.querySelector('.roadmap-line-fill');
  const roadmapNodes = document.querySelectorAll('.roadmap-node');
  if (roadmapWrap && roadmapFill) {
    const updateRoadmap = () => {
      const rect = roadmapWrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      let progress = (vh * 0.75 - rect.top) / total;
      progress = Math.max(0, Math.min(1, progress));
      roadmapFill.style.height = (progress * 100) + '%';
      roadmapNodes.forEach((node, i) => {
        const nodeProgress = (i + 0.5) / roadmapNodes.length;
        if (progress >= nodeProgress) node.classList.add('active');
        else node.classList.remove('active');
      });
    };
    window.addEventListener('scroll', updateRoadmap);
    updateRoadmap();
  }

  /* Countdown timer to next webinar (7 days from load, illustrative) */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const target = new Date();
    target.setDate(target.getDate() + 6);
    target.setHours(19, 0, 0, 0);
    const els = {
      d: document.getElementById('cd-days'),
      h: document.getElementById('cd-hours'),
      m: document.getElementById('cd-mins'),
      s: document.getElementById('cd-secs')
    };
    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, target - now);
      const days = Math.floor(diff / 86400000); diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000); diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);
      els.d.textContent = String(days).padStart(2, '0');
      els.h.textContent = String(hours).padStart(2, '0');
      els.m.textContent = String(mins).padStart(2, '0');
      els.s.textContent = String(secs).padStart(2, '0');
    };
    tick();
    setInterval(tick, 1000);
  }

  /* Swiper testimonials */
  if (window.Swiper) {
    new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
      }
    });
  }

  /* Floating particles in hero */
  const particleField = document.getElementById('particle-field');
  if (particleField) {
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('span');
      p.className = 'floating-particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = (Math.random() * 40) + '%';
      p.style.animationDuration = (Math.random() * 8 + 8) + 's';
      p.style.animationDelay = (Math.random() * 6) + 's';
      particleField.appendChild(p);
    }
  }

});

/* Smooth-scroll helper for CTA buttons pointing to #register */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 84, behavior: 'smooth' });
      }
    }
  });
});
