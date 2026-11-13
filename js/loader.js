/**
 * Airplane Loading Animation for Fly With Friends
 * Handles:
 * 1. Subtle ~1-second initial page load animation
 * 2. Smooth internal page navigation transition
 */
(function () {
  // Styles for the airplane animation
  const style = document.createElement("style");
  style.id = "airplane-loader-styles";
  style.textContent = `
    @keyframes airplaneGlide {
      0% {
        transform: translate(-20px, 15px) scale(0.9) rotate(-8deg);
        opacity: 0;
      }
      30% {
        opacity: 1;
      }
      50% {
        transform: translate(0px, 0px) scale(1) rotate(0deg);
        opacity: 1;
      }
      70% {
        transform: translate(15px, -10px) scale(1.02) rotate(4deg);
        opacity: 1;
      }
      100% {
        transform: translate(45px, -30px) scale(1.05) rotate(8deg);
        opacity: 0;
      }
    }

    @keyframes cloudFloat {
      0% { transform: translateX(20px); opacity: 0; }
      50% { opacity: 0.6; }
      100% { transform: translateX(-20px); opacity: 0; }
    }

    .airplane-anim {
      animation: airplaneGlide 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    .cloud-anim {
      animation: cloudFloat 1.2s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);

  // Create Loader DOM Element
  const loader = document.createElement("div");
  loader.id = "airplane-page-loader";
  loader.className =
    "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-light/90 dark:bg-[#18110c]/90 backdrop-blur-md transition-opacity duration-300 pointer-events-auto opacity-100";

  loader.innerHTML = `
    <div class="relative flex flex-col items-center justify-center p-8">
      <!-- Glow & Clouds Effect -->
      <div class="absolute -top-6 -left-6 size-24 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
      
      <!-- Airplane Icon Container -->
      <div class="relative size-20 rounded-2xl bg-white dark:bg-[#2c241e] shadow-xl border border-[#f4ece7] dark:border-[#4a3b32] flex items-center justify-center mb-4 overflow-hidden">
        <span class="material-symbols-outlined text-primary text-4xl airplane-anim" style="font-variation-settings: 'FILL' 1;">
          flight_takeoff
        </span>
      </div>

      <!-- Brand Text & Subtle Dots -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold uppercase tracking-widest text-[#9c6c49] dark:text-[#b08d74]">
          Fly With Friends
        </span>
        <span class="flex gap-1 items-center">
          <span class="size-1 rounded-full bg-primary animate-ping"></span>
        </span>
      </div>
    </div>
  `;

  // Attach immediately to DOM
  if (document.body) {
    document.body.appendChild(loader);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(loader);
    });
  }

  // Dismiss loader after ~1 second
  function hideLoader() {
    setTimeout(() => {
      loader.classList.add("opacity-0", "pointer-events-none");
      loader.classList.remove("opacity-100", "pointer-events-auto");
      setTimeout(() => {
        loader.style.display = "none";
      }, 350);
    }, 900);
  }

  // Show loader for internal navigation
  function showLoader() {
    loader.style.display = "flex";
    // Trigger reflow
    void loader.offsetWidth;
    loader.classList.remove("opacity-0", "pointer-events-none");
    loader.classList.add("opacity-100", "pointer-events-auto");
  }

  // Initial load trigger
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  // Handle browser back/forward (bfcache)
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      loader.style.display = "none";
      loader.classList.add("opacity-0", "pointer-events-none");
    }
  });

  // Intercept internal links for smooth 1-second transition
  document.addEventListener("click", function (e) {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;

    const href = targetLink.getAttribute("href");
    if (!href) return;

    // Ignore anchors, external links, mailto, tel, javascript, new tab
    if (
      href.startsWith("#") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("javascript:") ||
      targetLink.target === "_blank" ||
      targetLink.hasAttribute("download") ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    ) {
      return;
    }

    // Check if internal HTML link or same origin
    const isInternal =
      href.endsWith(".html") ||
      href.startsWith("/") ||
      href === "index.html" ||
      (!href.includes("://") && !href.startsWith("//"));

    if (isInternal) {
      // Don't show if clicking the current page URL
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const targetPath = href.split("/").pop().split("#")[0].split("?")[0];
      if (currentPath === targetPath) return;

      e.preventDefault();
      showLoader();
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
})();
