/**
 * LBC Animate Any Block — AOS Inspector Controls Component
 *
 * Renders the "Animate On Scroll (AOS)" panel inside the block sidebar.
 * All AOS per-element options are exposed as WordPress Gutenberg controls.
 *
 * Controls are only visible when "Enable Animation" toggle is on,
 * and detailed controls are only shown once an animation type is selected.
 *
 * @package LBC_Animate_Any_Block
 */

import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	RangeControl,
	TextControl,
} from '@wordpress/components';

// ──────────────────────────────────────────────────────────────────────────────
// Option definitions
// ──────────────────────────────────────────────────────────────────────────────

/**
 * All AOS built-in animation names, grouped for the SelectControl.
 * Reference: https://github.com/michalsnik/aos#animations
 */
const ANIMATION_OPTIONS = [
	{
		label: __( '— Select Animation —', 'lbc-animate-any-block' ),
		value: '',
	},
	// ── Fade ────────────────────────────────────────────────────────────────
	{
		label: __( '── Fade ──', 'lbc-animate-any-block' ),
		value: '',
		disabled: true,
	},
	{ label: __( 'Fade',            'lbc-animate-any-block' ), value: 'fade' },
	{ label: __( 'Fade Up',         'lbc-animate-any-block' ), value: 'fade-up' },
	{ label: __( 'Fade Down',       'lbc-animate-any-block' ), value: 'fade-down' },
	{ label: __( 'Fade Left',       'lbc-animate-any-block' ), value: 'fade-left' },
	{ label: __( 'Fade Right',      'lbc-animate-any-block' ), value: 'fade-right' },
	{ label: __( 'Fade Up Right',   'lbc-animate-any-block' ), value: 'fade-up-right' },
	{ label: __( 'Fade Up Left',    'lbc-animate-any-block' ), value: 'fade-up-left' },
	{ label: __( 'Fade Down Right', 'lbc-animate-any-block' ), value: 'fade-down-right' },
	{ label: __( 'Fade Down Left',  'lbc-animate-any-block' ), value: 'fade-down-left' },
	// ── Flip ────────────────────────────────────────────────────────────────
	{
		label: __( '── Flip ──', 'lbc-animate-any-block' ),
		value: '',
		disabled: true,
	},
	{ label: __( 'Flip Up',    'lbc-animate-any-block' ), value: 'flip-up' },
	{ label: __( 'Flip Down',  'lbc-animate-any-block' ), value: 'flip-down' },
	{ label: __( 'Flip Left',  'lbc-animate-any-block' ), value: 'flip-left' },
	{ label: __( 'Flip Right', 'lbc-animate-any-block' ), value: 'flip-right' },
	// ── Slide ───────────────────────────────────────────────────────────────
	{
		label: __( '── Slide ──', 'lbc-animate-any-block' ),
		value: '',
		disabled: true,
	},
	{ label: __( 'Slide Up',    'lbc-animate-any-block' ), value: 'slide-up' },
	{ label: __( 'Slide Down',  'lbc-animate-any-block' ), value: 'slide-down' },
	{ label: __( 'Slide Left',  'lbc-animate-any-block' ), value: 'slide-left' },
	{ label: __( 'Slide Right', 'lbc-animate-any-block' ), value: 'slide-right' },
	// ── Zoom ────────────────────────────────────────────────────────────────
	{
		label: __( '── Zoom ──', 'lbc-animate-any-block' ),
		value: '',
		disabled: true,
	},
	{ label: __( 'Zoom In',         'lbc-animate-any-block' ), value: 'zoom-in' },
	{ label: __( 'Zoom In Up',      'lbc-animate-any-block' ), value: 'zoom-in-up' },
	{ label: __( 'Zoom In Down',    'lbc-animate-any-block' ), value: 'zoom-in-down' },
	{ label: __( 'Zoom In Left',    'lbc-animate-any-block' ), value: 'zoom-in-left' },
	{ label: __( 'Zoom In Right',   'lbc-animate-any-block' ), value: 'zoom-in-right' },
	{ label: __( 'Zoom Out',        'lbc-animate-any-block' ), value: 'zoom-out' },
	{ label: __( 'Zoom Out Up',     'lbc-animate-any-block' ), value: 'zoom-out-up' },
	{ label: __( 'Zoom Out Down',   'lbc-animate-any-block' ), value: 'zoom-out-down' },
	{ label: __( 'Zoom Out Left',   'lbc-animate-any-block' ), value: 'zoom-out-left' },
	{ label: __( 'Zoom Out Right',  'lbc-animate-any-block' ), value: 'zoom-out-right' },
];

/**
 * All AOS built-in easing functions.
 * Reference: https://github.com/michalsnik/aos#easing-functions
 */
