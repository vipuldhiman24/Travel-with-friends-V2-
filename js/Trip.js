document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const packageId = Number(params.get("pkg"));

  console.log("pkg from URL:", packageId);

  const pkg = window.PACKAGES.find(p => p.id === packageId);

  if (!pkg) {
    document.body.innerHTML = `
      <div class="min-h-screen flex items-center justify-center text-xl font-bold">
        Trip not found 💔
      </div>
    `;
    return;
  }

  // BASIC INFO
  document.getElementById("pkg-title").textContent = pkg.title;
  document.getElementById("pkg-location").textContent = pkg.location;
  document.getElementById("pkg-desc").textContent = pkg.shortDesc;
  document.getElementById("pkg-price").textContent = pkg.price;
  document.getElementById("pkg-duration").textContent = pkg.duration;

  // HERO IMAGE
  document.getElementById("pkg-image").style.backgroundImage =
    `url(${pkg.image})`;

  // ITINERARY
  const itineraryContainer = document.getElementById("pkg-itinerary");
  itineraryContainer.innerHTML = "";

  pkg.itinerary.forEach(item => {
    itineraryContainer.innerHTML += `
      <div class="relative pl-8 group">
        <div class="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-gray-800"></div>
        <div class="flex flex-col gap-2">
          <span class="text-sm font-bold text-primary uppercase tracking-wider">${item.day}</span>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">${item.heading}</h3>
          <p class="text-gray-600 dark:text-gray-300">${item.description}</p>
        </div>
      </div>
    `;
  });
});
