var swiper = (function() {
	new Swiper(".js-mcr-swiper-container", {
		navigation: {
			nextEl: ".js-swiper-button-next",
			prevEl: ".js-swiper-button-prev"
		},
		pagination: {
			el: ".swiper-pagination"
		},
		loop: true,
		speed: 500,
		slidesPerView: 1,
		autoplay: {
			delay: 4000
		}
	});
})();
