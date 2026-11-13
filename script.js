// Murugavel Portfolio — interactions
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const progress = document.getElementById("scrollProgress");

  // Theme switcher: remember the visitor's choice on this device.
  function updateThemeButton() {
    const isDark = root.dataset.theme === "dark";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try { localStorage.setItem("murugavel-theme", nextTheme); } catch (error) {}
    updateThemeButton();
  });

  // Mobile navigation.
  function closeMenu() {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navLinks.forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("click", event => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Reveal sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Scroll progress and active navigation link.
  const sections = [...document.querySelectorAll("main section[id]")];
  function handleScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${percent}%`;

    let current = "home";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Footer year.
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Contact form: prepare an email in the visitor's default email application.
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    document.getElementById("formNote").textContent = "Your email app should open with the message prepared.";
    window.location.href = `mailto:murugavel1745@gmail.com?subject=${subject}&body=${body}`;
  });
});
