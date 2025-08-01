/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);

// /* ========= Simple carousel (no library) ========================= */
// document.addEventListener('DOMContentLoaded', () => {
// 	const slides   = document.querySelectorAll('.carousel .slide');
// 	if (!slides.length) return;           // bail if no carousel on page

// 	const prevBtn  = document.querySelector('.carousel .prev');
// 	const nextBtn  = document.querySelector('.carousel .next');
// 	const dotsBox  = document.querySelector('.carousel .dots');
// 	let   index    = 0;

// 	// build dots
// 	slides.forEach((_, i) => {
// 		const dot = document.createElement('button');
// 		dot.addEventListener('click', () => goTo(i));
// 		dotsBox.appendChild(dot);
// 	});

// 	function show(n){
// 		slides.forEach((s,i)=>s.classList.toggle('active', i===n));
// 		dotsBox.querySelectorAll('button')
// 				.forEach((d,i)=>d.classList.toggle('active', i===n));
// 	}
// 	function goTo(n){
// 		index = (n + slides.length) % slides.length; // wrap
// 		show(index);
// 	}

// 	prevBtn.addEventListener('click', () => goTo(index - 1));
// 	nextBtn.addEventListener('click', () => goTo(index + 1));

// 	show(index);   // initial render
// });
//   /* ========= /Simple carousel ===================================== */

/* ========= Multi-carousel version =============================== */
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.carousel').forEach(setupCarousel);
});

function setupCarousel(carousel){
	const slides  = carousel.querySelectorAll('.slide');
	if (!slides.length) return;

	const prevBtn = carousel.querySelector('.prev');
	const nextBtn = carousel.querySelector('.next');
	const dotsBox = carousel.querySelector('.dots');
	let   index   = 0;

	/* build a dot for each slide */
	slides.forEach((_, i) => {
	const dot = document.createElement('button');
	dot.addEventListener('click', () => goTo(i));
	dotsBox.appendChild(dot);
	});

	function show(n){
	slides.forEach((s,i)=>s.classList.toggle('active', i===n));
	dotsBox.querySelectorAll('button')
			.forEach((d,i)=>d.classList.toggle('active', i===n));
	}
	function goTo(n){
	index = (n + slides.length) % slides.length;   // wrap-around
	show(index);
	}

	prevBtn?.addEventListener('click', () => goTo(index - 1));
	nextBtn?.addEventListener('click', () => goTo(index + 1));

	show(index);   // paint initial state
}
/* ========= /Multi-carousel ====================================== */
  