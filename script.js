/* =============================================
   PH4NTOM Optimizations — Scripts
   ============================================= */

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* ---- Highlight active nav link based on scroll position ---- */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach((a) => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    },
    { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ---- Fade-in reveal on scroll ---- */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---- Windows 10 / 11 package toggle ---- */
const osButtons = document.querySelectorAll('.os-btn');
const osPanels = document.querySelectorAll('.os-panel');

osButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        osButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const target = btn.dataset.os;
        osPanels.forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.panel === target);
        });
    });
});