const EASING_OPTIONS = [
	{ label: 'Linear',            value: 'linear' },
	{ label: 'Ease (default)',    value: 'ease' },
	{ label: 'Ease In',          value: 'ease-in' },
	{ label: 'Ease Out',         value: 'ease-out' },
	{ label: 'Ease In Out',      value: 'ease-in-out' },
	{ label: 'Ease In Back',     value: 'ease-in-back' },
	{ label: 'Ease Out Back',    value: 'ease-out-back' },
	{ label: 'Ease In Out Back', value: 'ease-in-out-back' },
	{ label: 'Ease In Sine',     value: 'ease-in-sine' },
	{ label: 'Ease Out Sine',    value: 'ease-out-sine' },
	{ label: 'Ease In Out Sine', value: 'ease-in-out-sine' },
	{ label: 'Ease In Quad',     value: 'ease-in-quad' },
	{ label: 'Ease Out Quad',    value: 'ease-out-quad' },
	{ label: 'Ease In Out Quad', value: 'ease-in-out-quad' },
	{ label: 'Ease In Cubic',    value: 'ease-in-cubic' },
	{ label: 'Ease Out Cubic',   value: 'ease-out-cubic' },
	{ label: 'Ease In Out Cubic', value: 'ease-in-out-cubic' },
	{ label: 'Ease In Quart',    value: 'ease-in-quart' },
	{ label: 'Ease Out Quart',   value: 'ease-out-quart' },
	{ label: 'Ease In Out Quart', value: 'ease-in-out-quart' },
];

/**
 * AOS anchor placement values.
 * Format: "element-position window-position"
 * Reference: https://github.com/michalsnik/aos#anchor-placements
 */
const ANCHOR_PLACEMENT_OPTIONS = [
	{ label: __( 'Top → Bottom (default)', 'lbc-animate-any-block' ), value: 'top-bottom' },
	{ label: __( 'Top → Center',           'lbc-animate-any-block' ), value: 'top-center' },
	{ label: __( 'Top → Top',              'lbc-animate-any-block' ), value: 'top-top' },
	{ label: __( 'Center → Bottom',        'lbc-animate-any-block' ), value: 'center-bottom' },
	{ label: __( 'Center → Center',        'lbc-animate-any-block' ), value: 'center-center' },
	{ label: __( 'Center → Top',           'lbc-animate-any-block' ), value: 'center-top' },
	{ label: __( 'Bottom → Bottom',        'lbc-animate-any-block' ), value: 'bottom-bottom' },
	{ label: __( 'Bottom → Center',        'lbc-animate-any-block' ), value: 'bottom-center' },
	{ label: __( 'Bottom → Top',           'lbc-animate-any-block' ), value: 'bottom-top' },
];

// ──────────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────────

/**
 * AosControls component.
 *
 * Renders inside a <PanelBody> in the block sidebar. All per-element AOS
 * options are presented here. When "Enable Animation" is off the panel shows
 * only the toggle; when on but no animation type is chosen a hint is shown.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    — Current block attributes.
 * @param {Function} props.setAttributes — Block attribute setter.
 * @return {JSX.Element}
 */
