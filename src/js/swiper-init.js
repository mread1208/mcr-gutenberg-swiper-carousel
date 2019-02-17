var swiper = (function() {
	new Swiper(".js-mcr-swiper-container", {
		navigation: {
			nextEl: ".js-mcr-swiper-button-next",
			prevEl: ".js-mcr-swiper-button-prev"
		},
		pagination: {
			el: ".js-mcr-swiper-pagination"
		},
		loop: true,
		speed: 500,
		slidesPerView: 1,
		autoplay: {
			delay: 4000
		}
	});
})();
