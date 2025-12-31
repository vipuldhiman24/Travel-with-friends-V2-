document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/navbar.html")
    .then(res => {
      if (!res.ok) throw new Error("Navbar fetch failed");
      return res.text();
    })
    .then(html => {
      const mount = document.getElementById("navbar");
      if (!mount) return;

      mount.innerHTML = html;

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mobileMenu = document.getElementById("mobileMenu");

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
      }

      // Active link handling
      const path = window.location.pathname.split("/").pop() || "index.html";

      document.querySelectorAll("[data-link]").forEach(link => {
        const href = link.getAttribute("href");
        if (href === path) {
          link.classList.add("text-primary", "font-bold");
        }
      });
    })
    .catch(err => {
      console.error("Navbar load error:", err);
    });
});
