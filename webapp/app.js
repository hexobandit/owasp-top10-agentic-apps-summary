/* ========================================
   OWASP Top 10 Agentic Apps - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Reading Progress Bar ----
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // ---- Scroll Fade-In Animation ----
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ---- Expandable Scenario Items ----
  document.querySelectorAll('.scenario-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.scenario-item');
      const content = item.querySelector('.scenario-content');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        content.style.maxHeight = '0';
        item.classList.remove('open');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        item.classList.add('open');
      }
    });
  });

  // ---- Mitigation Checklist ----
  document.querySelectorAll('.mitigation-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const check = item.querySelector('.mitigation-check');
      check.textContent = item.classList.contains('checked') ? '✓' : '';
    });
  });

  // ---- Sidebar Active State (Threats Page) ----
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const threatSections = document.querySelectorAll('.threat-section');

  if (sidebarLinks.length && threatSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });

    threatSections.forEach(section => sectionObserver.observe(section));
  }

  // ---- Quiz Functionality ----
  document.querySelectorAll('.quiz-box').forEach(quiz => {
    const options = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.querySelector('.quiz-feedback');
    let answered = false;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = opt.dataset.correct === 'true';
        opt.classList.add(isCorrect ? 'correct' : 'wrong');

        if (!isCorrect) {
          options.forEach(o => {
            if (o.dataset.correct === 'true') o.classList.add('correct');
          });
        }

        if (feedback) {
          feedback.classList.add('show');
          feedback.style.background = isCorrect
            ? 'rgba(126,231,135,0.08)'
            : 'rgba(248,81,73,0.08)';
          feedback.style.border = `1px solid ${isCorrect ? 'rgba(126,231,135,0.3)' : 'rgba(248,81,73,0.3)'}`;
          feedback.textContent = isCorrect
            ? feedback.dataset.correct
            : feedback.dataset.wrong;
        }
      });
    });
  });

  // ---- Mobile Hamburger ----
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-header nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Typewriter effect for hero terminal ----
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const text = typewriter.dataset.text || '';
    typewriter.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40 + Math.random() * 30);
      }
    };
    setTimeout(type, 800);
  }

});
