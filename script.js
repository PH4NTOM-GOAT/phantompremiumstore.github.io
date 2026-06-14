/* ==========================================
   PH4NTOM Premium Store
   Script
========================================== */


/* ---------- Zoom Sections ---------- */

const sections = document.querySelectorAll(".zoom-section");

const observer = new IntersectionObserver(

(entries) => {

entries.forEach((entry) => {

if (entry.isIntersecting) {

entry.target.classList.add("show");

}

});

},

{
threshold:0.2
}

);

sections.forEach((section) => {

observer.observe(section);

});



/* ---------- Active Navbar ---------- */

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

document.querySelectorAll("section").forEach((section) => {

const sectionTop = section.offsetTop;

const sectionHeight = section.clientHeight;

if (

pageYOffset >= sectionTop - 300

) {

current = section.getAttribute("id");

}

});

navLinks.forEach((link) => {

link.classList.remove("active");

if (

link.getAttribute("href") === "#" + current

) {

link.classList.add("active");

}

});

});



/* ---------- Smooth Scroll ---------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e) {

e.preventDefault();

const target = document.querySelector(

this.getAttribute("href")

);

target.scrollIntoView({

behavior:"smooth"

});

});

});



/* ---------- Hero Title Animation ---------- */

window.addEventListener("load", () => {

const heroTitle = document.querySelector(".hero h1");

heroTitle.animate(

[

{

opacity:0,

transform:"scale(.7)"

},

{

opacity:1,

transform:"scale(1)"

}

],

{

duration:1800,

easing:"ease-out"

}

);

});



/* ---------- Mouse Glow ---------- */

const glow = document.createElement("div");

glow.style.position = "fixed";

glow.style.width = "350px";

glow.style.height = "350px";

glow.style.borderRadius = "50%";

glow.style.pointerEvents = "none";

glow.style.background =

"radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)";

glow.style.transform = "translate(-50%,-50%)";

glow.style.zIndex = "-1";

glow.style.transition = "0.15s linear";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

glow.style.left = e.clientX + "px";

glow.style.top = e.clientY + "px";

});



/* ---------- Navbar Blur On Scroll ---------- */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 100){

navbar.style.background = "rgba(0,0,0,.7)";

navbar.style.backdropFilter = "blur(20px)";

}

else{

navbar.style.background = "rgba(0,0,0,.3)";

}

});



/* ---------- Parallax Hero ---------- */

window.addEventListener("scroll", () => {

const hero = document.querySelector(".hero");

let value = window.scrollY;

hero.style.transform =

`scale(${1 - value * 0.00015})`;

});



/* ---------- Fade Cards ---------- */

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

card.style.opacity = "0";

card.style.transform = "translateY(50px)";

card.style.transition =

"all .8s ease";

card.style.transitionDelay =

`${index * .15}s`;

});

const cardObserver = new IntersectionObserver(

(entries) => {

entries.forEach((entry) => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform = "translateY(0px)";

}

});

},

{

threshold:0.15

}

);

cards.forEach((card) => {

cardObserver.observe(card);

});
