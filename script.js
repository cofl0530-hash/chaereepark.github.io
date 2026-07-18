// Reveal sheets on scroll (progressive enhancement — sections are visible
// by default in CSS, we only add the "pending" state here right before
// observing, so if this script fails for any reason content stays visible)
const sheets = document.querySelectorAll('.sheet');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('reveal-pending');
    }
  });
}, { threshold: 0.12 });
sheets.forEach(s => {
  const rect = s.getBoundingClientRect();
  const alreadyInView = rect.top < window.innerHeight * 0.85;
  if (!alreadyInView) s.classList.add('reveal-pending');
  revealObserver.observe(s);
});

// Scrollspy for side nav
const navLinks = document.querySelectorAll('.sheet-nav a[data-sheet]');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.sheet-nav a[href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sheets.forEach(s => { if (s.id) spyObserver.observe(s); });
