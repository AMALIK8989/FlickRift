$(function () {
  // ✅ WOW Init
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // ✅ Owl Carousel Init
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      nav: true,
      dots: true,
      animateOut: 'fadeOut'
    });
  }

  // ✅ Celebration Images & Wish
  function getHanukkahStartDate(year) {
    return 25 + Math.floor((234 - 23 * year / 4 + 19 * Math.floor(year / 4)) % 19) - Math.floor(year / 4);
  }

  const celebrations = [
    {
      name: "New Year",
      date: new Date(new Date().getFullYear(), 0, 1),
      image: "new_year.jpg",
      wish: "Happy New Year!"
    },
    {
      name: "Pride Day",
      date: new Date(new Date().getFullYear(), 6, 28),
      image: "../Assets/Img/Footer Pride.png",
      wish: "Happy Pride Day!"
    },
    {
      name: "Thanksgiving Day",
      date: new Date(new Date().getFullYear(), 10, new Date('November ' + (new Date().getFullYear()) + ' ' + '4').getDate()),
      image: "thanksgiving.jpg",
      wish: "Happy Thanksgiving!"
    },
    {
      name: "Independence Day (USA)",
      date: new Date(new Date().getFullYear(), 6, 4),
      image: "4th_july.jpg",
      wish: "Happy 4th of July!"
    },
    {
      name: "Independence Day (India/Pakistan)",
      date: new Date(new Date().getFullYear(), 7, 14),
      image: "15th_august.jpg",
      wish: "Happy Independence Day!"
    },
    {
      name: "Christmas",
      date: new Date(new Date().getFullYear(), 11, 25),
      image: "christmas.jpg",
      wish: "Merry Christmas!"
    },
    {
      name: "Hanukkah",
      date: new Date(new Date().getFullYear(), 11, getHanukkahStartDate(new Date().getFullYear())),
      image: "hanukkah.jpg",
      wish: "Happy Hanukkah!"
    }
  ];

  const today = new Date();
  const upcoming = celebrations.filter(c => c.date >= today).sort((a, b) => a.date - b.date);
  if (upcoming.length > 0) {
    const next = upcoming[0];
    $(".celebration-images").html(`<img src="${next.image}" alt="${next.name}"><p>${next.wish}</p>`);
  }

  // ✅ Dropdown for Navbar
  const dropdowns = document.querySelectorAll(".nav-item.dropdown");
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth < 992) menu.classList.add("show");
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth < 992) menu.classList.remove("show");
    });

    toggle.addEventListener("click", (e) => {
      if (window.innerWidth >= 992) {
        e.preventDefault();
        const open = menu.classList.contains("show");
        document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
        if (!open) menu.classList.add("show");
      }
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".nav-item.dropdown")) {
      document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
    }
    if (!e.target.closest(".navbar-toggler, .navbar-collapse")) {
      document.getElementById("navbarNav")?.classList.remove("show");
    }
  });

  // ✅ Lazy Image Loader
  const lazyStyles = `
    <style id="lazy-style-block">
      .lazy {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        background: #f0f0f0 url('/images/loading.gif') no-repeat center center;
        background-size: 40px 40px;
        display: block;
        min-height: 200px;
      }
      .lazy.loaded {
        opacity: 1;
        background: none !important;
      }
    </style>
  `;
  if (!$('#lazy-style-block').length) {
    $('head').append(lazyStyles);
  }

  $('.card-img-top, .card-img-top-pf, .card-img-top-af').each(function () {
    const $img = $(this);
    const src = $img.attr('src');
    if (src && !$img.attr('data-src')) {
      $img.attr('data-src', src);
      $img.removeAttr('src');
      $img.addClass('lazy');
    }
  });

  function lazyLoad() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    $('.lazy').each(function () {
      const $img = $(this);
      if ($img.attr('src')) return;
      const imgTop = $img.offset().top;
      if (imgTop < (scrollTop + windowHeight + 200)) {
        const realSrc = $img.attr('data-src');
        if (realSrc) {
          $img.attr('src', realSrc).on('load', function () {
            $img.addClass('loaded');
          });
        }
      }
    });
  }

  let lazyTimeout;
  function throttledLazyLoad() {
    if (lazyTimeout) clearTimeout(lazyTimeout);
    lazyTimeout = setTimeout(lazyLoad, 200);
  }

  $(window).on('scroll resize', throttledLazyLoad);
  lazyLoad();

  // ✅ Search Modal Movie Data
  let movieData = [];

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchBtn = document.getElementById('searchBtn');
  const yearFilter = document.getElementById('yearFilter');
  const categoryFilter = document.getElementById('categoryFilter');

  function loadMovieData() {
    if (movieData.length === 0) {
      $.ajax({
        url: 'https://flickrift-88d83-default-rtdb.firebaseio.com/search.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          const cleanArray = (arr) => {
            if (!Array.isArray(arr)) return [];
            return arr.filter(item => item && item.title).map(item => ({
              title: String(item.title),
              year: item.year || item.Year || 'Unknown',
              category: item.category || item.Category || 'Misc',
              url: item.url || item.Url || '#',
              image_poster: item.image_poster,
            }));
          };
          const movies = cleanArray(data.movies);
          const tvshows = cleanArray(data.tvshows);
          movieData = [...movies, ...tvshows];
          setupAutocomplete();
          populateFilters();
        },
        error: function (xhr, status, error) {
          alert('Error loading data: ' + error);
          console.error(error);
        }
      });
    }
  }

  function populateFilters() {
    const years = [...new Set(movieData.map(item => item.year).filter(Boolean))].sort((a, b) => b - a);
    const categories = [...new Set(movieData.map(item => item.category).filter(Boolean))].sort();
    years.forEach(year => yearFilter.innerHTML += `<option value="${year}">${year}</option>`);
    categories.forEach(cat => categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`);
  }

  function searchMovies(query = '') {
    const q = query.toLowerCase().trim();
    const selectedYear = yearFilter.value;
    const selectedCategory = categoryFilter.value;

    const filtered = movieData.filter(movie => {
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchYear = selectedYear ? movie.year == selectedYear : true;
      const matchCategory = selectedCategory ? movie.category === selectedCategory : true;
      return matchTitle && matchYear && matchCategory;
    });

    renderSearchResults(filtered);
  }

  function renderSearchResults(filtered) {
    searchResults.innerHTML = '';
    if (!filtered.length) {
      searchResults.innerHTML = '<p class="text-center text-muted">No results found.</p>';
      return;
    }

    filtered.forEach(movie => {
      searchResults.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card bg-secondary text-white h-100">
            <img src="${movie.image_poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <h6 class="card-title">${movie.title}</h6>
              <p class="card-text"><small>${movie.year} | ${movie.category}</small></p>
              <a href="${movie.url}" class="btn btn-outline-light btn-sm" target="_blank">Watch</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  function setupAutocomplete() {
    const titles = movieData.map(movie => movie.title);
    $('#searchInput').autocomplete({
      source: (request, response) => {
        const results = titles.filter(title =>
          title.toLowerCase().startsWith(request.term.toLowerCase())
        );
        response(results.slice(0, 7));
      },
      select: function (event, ui) {
        $('#searchInput').val(ui.item.value);
        searchMovies(ui.item.value);
        return false;
      }
    });
  }

  $('#searchModal').on('show.bs.modal', () => loadMovieData());
  searchBtn.addEventListener('click', () => searchMovies(searchInput.value));
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchMovies(searchInput.value);
    }
  });

  yearFilter.addEventListener('change', () => searchMovies(searchInput.value));
  categoryFilter.addEventListener('change', () => searchMovies(searchInput.value));
});
