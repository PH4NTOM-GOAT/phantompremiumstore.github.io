/* ============================================================
   FILE 3 — script.js
   PH4NTOM Optimizations — Scripts
   ============================================================ */


/* ────────────────────────────────────────
   ELEMENT REFERENCES  (declared up-top so
   every block below can use them freely)
──────────────────────────────────────── */
const intro       = document.getElementById('intro');
const hero        = document.querySelector('.hero');
const pageWrapper = document.getElementById('pageWrapper');
const navToggle   = document.getElementById('navToggle');
const navLinks    = document.getElementById('navLinks');

const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalTitle   = document.getElementById('modalTitle');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalDesc    = document.getElementById('modalDesc');
const modalTiers   = document.getElementById('modalTiers');


/* ────────────────────────────────────────
   INTRO ANIMATION SEQUENCE

   Timeline (matches CSS keyframes):
     0ms    — "ZOOM" starts scaling up from tiny
     ~480ms — ZOOM reaches full size
     ~1630ms— ZOOM begins blasting into camera
     2400ms — ZOOM animation ends (gone)
     2500ms — JS hides the overlay
     2700ms — hero zooms in (in-view class)
──────────────────────────────────────── */
setTimeout(() => {
    // Fade out and hide the intro overlay
    intro.classList.add('hidden');

    // Trigger the hero zoom-in shortly after intro fades
    setTimeout(() => {
        hero.classList.add('in-view');

        // Start the inner-element reveal stagger for the hero too
        hero.querySelectorAll('.reveal').forEach((el) => {
            el.classList.add('visible');
        });
    }, 200);

}, 2500);


/* ────────────────────────────────────────
   SCROLL ZOOM REVEAL

   Each .zoom-section starts at
   scale(0.87) opacity(0) in CSS.
   IntersectionObserver adds .in-view when
   the section enters the viewport, which
   CSS transitions to scale(1) opacity(1).

   Hero is excluded — handled above by
   the intro sequence instead.
──────────────────────────────────────── */
const zoomObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.zoom-section').forEach((section) => {
    if (section !== hero) {           // hero handled by intro timing
        zoomObserver.observe(section);
    }
});


/* ────────────────────────────────────────
   INNER-ELEMENT REVEAL STAGGER

   .reveal elements (section heads, cards)
   fade + slide up once their section is
   at least 15% visible.
──────────────────────────────────────── */
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

document.querySelectorAll('.reveal').forEach((el) => {
    // Skip hero reveals — intro sequence handles those
    if (!hero.contains(el)) {
        revealObserver.observe(el);
    }
});


/* ────────────────────────────────────────
   ZOOM-NAV CLICK EFFECT

   When any .zoom-nav link is clicked:
     1. The page wrapper briefly scales up
        (zoom-flash), giving the feel of
        "zooming into" the target section.
     2. After the flash peak (~200ms),
        smooth-scroll to the target.
──────────────────────────────────────── */
document.querySelectorAll('.zoom-nav').forEach((link) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // Apply zoom flash to wrapper
        pageWrapper.classList.add('nav-zooming');
        pageWrapper.addEventListener('animationend', () => {
            pageWrapper.classList.remove('nav-zooming');
        }, { once: true });

        // Scroll after brief delay so flash is visible first
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 180);

        // Close mobile nav if open
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});


/* ────────────────────────────────────────
   ACTIVE NAV LINK HIGHLIGHT

   Watches each section and updates the
   matching nav link to .active as you
   scroll through the page.
──────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id], header[id], footer[id]');
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

sections.forEach((s) => sectionObserver.observe(s));


/* ────────────────────────────────────────
   MOBILE NAV TOGGLE
──────────────────────────────────────── */
navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});


/* ────────────────────────────────────────
   WINDOWS 10 / 11 PACKAGE TOGGLE
──────────────────────────────────────── */
const osButtons = document.querySelectorAll('.os-btn');
const osPanels  = document.querySelectorAll('.os-panel');

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


/* ────────────────────────────────────────
   SERVICE MODAL

   Data for each service card.
   Clicking a .service-card opens the modal
   with that service's content.
──────────────────────────────────────── */
const serviceData = {
    'windows-optimization': {
        eyebrow: '[ SERVICE // WINDOWS ]',
        title:   'Windows Optimization',
        desc:    'Full system tune-up targeting boot speed, gaming performance, background processes, and network latency. Covers registry tweaks, startup management, debloating, driver updates, and power plan configuration.',
        tiers:   [
            { name: 'Basic',   price: 'From $15', detail: 'Core debloat and performance tweaks' },
            { name: 'Premium', price: 'From $35', detail: 'Deep system, gaming, and network optimization' },
        ]
    },
    'discord-setup': {
        eyebrow: '[ SERVICE // DISCORD ]',
        title:   'Discord Setup',
        desc:    'A clean, organized Discord server built from scratch — complete with roles, permission levels, category structure, welcome bots, moderation bots, and a visual style that fits your brand.',
        tiers:   [
            { name: 'Basic Server',   price: 'Ask for quote', detail: 'Core structure, roles, and bots' },
            { name: 'Full Community', price: 'Ask for quote', detail: 'Full brand-matched setup with advanced automation' },
        ]
    },
    'game-tuning': {
        eyebrow: '[ SERVICE // GAMING ]',
        title:   'Game Performance Tuning',
        desc:    'Per-game in-game settings, driver configuration, and system-level tweaks dialed in to squeeze the most FPS and lowest input delay out of your setup for your favorite titles.',
        tiers:   [
            { name: 'Single Title', price: 'Ask for quote', detail: 'One game fully optimized' },
            { name: 'Multi-Title',  price: 'Ask for quote', detail: 'Up to five games tuned and configured' },
        ]
    },
    'pc-diagnostics': {
        eyebrow: '[ SERVICE // DIAGNOSTICS ]',
        title:   'PC Diagnostics & Setup',
        desc:    'Full hardware and software health check. Stress tests, temperature monitoring, driver audit, storage health, RAM verification, and a clean-up of anything slowing your system down.',
        tiers:   [
            { name: 'Diagnostic Only', price: 'Ask for quote', detail: 'Full report with recommendations' },
            { name: 'Diagnose + Fix',  price: 'Ask for quote', detail: 'Full report with hands-on remediation' },
        ]
    }
};

function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent   = data.title;
    modalDesc.textContent    = data.desc;

    // Render tier rows
    modalTiers.innerHTML = data.tiers.map((t) => `
        <div style="
            background: var(--smoke-2);
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        ">
            <div>
                <p style="font-family: var(--font-display); font-weight: 600; font-size: 15px;">${t.name}</p>
                <p style="color: var(--mist); font-size: 13px; margin-top: 4px;">${t.detail}</p>
            </div>
            <p style="font-family: var(--font-mono); font-size: 14px; white-space: nowrap;">${t.price}</p>
        </div>
    `).join('');

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Open on card click or keyboard Enter / Space
document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.service));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card.dataset.service);
        }
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
