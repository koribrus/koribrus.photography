const toggler = document.querySelector('.toggler');
const overlay = document.querySelector('.overlay');
const contact = document.querySelector('.contact');
const navList = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const showcaseImg = document.querySelector('.showcase');
const photoColumn = document.querySelector('.photo__column');
const photoRows = document.querySelectorAll('.photo__row');
const photosLazy = document.querySelectorAll('img[data-src]');
const spacers = document.querySelectorAll('.spacer');

//////////////////////////////////////////////////////////////////
// Darken & fade out showcase at menu click
const overlayHome = function () {
  if (document.querySelector('.overlay')) {
    const overlayStyles = getComputedStyle(overlay);

    toggler.addEventListener('click', function () {
      overlayStyles.opacity === '0'
        ? overlay.setAttribute('style', 'opacity: 1')
        : overlay.setAttribute('style', 'opacity: 0');

      //  covers contact form with overlay
      if (!contact) return;
      contact.classList.toggle('contact__blur');
    });
  }
};

overlayHome();

//////////////////////////////////////////////////////////////////
// hover formatting for homepage menu
navItems.forEach((item) => {
  item.addEventListener('mouseover', function (e1) {
    e1.target.setAttribute('style', 'color: var(--tertiary-text)');

    navItems.forEach((item) => {
      if (item === e1.target) return;
      if (item !== e1.target) {
        item.setAttribute('style', 'opacity: 0.7');
      }
    });
  });

  item.addEventListener('mouseout', function (e1) {
    e1.target.setAttribute('style', 'color: var(--primary-text)');

    navItems.forEach((item) => {
      if (item === e1.target) return;
      if (item !== e1.target) {
        item.setAttribute('style', 'opacity: 1');
      }
    });
  });
});

//////////////////////////////////////////////////////////////////
// reveal photo rows
const revealRow = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // remove class to enact reveal
  entry.target.classList.remove('photo-section-hidden');
  observer.unobserve(entry.target);
};

const revealRowOptions = {
  root: null,
  threshold: 0.14,
};

const rowObserver = new IntersectionObserver(revealRow, revealRowOptions);

photoRows.forEach((row) => {
  rowObserver.observe(row);

  // Currently the site has photo__rows hidden and uses Javascript to reveal rows on scroll. If making photos visible for javascript disabled users, 'photo-section-hidden' should be removed from 'photo__row' elements in html and the line below should be uncommented.
  // row.classList.add('photo-section-hidden');
});

// lazy loading images
const loadPhoto = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // replace src with data-src
    entry.target.src = entry.target.dataset.src;

    // remove blur filter from lazy load images (add class and functionality when lazy image sizes reduced to 220w). **Not used because on a slower network speeds the limiting factor is the large showcase image. By the time its loaded, smaller images have already loaded successfully. If desired, functionality works but 'lazy-blur' must be added to img and not <a> tag
    // entry.target.addEventListener('load', function () {
    //   entry.target.classList.remove('lazy-blur');
    // });

    observer.unobserve(entry.target);
  });
};

const photoOptions = {
  root: null,
  threshold: 0,
  rootMargin: '50px',
};

const photoObserver = new IntersectionObserver(loadPhoto, photoOptions);

photosLazy.forEach((img) => {
  photoObserver.observe(img);
});

//////////////////////////////////////////////////////////////////
// lightbox

const galleryOptions = {
  // whether to slide in new photos or not, disable to fade
  animationSlide: false,

  // width / height ratios
  widthRatio: 0.95,
  heightRatio: 0.95,

  // fade speed in ms
  fadeSpeed: 250,

  // disable right click
  disableRightClick: true,
};

const gallery = new SimpleLightbox('.gallery a', galleryOptions);
