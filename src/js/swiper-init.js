// Must include the swiper slider first!
if (window.Swiper === undefined) {
	console.warn(
		"You must include the Swiper library (http://idangero.us/swiper/) in order for this controller to work."
	);
} else {
	var swiper = (function() {
		var swiperSliders = document.getElementsByClassName(
			"js-mcr-swiper-container"
		);
		for (i = 0; i < swiperSliders.length; i++) {
			var swiperOptions = {
				navigation: {
					nextEl: ".js-mcr-swiper-button-next",
					prevEl: ".js-mcr-swiper-button-prev"
				},
				pagination: {
					el: ".js-mcr-swiper-pagination"
				},
				speed: 500,
				slidesPerView: 1,
				autoplay: {
					delay: 4000
				}
			};
			// Set the options if the data attribute has been defined
			// We can add more as we need them: http://idangero.us/swiper/api/
			var spaceBetween = swiperSliders[i].getAttribute("data-space-between");
			if (spaceBetween != null) {
				swiperOptions["spaceBetween"] = parseFloat(spaceBetween);
			}
			var speed = swiperSliders[i].getAttribute("data-mcr-carousel-speed");
			if (speed != null) {
				swiperOptions["speed"] = parseFloat(speed);
			}
			var loop = swiperSliders[i].getAttribute("data-mcr-carousel-loop");
			if (loop != null) {
				swiperOptions["loop"] = loop === "true" ? true : false;
			}
			console.log(swiperOptions);
			new Swiper(swiperSliders[i], swiperOptions);
		}
	})();
}
