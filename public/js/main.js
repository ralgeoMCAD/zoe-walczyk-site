// Toggle the mobile nav between collapsed and expanded ("responsive") states.
function initNavToggle() {
  const navbar = document.getElementById("mynavbar");
  const toggle = navbar?.querySelector(".icon");
  if (!navbar || !toggle) return;

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("responsive");
  });
}

// Wire up the gallery lightbox: click a thumbnail to open, prev/next to navigate,
// close button or backdrop click to dismiss.
function initLightbox() {
  const gallery = document.querySelector(".gallery");
  const lightbox = document.querySelector(".lightbox");
  if (!gallery || !lightbox) return;

  const lightboxImage = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");
  const images = Array.from(gallery.querySelectorAll("img"));
  let currentIndex = 0;

  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
  }

  function open(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
  }

  function close() {
    lightbox.classList.remove("is-open");
  }

  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      open(parseInt(e.target.dataset.index, 10));
    }
  });

  closeBtn.addEventListener("click", close);

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initLightbox();
});
