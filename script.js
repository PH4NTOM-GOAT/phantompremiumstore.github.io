/* ==========================================================
   PH4NTOM Optimizations
   script.js
========================================================== */

// Navbar blur
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});


// Mobile menu
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger?.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    burger.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
    );
});

// Close menu when clicking link
document.querySelectorAll(".nl").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


// Scroll reveal
const reveals = document.querySelectorAll(".reveal-up, .reveal-right");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(el => observer.observe(el));


// Counter animation
const counters = document.querySelectorAll(".stat-n");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let count = 0;

        const update = () => {

            const increment = Math.ceil(target / 80);

            count += increment;

            if (count > target) count = target;

            counter.textContent = count;

            if (count < target) {
                requestAnimationFrame(update);
            }
        };

        update();

        counterObserver.unobserve(counter);

    });
}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));


// Windows tabs
const tabs = document.querySelectorAll(".os-tab");
const panels = document.querySelectorAll(".pkg-panel");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        panels.forEach(panel => {
            panel.classList.remove("active");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        document
            .querySelector(`[data-panel="${tab.dataset.tab}"]`)
            .classList.add("active");

    });

});


// FAQ
document.querySelectorAll(".faq-item").forEach(item => {

    const button = item.querySelector(".faq-q");

    button.addEventListener("click", () => {

        document.querySelectorAll(".faq-item").forEach(i => {

            if (i !== item) {
                i.classList.remove("open");
                i.querySelector(".faq-q")
                    .setAttribute("aria-expanded", "false");
            }

        });

        item.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            item.classList.contains("open")
        );

    });

});


// Modal data
const serviceData = {

    windows: {
        tag: "WINDOWS OPTIMIZATION",
        title: "Windows Optimization",
        desc: "Performance tuning, debloating, registry tweaks and latency improvements.",

        tiers: `
        <div class="mtier">
            <h4>Basic</h4>
            <div class="mp">$10</div>
            <span class="mpkr">2,000 PKR</span>
            <ul>
                <li>Cleanup</li>
                <li>Startup optimization</li>
                <li>Driver checks</li>
            </ul>
        </div>

        <div class="mtier featured">
            <h4>Premium</h4>
            <div class="mp">$20</div>
            <span class="mpkr">5,000 PKR</span>
            <ul>
                <li>Registry tuning</li>
                <li>Network tweaks</li>
                <li>Gaming profile</li>
                <li>GPU optimization</li>
            </ul>
        </div>
        `
    },

    discord: {
        tag: "DISCORD SETUP",
        title: "Discord Services",
        desc: "Professional Discord server design and configuration.",

        tiers: `
        <div class="mtier featured">
            <h4>Server Setup</h4>
            <div class="mp">$15</div>
            <span class="mpkr">4,000 PKR</span>
            <ul>
                <li>Roles</li>
                <li>Channels</li>
                <li>Bots</li>
                <li>Permissions</li>
            </ul>
        </div>
        `
    },

    game: {
        tag: "GAME TUNING",
        title: "Game Optimization",
        desc: "Lower latency and maximize FPS.",

        tiers: `
        <div class="mtier featured">
            <h4>Gaming Package</h4>
            <div class="mp">$10</div>
            <span class="mpkr">3,000 PKR</span>
            <ul>
                <li>FPS tuning</li>
                <li>GPU settings</li>
                <li>Latency tweaks</li>
            </ul>
        </div>
        `
    },

    diag: {
        tag: "DIAGNOSTICS",
        title: "PC Diagnostics",
        desc: "Complete health inspection and troubleshooting.",

        tiers: `
        <div class="mtier featured">
            <h4>Diagnostics</h4>
            <div class="mp">$8</div>
            <span class="mpkr">2,000 PKR</span>
            <ul>
                <li>Hardware check</li>
                <li>Thermals</li>
                <li>Drivers</li>
            </ul>
        </div>
        `
    }

};


// Modal
const overlay = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("modalClose");

const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTiers = document.getElementById("modalTiers");

document.querySelectorAll(".svc-card").forEach(card => {

    card.addEventListener("click", () => {

        const data = serviceData[card.dataset.svc];

        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalTiers.innerHTML = data.tiers;

        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");

    });

});


function closeModal() {

    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");

}

closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", e => {

    if (e.target === overlay) {
        closeModal();
    }

});

window.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        closeModal();
    }

});


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// Particle background
const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }

    resize();

    window.addEventListener("resize", resize);

    const particles = [];

    for (let i = 0; i < 70; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3
        });

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width)
                p.dx *= -1;

            if (p.y < 0 || p.y > canvas.height)
                p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(255,255,255,0.15)";
            ctx.fill();

        });

        requestAnimationFrame(animate);

    }

    animate();
}
