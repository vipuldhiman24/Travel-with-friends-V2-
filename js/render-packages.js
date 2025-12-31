const grid = document.getElementById("packagesGrid");

// only show first 4
PACKAGES.slice(0, 4).forEach(pkg => {
  grid.innerHTML += `
<div class="group bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20">
  <div class="relative h-56 overflow-hidden">
    <img src="${pkg.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    ${pkg.badge ? `
    <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1">
      <span class="material-symbols-outlined text-sm text-primary">star</span> ${pkg.badge}
    </div>` : ``}
    <div class="absolute bottom-3 right-3 bg-primary text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
      ${pkg.price}
    </div>
  </div>

  <div class="p-5 flex flex-col gap-3">
    <div class="flex justify-between items-start">
      <div>
        <h4 class="text-lg font-bold group-hover:text-primary transition-colors">
          ${pkg.title}
        </h4>
        <p class="text-sm flex items-center gap-1 mt-1">
          <span class="material-symbols-outlined text-[16px]">location_on</span>
          ${pkg.location}
        </p>
      </div>
      <span class="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
        ${pkg.duration}
      </span>
    </div>

    <p class="text-sm line-clamp-2">
      ${pkg.shortDesc}
    </p>

    <div class="pt-2 mt-auto border-t flex justify-between items-center">
      <div class="text-[10px] font-bold">${pkg.group}</div>
      <a
            href="Trips.html?pkg=${pkg.id}"
            class="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            View Details
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
    </div>
  </div>
</div>`;
});
