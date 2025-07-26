$(function () {
  // WOW animation initialization
  typeof WOW === "function" && new WOW().init();

  // Navbar dropdown hover behavior
  const e = document.querySelectorAll(".nav-item.dropdown");
  e.forEach(el => {
    const toggle = el.querySelector(".dropdown-toggle"),
      menu = el.querySelector(".dropdown-menu");
    el.addEventListener("mouseenter", () => {
      window.innerWidth < 992 && menu.classList.add("show");
    }, { passive: true });
    el.addEventListener("mouseleave", () => {
      window.innerWidth < 992 && menu.classList.remove("show");
    }, { passive: true });

    toggle.addEventListener("click", evt => {
      if (window.innerWidth >= 992) {
        evt.preventDefault();
        const isOpen = menu.classList.contains("show");
        document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));
        !isOpen && menu.classList.add("show");
      }
    });
  });

  // Hide nav collapse when clicking outside
  document.addEventListener("click", e => {
    if (!e.target.closest(".nav-item.dropdown"))
      document.querySelectorAll(".dropdown-menu.show").forEach(m => m.classList.remove("show"));

    if (!e.target.closest(".navbar-toggler, .navbar-collapse"))
      document.getElementById("navbarNav")?.classList.remove("show");
  }, { passive: true });

  // Apply lazy loading ONLY to non-carousel images
  $(".card-img-top:not(.owl-lazy), .card-img-top-pf, .card-img-top-af").each(function () {
    $(this).attr("loading", "lazy");
  });

  // Search functionality
  let items = [],
    searchInput = document.getElementById("searchInput"),
    searchResults = document.getElementById("searchResults"),
    searchBtn = document.getElementById("searchBtn"),
    yearFilter = document.getElementById("yearFilter"),
    categoryFilter = document.getElementById("categoryFilter");

  function loadSearchData() {
    if (items.length === 0) {
      $.ajax({
        url: "https://flickrift-88d83-default-rtdb.firebaseio.com/search.json",
        method: "GET",
        dataType: "json",
        success: function (res) {
          const extract = obj =>
            Array.isArray(obj) ?
              obj.filter(i => i && i.title).map(i => ({
                title: String(i.title),
                year: i.year || i.Year || "Unknown",
                category: i.category || i.Category || "Misc",
                url: i.url || i.Url || "#",
                image_poster: i.image_poster
              }))
              : [];

          const movies = extract(res.movies);
          const tvshows = extract(res.tvshows);
          items = [...movies, ...tvshows];
          populateFilters();
          setupAutocomplete();
        },
        error: (xhr, status, err) => {
          alert("Error loading data: " + err);
          console.error(err);
        }
      });
    }
  }

  function populateFilters() {
    [...new Set(items.map(i => i.year).filter(Boolean))].sort((a, b) => b - a)
      .forEach(year => yearFilter.innerHTML += `<option value="${year}">${year}</option>`);

    [...new Set(items.map(i => i.category).filter(Boolean))].sort()
      .forEach(cat => categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`);
  }

  function searchItems(query = "") {
    const term = query.toLowerCase().trim(),
      year = yearFilter.value,
      cat = categoryFilter.value;

    const results = items.filter(i =>
      i.title.toLowerCase().includes(term) &&
      (!year || i.year == year) &&
      (!cat || i.category === cat)
    );

    renderResults(results);
  }

  function renderResults(results) {
    searchResults.innerHTML = "";
    if (results.length) {
      results.forEach(r => {
        const el = document.createElement("div");
        el.className = "search-item d-flex align-items-center gap-3 p-2 rounded hover-shadow mb-2";
        el.style.cursor = "pointer";
        el.style.backgroundColor = "#1e1e1e";
        el.style.color = "#fff";
        el.innerHTML = `
          <img src="${r.image_poster}" alt="${r.title}" class="img-thumbnail" 
               style="width: 60px; height: 90px; object-fit: cover;" loading="lazy">
          <div class="span">
            <div class="fw-bold">${r.title}</div>
            <div class="text-muted small">${r.year} | ${r.category}</div>
          </div>
        `;
        el.addEventListener("click", () => window.open(r.url, "_blank"));
        searchResults.appendChild(el);
      });
    } else {
      searchResults.innerHTML = '<p class="text-center text-muted">No results found.</p>';
    }
  }

  function setupAutocomplete() {
    const titles = items.map(i => i.title);
    $("#searchInput").autocomplete({
      source: (req, res) => {
        const filtered = titles.filter(t => t.toLowerCase().startsWith(req.term.toLowerCase()));
        res(filtered.slice(0, 7));
      },
      select: (e, ui) => {
        $("#searchInput").val(ui.item.value);
        searchItems(ui.item.value);
        return false;
      }
    });
  }

  // Events
  $("#searchModal").on("show.bs.modal", () => loadSearchData());
  searchBtn.addEventListener("click", () => searchItems(searchInput.value));
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchItems(searchInput.value);
    }
  });
  yearFilter.addEventListener("change", () => searchItems(searchInput.value));
  categoryFilter.addEventListener("change", () => searchItems(searchInput.value));
});

// Owl Carousel - initialize AFTER all images have loaded
$(window).on("load", function () {
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      nav: true,
      dots: true,
      animateOut: "fadeOut",
      checkVisibility: false // important for hidden carousels
    });
  }
});