export default function AosControls( { attributes, setAttributes } ) {
	const {
		lbcAosEnabled,
		lbcAosAnimation,
		lbcAosDuration,
		lbcAosDelay,
		lbcAosOffset,
		lbcAosEasing,
		lbcAosOnce,
		lbcAosMirror,
		lbcAosAnchorPlacement,
		lbcAosAnchor,
	} = attributes;

	return (
		<PanelBody
			title={ __( '✨ Animate On Scroll (AOS)', 'lbc-animate-any-block' ) }
			initialOpen={ false }
			className="lbc-aab-panel"
		>
			{ /* Master enable/disable toggle */ }
			<ToggleControl
				label={ __( 'Enable Animation', 'lbc-animate-any-block' ) }
				help={
					lbcAosEnabled
						? __( 'Animation is active for this block.', 'lbc-animate-any-block' )
						: __( 'Enable to add a scroll-triggered animation to this block.', 'lbc-animate-any-block' )
				}
				checked={ !! lbcAosEnabled }
				onChange={ ( value ) => setAttributes( { lbcAosEnabled: value } ) }
			/>

			{ lbcAosEnabled && (
				<>
					{ /* ── Animation Type ─────────────────────────────────── */ }
					<SelectControl
						label={ __( 'Animation Type', 'lbc-animate-any-block' ) }
						value={ lbcAosAnimation }
						options={ ANIMATION_OPTIONS }
						onChange={ ( value ) => setAttributes( { lbcAosAnimation: value } ) }
						help={ __( 'The animation played when the user scrolls to this block.', 'lbc-animate-any-block' ) }
						__nextHasNoMarginBottom
					/>

					{ lbcAosEnabled && ! lbcAosAnimation && (
						<PanelRow>
							<p className="lbc-aab-hint">
								{ __( '👆 Select an animation type above to configure timing and behaviour options.', 'lbc-animate-any-block' ) }
							</p>
						</PanelRow>
					) }

					{ lbcAosAnimation && (
						<>
							<hr className="lbc-aab-divider" />
							<p className="lbc-aab-section-label">
								{ __( 'Timing', 'lbc-animate-any-block' ) }
							</p>

							{ /* ── Duration ──────────────────────────────── */ }
							<RangeControl
								label={ __( 'Duration (ms)', 'lbc-animate-any-block' ) }
								value={ lbcAosDuration }
								min={ 50 }
								max={ 3000 }
								step={ 50 }
								onChange={ ( value ) =>
									setAttributes( { lbcAosDuration: value } )
								}
								help={ __( 'How long the animation takes (50–3000 ms). Default: 400.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							{ /* ── Delay ────────────────────────────────── */ }
							<RangeControl
								label={ __( 'Delay (ms)', 'lbc-animate-any-block' ) }
								value={ lbcAosDelay }
								min={ 0 }
								max={ 3000 }
								step={ 50 }
								onChange={ ( value ) =>
									setAttributes( { lbcAosDelay: value } )
								}
								help={ __( 'Delay before the animation begins (0–3000 ms). Default: 0.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							<hr className="lbc-aab-divider" />
							<p className="lbc-aab-section-label">
								{ __( 'Trigger', 'lbc-animate-any-block' ) }
							</p>

							{ /* ── Offset ───────────────────────────────── */ }
							<RangeControl
								label={ __( 'Offset (px)', 'lbc-animate-any-block' ) }
								value={ lbcAosOffset }
								min={ 0 }
								max={ 500 }
								step={ 10 }
								onChange={ ( value ) =>
									setAttributes( { lbcAosOffset: value } )
								}
								help={ __( 'Distance (px) from the viewport edge that triggers the animation. Default: 120.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							{ /* ── Anchor Placement ─────────────────────── */ }
							<SelectControl
								label={ __( 'Anchor Placement', 'lbc-animate-any-block' ) }
								value={ lbcAosAnchorPlacement }
								options={ ANCHOR_PLACEMENT_OPTIONS }
								onChange={ ( value ) =>
									setAttributes( { lbcAosAnchorPlacement: value } )
								}
								help={ __( 'Which part of the element aligns with which part of the viewport to trigger the animation.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							{ /* ── Anchor (CSS selector) ────────────────── */ }
							<TextControl
								label={ __( 'Anchor Element (CSS selector)', 'lbc-animate-any-block' ) }
								value={ lbcAosAnchor }
								onChange={ ( value ) =>
									setAttributes( { lbcAosAnchor: value } )
								}
								placeholder=".my-section"
								help={ __( 'Optional. Trigger this block\'s animation based on another element\'s scroll position. Enter a valid CSS selector.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							<hr className="lbc-aab-divider" />
							<p className="lbc-aab-section-label">
								{ __( 'Style & Behaviour', 'lbc-animate-any-block' ) }
							</p>

							{ /* ── Easing ───────────────────────────────── */ }
							<SelectControl
								label={ __( 'Easing', 'lbc-animate-any-block' ) }
								value={ lbcAosEasing }
								options={ EASING_OPTIONS }
								onChange={ ( value ) =>
									setAttributes( { lbcAosEasing: value } )
								}
								help={ __( 'The CSS timing function used for the animation. Default: ease.', 'lbc-animate-any-block' ) }
								__nextHasNoMarginBottom
							/>

							{ /* ── Once ────────────────────────────────── */ }
							<ToggleControl
								label={ __( 'Animate Once', 'lbc-animate-any-block' ) }
								help={
									lbcAosOnce
										? __( 'Animation plays only the first time the block enters the viewport.', 'lbc-animate-any-block' )
										: __( 'Animation replays every time the block enters the viewport.', 'lbc-animate-any-block' )
								}
								checked={ !! lbcAosOnce }
								onChange={ ( value ) =>
									setAttributes( { lbcAosOnce: value } )
								}
							/>

							{ /* ── Mirror ───────────────────────────────── */ }
							<ToggleControl
								label={ __( 'Mirror (animate out)', 'lbc-animate-any-block' ) }
								help={
									lbcAosMirror
										? __( 'Block animates out when scrolled past (reverse animation).', 'lbc-animate-any-block' )
										: __( 'Block stays visible after animating in.', 'lbc-animate-any-block' )
								}
								checked={ !! lbcAosMirror }
								onChange={ ( value ) =>
									setAttributes( { lbcAosMirror: value } )
								}
							/>

							{ /* ── Summary badge ────────────────────────── */ }
							<PanelRow>
								<span className="lbc-aab-summary-badge">
									{ lbcAosAnimation }
									{ lbcAosDuration !== 400 && ` · ${ lbcAosDuration }ms` }
									{ lbcAosDelay > 0   && ` · +${ lbcAosDelay }ms delay` }
									{ lbcAosOnce       && ' · once' }
									{ lbcAosMirror     && ' · mirror' }
								</span>
							</PanelRow>
						</>
					) }
				</>
			) }
		</PanelBody>
	);
}
