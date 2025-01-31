document.addEventListener("DOMContentLoaded", function () {
    new WOW().init();
});


$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    items: 1,              // One item per slide
    loop: true,            // Infinite loop
    autoplay: true,        // Auto-play
    autoplayTimeout: 10000, // Time between transitions
    dots: true,            // Show navigation dots
    nav: false             // Hide navigation arrows
  });
});

// document.addEventListener("DOMContentLoaded", () => {
// 	const isDesktop = () => window.innerWidth > 767.9;

// 	let gap = 15;

// 	if (isDesktop()) gap = 0.0285 * window.innerWidth;

// 	const sliders = [];

// 	["#horizontal-ticker-rtl", "#horizontal-ticker-ltr"].forEach(
// 		(query, index) => {
// 			sliders.push(
// 				new Swiper(query, {
// 					loop: true,
// 					slidesPerView: "auto",
// 					spaceBetween: gap,
// 					speed: 8000,
// 					allowTouchMove: false,
// 					autoplay: {
// 						delay: 0,
// 						reverseDirection: index,
// 						disableOnInteraction: false
// 					}
// 				})
// 			);
// 		}
// 	);

// 	window.addEventListener("resize", () => {
// 		isDesktop() ? (gap = 0.0285 * window.innerWidth) : (gap = 15);

// 		sliders.forEach((slider) => {
// 			slider.params.spaceBetween = gap;
// 			slider.update();
// 		});
// 	});
// }); 

// var swiperOptions = {
//   loop: true,
//   freeMode: true,
//   autoplay: {
//     delay: 0,
//     // pauseOnMouseEnter:true,
//     disableOnInteraction:false,
//   },
//   loopAddBlankSlides:true,
//   cssMode:true,
//   slidesPerView: 2,
//   speed: 5000,
//   grabCursor: true,
//   loopAdditionalSlides: 2,
// };

$(document).ready(function () {
  const swiper = new Swiper('.swiper', {
    spaceBetween: 0,
    speed: 5000,
    direction: 'horizontal',
    autoplay: { delay: 0, disableOnInteraction: false },
    loop: true,
    slidesPerView: 1,
    freeMode: true,
    lazy: { loadPrevNext: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    },
  });
});


var swiper = new Swiper(".swiper-container", swiperOptions);

// const $card = document.querySelector('.card');
// let bounds;

// function rotateToMouse(e) {
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;
//   const leftX = mouseX - bounds.x;
//   const topY = mouseY - bounds.y;
//   const center = {
//     x: leftX - bounds.width / 2,
//     y: topY - bounds.height / 2
//   }
//   const distance = Math.sqrt(center.x**2 + center.y**2);
  
//   $card.style.transform = `
//     scale3d(1.07, 1.07, 1.07)
//     rotate3d(
//       ${center.y / 100},
//       ${-center.x / 100},
//       0,
//       ${Math.log(distance)* 2}deg
//     )
//   `;
  
//   $card.querySelector('.glow').style.backgroundImage = `
//     radial-gradient(
//       circle at
//       ${center.x * 2 + bounds.width/2}px
//       ${center.y * 2 + bounds.height/2}px,
//       #ffffff55,
//       #0000000f
//     )
//   `;
// }

// $card.addEventListener('mouseenter', () => {
//   bounds = $card.getBoundingClientRect();
//   document.addEventListener('mousemove', rotateToMouse);
// });

// $card.addEventListener('mouseleave', () => {
//   document.removeEventListener('mousemove', rotateToMouse);
//   $card.style.transform = '';
//   $card.style.background = '';
// });
// const cards = document.querySelectorAll(".team-card");

// cards.forEach((card) => {
//   card.addEventListener("mousemove", (e) => {
//     const rect = card.getBoundingClientRect();
    
//     // Get center position of the card
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
    
//     // Mouse position relative to the card
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     // Calculate the rotation effect based on mouse position
//     const rotationFactor = 10;
//     const rotateX = (y - centerY) / rotationFactor;
//     const rotateY = (centerX - x) / rotationFactor;
    
//     // Apply transformation to the card
//     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
//   });

//   // Reset the transform when mouse leaves
//   card.addEventListener("mouseleave", () => {
//     card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
//   });
// });

  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  $(document).ready(function() {
    // Define an array of celebrations with their respective dates, images, and wishes
    var celebrations = [
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
      // Add more celebrations here
    ];
  
    // Function to get the start date of Hanukkah
    function getHanukkahStartDate(year) {
      // Implement your Hanukkah start date calculation logic here
      // This is a simplified example, you might need a more accurate calculation
      return 25 + Math.floor((234 - 23 * year / 4 + 19 * Math.floor(year / 4)) % 19) - Math.floor(year / 4); 
    }
  
    // Check for upcoming celebrations
    var today = new Date();
    var upcomingCelebrations = celebrations.filter(function(celebration) {
      return celebration.date >= today;
    });
  
    // Sort upcoming celebrations by date
    upcomingCelebrations.sort(function(a, b) {
      return a.date - b.date;
    });
  
    // Display the image and wish for the nearest upcoming celebration
    if (upcomingCelebrations.length > 0) {
      var nearestCelebration = upcomingCelebrations[0];
      $(".celebration-images").html(
        "<img src='" + nearestCelebration.image + "' alt='" + nearestCelebration.name + "'>"
      );
      $(".celebration-images").append("<p>" + nearestCelebration.wish + "</p>");
    }
  });
  $(document).ready(function() {
    // Toggle navbar collapse on mobile
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').collapse('toggle'); // Use Bootstrap's toggle
    });

    // Toggle dropdown menu on mobile view
    $('.nav-item.dropdown > a').click(function(event) {
        event.stopPropagation(); // Prevent event bubbling to document click
        $(this).next('.dropdown-menu').collapse('toggle'); // Use Bootstrap's toggle for dropdown
    });

    // Close dropdown and navbar collapse if clicked outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.nav-item.dropdown').length) {
            $('.nav-item.dropdown .dropdown-menu').collapse('hide'); // Use Bootstrap's hide
        }
        if (!$(event.target).closest('.navbar-toggler, .navbar-collapse').length) {
            $('.navbar-collapse').collapse('hide'); // Use Bootstrap's hide
        }
    });

    // Close navbar collapse when a link inside is clicked
    $('.navbar-collapse').on('click', 'a', function() {
        $('.navbar-collapse').collapse('hide'); // Use Bootstrap's hide
    });
});