/**
 * LBC Animate Any Block — Front-end Initialisation
 *
 * Initialises the AOS (Animate On Scroll) library after the DOM is ready.
 * AOS is loaded locally from /vendor/aos/. This script runs on the front end
 * only — the block editor loads its own separate assets.
 *
 * AOS picks up per-block settings from the data-aos-* attributes injected by
 * the PHP render_block filter. Global defaults below can be changed here but
 * are intentionally kept at AOS library defaults.
 *
 * @see https://github.com/michalsnik/aos#1-initialize-aos
 * @package LBC_Animate_Any_Block
 */

( function () {
	'use strict';

	/**
	 * Initialise AOS with library defaults.
	 * Per-block values (animation, duration, delay, etc.) come from data-aos-*
	 * attributes added by the PHP render_block filter and override these globals.
	 */
	function initAOS() {
		if ( typeof AOS === 'undefined' ) {
			if ( window.console && window.console.warn ) {
				console.warn(
					'LBC Animate Any Block: AOS library is not loaded. ' +
					'Please check that vendor/aos/aos.js is present and enqueued.'
				);
			}
			return;
		}

		AOS.init( {
			// ── Global settings ───────────────────────────────────────────────

			/**
			 * Disable animations on specific devices.
			 * Accepts: false | 'phone' | 'tablet' | 'mobile' | boolean | function.
			 */
			disable: false,

			/**
			 * Document event that AOS listens for before initialising.
			 */
			startEvent: 'DOMContentLoaded',

			/**
			 * Class added to every element after AOS initialises.
			 */
			initClassName: 'aos-init',

			/**
			 * Class added to elements when they animate in.
			 */
			animatedClassName: 'aos-animate',

			/**
			 * When true, adds the data-aos value as a CSS class on scroll
			 * (used for integrating external animation libraries like Animate.css).
			 * Keep false when using AOS built-in animations.
			 */
			useClassNames: false,

			/**
			 * Disable automatic DOM mutation detection (advanced).
			 */
			disableMutationObserver: false,

			/**
			 * Debounce delay on window resize (ms).
			 */
			debounceDelay: 50,

			/**
			 * Throttle delay on scroll event (ms).
			 */
			throttleDelay: 99,

			// ── Per-element defaults (overridable via data-aos-* attributes) ──

			/**
			 * Offset from the original trigger point (px).
			 * Overridden per block by data-aos-offset.
			 */
			offset: 120,

			/**
			 * Default delay before animation (ms).
			 * Overridden per block by data-aos-delay.
			 */
			delay: 0,

			/**
			 * Default animation duration (ms).
			 * Overridden per block by data-aos-duration.
			 */
			duration: 400,

			/**
			 * Default CSS easing function.
			 * Overridden per block by data-aos-easing.
			 */
			easing: 'ease',

			/**
			 * Whether animation should happen only once (on first scroll in).
			 * Overridden per block by data-aos-once.
			 */
			once: true,

			/**
			 * Whether elements should animate out while scrolling past them.
			 * Overridden per block by data-aos-mirror.
			 */
			mirror: false,

			/**
			 * Which position of the element relative to the viewport triggers
			 * the animation. Overridden per block by data-aos-anchor-placement.
			 */
			anchorPlacement: 'top-bottom',
		} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	if ( document.readyState === 'loading' ) {
		// DOM not yet parsed — wait for DOMContentLoaded.
		document.addEventListener( 'DOMContentLoaded', initAOS );
	} else {
		// DOM already available (script loaded async/deferred).
		initAOS();
	}

} )();
