/* 메인 비주얼 영역 */
const swiper = new Swiper('.main-visual > .swiper', {
	speed: 300,
	spaceBetween: 16,
	slidesPerView: "auto",
	centeredSlides: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: false,
	},
	breakpoints: {
		768: {
			slidesPerView: "auto",
			spaceBetween: 9,
			centeredSlides: false,
		},
		1024: {
			slidesPerView: "auto",
			spaceBetween: 10,
			centeredSlides: false,
		},
	}
});