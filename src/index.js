/**
 * LBC Animate Any Block — Block Editor JS Entry Point
 *
 * Registers three Gutenberg filters:
 *  1. blocks.registerBlockType  — adds lbcAos* attributes to every block type.
 *  2. editor.BlockEdit          — injects the "Animate On Scroll" Inspector Controls panel.
 *
 * Attributes are stored in the block comment delimiter (not the saved HTML).
 * The PHP render_block filter reads them and injects the data-aos-* attributes
 * into the front-end HTML output.
 *
 * @package LBC_Animate_Any_Block
 */

import { addFilter }                  from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment }                   from '@wordpress/element';
import { InspectorControls }          from '@wordpress/block-editor';
import AosControls                    from './components/AosControls';

const NAMESPACE = 'lbc-animate-any-block';

// ──────────────────────────────────────────────────────────────────────────────
// AOS attribute schema — added to every registered block type.
// ──────────────────────────────────────────────────────────────────────────────

/**
 * AOS-related block attributes.
 * These are stored in the block's comment delimiter and passed to the
 * PHP render_block filter — they do NOT appear in the saved HTML directly.
 */
const AOS_ATTRIBUTES = {
	/** Master switch — no animation unless this is true. */
	lbcAosEnabled: {
		type: 'boolean',
		default: false,
	},
	/** AOS animation name (e.g. 'fade-up', 'zoom-in'). */
	lbcAosAnimation: {
		type: 'string',
		default: '',
	},
	/** Animation duration in ms (AOS default: 400). */
	lbcAosDuration: {
		type: 'number',
		default: 400,
	},
	/** Animation delay in ms (AOS default: 0). */
	lbcAosDelay: {
		type: 'number',
		default: 0,
	},
	/** Offset in px from trigger point (AOS default: 120). */
	lbcAosOffset: {
		type: 'number',
		default: 120,
	},
	/** CSS easing function name (AOS default: 'ease'). */
	lbcAosEasing: {
		type: 'string',
		default: 'ease',
	},
	/** Play animation only once (AOS default: false, Plugin default: true). */
	lbcAosOnce: {
		type: 'boolean',
		default: true,
	},
	/** Animate out when scrolling past (AOS default: false). */
	lbcAosMirror: {
		type: 'boolean',
		default: false,
	},
	/** Which part of element/window triggers animation (AOS default: 'top-bottom'). */
	lbcAosAnchorPlacement: {
		type: 'string',
		default: 'top-bottom',
	},
	/** Optional CSS selector of another element used as the scroll anchor. */
	lbcAosAnchor: {
		type: 'string',
		default: '',
	},
};

// ──────────────────────────────────────────────────────────────────────────────
// Filter 1 — Add attributes to every block type.
// ──────────────────────────────────────────────────────────────────────────────

addFilter(
	'blocks.registerBlockType',
	`${ NAMESPACE }/add-attributes`,
	( settings ) => {
		// Guard: settings must exist, have an attributes object that is not null.
		if (
			! settings ||
			null === settings.attributes ||
			typeof settings.attributes !== 'object'
		) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				...AOS_ATTRIBUTES,
			},
		};
	}
);

// ──────────────────────────────────────────────────────────────────────────────
// Filter 2 — Inject Inspector Controls into every block's Edit component.
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Higher-order component that wraps BlockEdit to add the AOS sidebar panel.
 */
const withAosInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, isSelected } = props;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<AosControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withAosInspectorControls' );

addFilter(
	'editor.BlockEdit',
	`${ NAMESPACE }/with-inspector-controls`,
	withAosInspectorControls
);
