$(function(){
  typeof WOW==="function"&&new WOW().init();
  const e=document.querySelectorAll(".nav-item.dropdown");
  e.forEach(e=>{const t=e.querySelector(".dropdown-toggle"),n=e.querySelector(".dropdown-menu");e.addEventListener("mouseenter",()=>{window.innerWidth<992&&n.classList.add("show")},{passive:!0}),e.addEventListener("mouseleave",()=>{window.innerWidth<992&&n.classList.remove("show")},{passive:!0}),t.addEventListener("click",t=>{if(window.innerWidth>=992){t.preventDefault();const e=n.classList.contains("show");document.querySelectorAll(".dropdown-menu.show").forEach(e=>e.classList.remove("show")),e||n.classList.add("show")}})}),document.addEventListener("click",e=>{e.target.closest(".nav-item.dropdown")||document.querySelectorAll(".dropdown-menu.show").forEach(e=>e.classList.remove("show")),e.target.closest(".navbar-toggler, .navbar-collapse")||document.getElementById("navbarNav")?.classList.remove("show")},{passive:!0});
  
  $(".card-img-top, .card-img-top-pf, .card-img-top-af").each(function(){$(this).attr("loading","lazy")});

  let t=[],n=document.getElementById("searchInput"),a=document.getElementById("searchResults"),r=document.getElementById("searchBtn"),o=document.getElementById("yearFilter"),i=document.getElementById("categoryFilter");
  function l(){0===t.length&&$.ajax({url:"https://flickrift-88d83-default-rtdb.firebaseio.com/search.json",method:"GET",dataType:"json",success:function(e){const n=e=>Array.isArray(e)?e.filter(e=>e&&e.title).map(e=>({title:String(e.title),year:e.year||e.Year||"Unknown",category:e.category||e.Category||"Misc",url:e.url||e.Url||"#",image_poster:e.image_poster})):[],r=n(e.movies),o=n(e.tvshows);t=[...r,...o],u(),s()},error:function(e,t,n){alert("Error loading data: "+n),console.error(n)}})}
  function s(){[...new Set(t.map(e=>e.year).filter(Boolean))].sort((e,t)=>t-e).forEach(e=>o.innerHTML+=`<option value="${e}">${e}</option>`),[...new Set(t.map(e=>e.category).filter(Boolean))].sort().forEach(e=>i.innerHTML+=`<option value="${e}">${e}</option>`)}
  function d(e=""){const l=e.toLowerCase().trim(),s=o.value,d=i.value,c=t.filter(e=>e.title.toLowerCase().includes(l)&&(s?e.year==s:!0)&&(d?e.category===d:!0));m(c)}
  function m(e){a.innerHTML="",e.length?e.forEach(e=>{const t=document.createElement("div");t.className="search-item d-flex align-items-center gap-3 p-2 rounded hover-shadow mb-2",t.style.cursor="pointer",t.style.backgroundColor="#1e1e1e",t.style.color="#fff",t.innerHTML=`<img src="${e.image_poster}" alt="${e.title}" class="img-thumbnail" style="width: 60px; height: 90px; object-fit: cover;" loading="lazy"><div class="span"><div class="fw-bold">${e.title}</div><div class="text-muted small">${e.year} | ${e.category}</div></div>`,t.addEventListener("click",()=>{window.open(e.url,"_blank")}),a.appendChild(t)}):a.innerHTML='<p class="text-center text-muted">No results found.</p>'}
  function u(){const e=t.map(e=>e.title);$("#searchInput").autocomplete({source:(t,n)=>{const a=e.filter(e=>e.toLowerCase().startsWith(t.term.toLowerCase()));n(a.slice(0,7))},select:function(e,t){return $("#searchInput").val(t.item.value),d(t.item.value),!1}})}

  $("#searchModal").on("show.bs.modal",()=>l()),r.addEventListener("click",()=>d(n.value)),n.addEventListener("keydown",e=>{"Enter"===e.key&&(e.preventDefault(),d(n.value))}),o.addEventListener("change",()=>d(n.value)),i.addEventListener("change",()=>d(n.value))
});

// Keep owlCarousel separate and NOT minified
$(window).on("load", function () {
  $(".owl-carousel").length && $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    nav: true,
    dots: true,
    animateOut: "fadeOut",
    checkVisibility: false
  });
});
