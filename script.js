
// MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen ? "&times;" : "☰";
});

// CLOSE MENU AFTER CLICKING A LINK

const navigationItems = document.querySelectorAll("#navLinks a");

navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";
    });
});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
