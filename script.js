document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelectorAll(".nav-links a");

  menuBtn?.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("mobile-open"));
  });

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));

  const visual = document.querySelector(".hero-visual");
  const ac = document.querySelector(".ac-unit");

  if (visual && ac && window.matchMedia("(pointer:fine)").matches) {
    visual.addEventListener("mousemove", (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ac.style.transform =
        `perspective(900px) rotateY(${-9 + x * 10}deg) rotateX(${4 - y * 8}deg) translateY(-5px)`;
    });

    visual.addEventListener("mouseleave", () => {
      ac.style.transform = "";
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
});

const filterButtons = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryItems.forEach((item) => {

      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }

    });
  });
});