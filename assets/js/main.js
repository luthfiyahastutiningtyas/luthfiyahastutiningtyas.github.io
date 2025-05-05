document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // Hapus preloader ketika halaman selesai dimuat
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Lazy loading untuk gambar
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Sticky Header saat scroll
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    };
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  // Navbar link aktif saat scroll
  let navbarlinks = document.querySelectorAll('#navbar a');
  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  // Toggle mobile nav
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');
  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  // Hide mobile nav on same-page/hash links
  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (!navbarlink.hash) return;
    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  // Toggle mobile nav dropdowns
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');
        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    });
  });

  // Initiate GLightbox
  const glightbox = GLightbox({ selector: '.glightbox' });

  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Initiate Pure Counter
  new PureCounter();

  // Clients Slider
  new Swiper('.skills-slider', {
    speed: 400,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 40 },
      480: { slidesPerView: 3, spaceBetween: 60 },
      640: { slidesPerView: 4, spaceBetween: 80 },
      992: { slidesPerView: 6, spaceBetween: 120 }
    }
  });

  // Swiper slider with 1 slide at once in desktop view
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });

  // Swiper slider with 3 slides at once in desktop view
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 40 },
      1200: { slidesPerView: 3 }
    }
  });

  // Portfolio isotope and filter
  let portfolioIsotope = document.querySelector('.portfolio-isotope');
  if (portfolioIsotope) {
    let portfolioFilter = portfolioIsotope.getAttribute('data-portfolio-filter') || '*';
    let portfolioLayout = portfolioIsotope.getAttribute('data-portfolio-layout') || 'masonry';
    let portfolioSort = portfolioIsotope.getAttribute('data-portfolio-sort') || 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotopeInstance = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotopeInstance.arrange({ filter: this.getAttribute('data-filter') });
        }, false);
      });
    });
  }

  // Animation on scroll function and init
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aos_init);

  // EmailJS Initialization
  emailjs.init("qhzATaM9MGj2tkvOl");

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Mencegah form dikirim secara default

      // Ambil data dari form
      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      const pesan = document.getElementById("pesan").value;

      // Kirim email menggunakan EmailJS
      emailjs.send("service_tvay5h5", "template_y8wnmsp", {
        nama: nama,
        email: email,
        pesan: pesan
      })
      .then(function(response) {
        // Jika sukses
        alert("Pesan berhasil dikirim!");
        contactForm.reset();
      }, function(error) {
        // Jika gagal
        alert("Pesan gagal dikirim: " + JSON.stringify(error));
      });
    });
  }
});
