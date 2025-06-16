$(function () {
  if (typeof WOW === 'function') new WOW().init();

  if ($(".owl-carousel").length) $(".owl-carousel").owlCarousel({ items: 1, loop: true, autoplay: true, autoplayTimeout: 4000, nav: true, dots: true, animateOut: 'fadeOut' });

  const celebrations = [
    { name: "New Year", date: new Date(new Date().getFullYear(), 0, 1), image: "new_year.jpg", wish: "Happy New Year!" },
    { name: "Pride Day", date: new Date(new Date().getFullYear(), 6, 28), image: "../Assets/Img/Footer Pride.png", wish: "Happy Pride Day!" },
    { name: "Thanksgiving Day", date: new Date(new Date().getFullYear(), 10, 23), image: "thanksgiving.jpg", wish: "Happy Thanksgiving!" },
    { name: "Independence Day (USA)", date: new Date(new Date().getFullYear(), 6, 4), image: "4th_july.jpg", wish: "Happy 4th of July!" },
    { name: "Independence Day (India/Pakistan)", date: new Date(new Date().getFullYear(), 7, 14), image: "15th_august.jpg", wish: "Happy Independence Day!" },
    { name: "Christmas", date: new Date(new Date().getFullYear(), 11, 25), image: "christmas.jpg", wish: "Merry Christmas!" },
    { name: "Hanukkah", date: new Date(new Date().getFullYear(), 11, 25 + Math.floor((234 - 23 * new Date().getFullYear() / 4 + 19 * Math.floor(new Date().getFullYear() / 4)) % 19) - Math.floor(new Date().getFullYear() / 4)), image: "hanukkah.jpg", wish: "Happy Hanukkah!" }
  ];
  const next = celebrations.filter(c => c.date >= new Date()).sort((a, b) => a.date - b.date)[0];
  if (next) $(".celebration-images").html(`<img src="${next.image}" alt="${next.name}"><p>${next.wish}</p>`);

  $(".nav-item.dropdown").each(function () {
    const $d = $(this), $t = $d.find(".dropdown-toggle"), $m = $d.find(".dropdown-menu");
    $d.hover(() => window.innerWidth < 992 && $m.addClass("show"), () => window.innerWidth < 992 && $m.removeClass("show"));
    $t.click(e => { if (window.innerWidth >= 992) { e.preventDefault(); $(".dropdown-menu.show").removeClass("show"); $m.toggleClass("show"); } });
  });

  $(document).click(e => {
    if (!$(e.target).closest(".nav-item.dropdown").length) $(".dropdown-menu.show").removeClass("show");
    if (!$(e.target).closest(".navbar-toggler, .navbar-collapse").length) $("#navbarNav").removeClass("show");
  });

  if (!$('#lazy-style-block').length) $('head').append(`<style id="lazy-style-block">.lazy{opacity:0;transition:opacity .5s ease-in-out;background:#f0f0f0 url('./Assets/loading.gif') no-repeat center;background-size:40px 40px;min-height:200px;display:block}.lazy.loaded{opacity:1;background:none!important}</style>`);

  $('.card-img-top, .card-img-top-pf, .card-img-top-af').each(function () {
    const $i = $(this), s = $i.attr('src');
    if (s && !$i.attr('data-src')) $i.attr({ 'data-src': s }).removeAttr('src').addClass('lazy');
  });

  function lazyLoad() {
    const st = $(window).scrollTop(), wh = $(window).height();
    $('.lazy').each(function () {
      const $i = $(this);
      if (!$i.attr('src') && $i.offset().top < (st + wh + 200)) {
        $i.attr('src', $i.attr('data-src')).on('load', () => $i.addClass('loaded'));
      }
    });
  }
  $(window).on('scroll resize', () => setTimeout(lazyLoad, 200));
  lazyLoad();

  let movieData = [], $input = $('#searchInput'), $results = $('#searchResults'), $btn = $('#searchBtn'), $year = $('#yearFilter'), $cat = $('#categoryFilter');

  function loadMovieData() {
    if (movieData.length) return;
    $.getJSON('https://flickrift-88d83-default-rtdb.firebaseio.com/search.json', data => {
      const clean = arr => Array.isArray(arr) ? arr.filter(x => x?.title).map(x => ({ title: String(x.title), year: x.year || x.Year || 'Unknown', category: x.category || x.Category || 'Misc', url: x.url || x.Url || '#', image_poster: x.image_poster })) : [];
      movieData = [...clean(data.movies), ...clean(data.tvshows)];
      setupAutocomplete();
      populateFilters();
    });
  }

  function populateFilters() {
    const ys = [...new Set(movieData.map(x => x.year?.toString().trim()).filter(Boolean))].sort((a, b) => b - a);
    const cs = [...new Set(movieData.map(x => x.category?.toString().trim()).filter(Boolean))].sort();
    $year.html('<option value="">All Years</option>' + ys.map(y => `<option value="${y}">${y}</option>`).join(''));
    $cat.html('<option value="">All Categories</option>' + cs.map(c => `<option value="${c}">${c}</option>`).join(''));
  }

  function renderSearchResults(filtered) {
    if (!filtered.length) return $results.html('<p class="text-center text-muted">No results found.</p>');
    $results.html(filtered.map(m => `
      <a href="${m.url}" target="_blank" class="search-item d-flex align-items-center gap-3 p-2 mb-2 rounded" style="text-decoration: none; background-color: #1e1e1e; color: #fff;">
        <img src="${m.image_poster}" alt="${m.title}" class="img-thumbnail" style="width:60px;height:90px;object-fit:cover;">
        <div><div class="fw-bold">${m.title}</div><div class="text-muted small">${m.year} | ${m.category}</div></div>
      </a>`).join(''));
  }

  function searchMovies(q = '') {
    const s = q.toLowerCase().trim(), y = $year.val(), c = $cat.val();
    const f = movieData.filter(m => m.title.toLowerCase().includes(s) && (!y || m.year == y) && (!c || m.category === c));
    renderSearchResults(f);
  }

  function setupAutocomplete() {
    $input.autocomplete({
      minLength: 1,
      source: (req, res) => res(movieData.map(m => m.title).filter(t => t.toLowerCase().startsWith(req.term.toLowerCase())).slice(0, 10)),
      select: (e, ui) => { $input.val(ui.item.value); searchMovies(ui.item.value); return false; }
    });
  }

  $('#searchModal').on('show.bs.modal', loadMovieData);
  $btn.click(() => searchMovies($input.val()));
  $input.keydown(e => { if (e.key === 'Enter') { e.preventDefault(); searchMovies($input.val()); } });
  $year.add($cat).change(() => searchMovies($input.val()));
});
