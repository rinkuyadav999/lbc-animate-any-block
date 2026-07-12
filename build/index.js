/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// external ["wp","hooks"]
const external_wp_hooks_namespaceObject = window["wp"]["hooks"];
;// external ["wp","compose"]
const external_wp_compose_namespaceObject = window["wp"]["compose"];
;// external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// external ["wp","blockEditor"]
const external_wp_blockEditor_namespaceObject = window["wp"]["blockEditor"];
;// external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// external "ReactJSXRuntime"
const external_ReactJSXRuntime_namespaceObject = window["ReactJSXRuntime"];
;// ./src/components/AosControls.js
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




// ──────────────────────────────────────────────────────────────────────────────
// Option definitions
// ──────────────────────────────────────────────────────────────────────────────

/**
 * All AOS built-in animation names, grouped for the SelectControl.
 * Reference: https://github.com/michalsnik/aos#animations
 */

const ANIMATION_OPTIONS = [{
  label: (0,external_wp_i18n_namespaceObject.__)('— Select Animation —', 'lbc-animate-any-block'),
  value: ''
},
// ── Fade ────────────────────────────────────────────────────────────────
{
  label: (0,external_wp_i18n_namespaceObject.__)('── Fade ──', 'lbc-animate-any-block'),
  value: '',
  disabled: true
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade', 'lbc-animate-any-block'),
  value: 'fade'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Up', 'lbc-animate-any-block'),
  value: 'fade-up'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Down', 'lbc-animate-any-block'),
  value: 'fade-down'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Left', 'lbc-animate-any-block'),
  value: 'fade-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Right', 'lbc-animate-any-block'),
  value: 'fade-right'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Up Right', 'lbc-animate-any-block'),
  value: 'fade-up-right'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Up Left', 'lbc-animate-any-block'),
  value: 'fade-up-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Down Right', 'lbc-animate-any-block'),
  value: 'fade-down-right'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Fade Down Left', 'lbc-animate-any-block'),
  value: 'fade-down-left'
},
// ── Flip ────────────────────────────────────────────────────────────────
{
  label: (0,external_wp_i18n_namespaceObject.__)('── Flip ──', 'lbc-animate-any-block'),
  value: '',
  disabled: true
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Flip Up', 'lbc-animate-any-block'),
  value: 'flip-up'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Flip Down', 'lbc-animate-any-block'),
  value: 'flip-down'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Flip Left', 'lbc-animate-any-block'),
  value: 'flip-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Flip Right', 'lbc-animate-any-block'),
  value: 'flip-right'
},
// ── Slide ───────────────────────────────────────────────────────────────
{
  label: (0,external_wp_i18n_namespaceObject.__)('── Slide ──', 'lbc-animate-any-block'),
  value: '',
  disabled: true
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Slide Up', 'lbc-animate-any-block'),
  value: 'slide-up'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Slide Down', 'lbc-animate-any-block'),
  value: 'slide-down'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Slide Left', 'lbc-animate-any-block'),
  value: 'slide-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Slide Right', 'lbc-animate-any-block'),
  value: 'slide-right'
},
// ── Zoom ────────────────────────────────────────────────────────────────
{
  label: (0,external_wp_i18n_namespaceObject.__)('── Zoom ──', 'lbc-animate-any-block'),
  value: '',
  disabled: true
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom In', 'lbc-animate-any-block'),
  value: 'zoom-in'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom In Up', 'lbc-animate-any-block'),
  value: 'zoom-in-up'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom In Down', 'lbc-animate-any-block'),
  value: 'zoom-in-down'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom In Left', 'lbc-animate-any-block'),
  value: 'zoom-in-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom In Right', 'lbc-animate-any-block'),
  value: 'zoom-in-right'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom Out', 'lbc-animate-any-block'),
  value: 'zoom-out'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom Out Up', 'lbc-animate-any-block'),
  value: 'zoom-out-up'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom Out Down', 'lbc-animate-any-block'),
  value: 'zoom-out-down'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom Out Left', 'lbc-animate-any-block'),
  value: 'zoom-out-left'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Zoom Out Right', 'lbc-animate-any-block'),
  value: 'zoom-out-right'
}];

/**
 * All AOS built-in easing functions.
 * Reference: https://github.com/michalsnik/aos#easing-functions
 */
const EASING_OPTIONS = [{
  label: 'Linear',
  value: 'linear'
}, {
  label: 'Ease (default)',
  value: 'ease'
}, {
  label: 'Ease In',
  value: 'ease-in'
}, {
  label: 'Ease Out',
  value: 'ease-out'
}, {
  label: 'Ease In Out',
  value: 'ease-in-out'
}, {
  label: 'Ease In Back',
  value: 'ease-in-back'
}, {
  label: 'Ease Out Back',
  value: 'ease-out-back'
}, {
  label: 'Ease In Out Back',
  value: 'ease-in-out-back'
}, {
  label: 'Ease In Sine',
  value: 'ease-in-sine'
}, {
  label: 'Ease Out Sine',
  value: 'ease-out-sine'
}, {
  label: 'Ease In Out Sine',
  value: 'ease-in-out-sine'
}, {
  label: 'Ease In Quad',
  value: 'ease-in-quad'
}, {
  label: 'Ease Out Quad',
  value: 'ease-out-quad'
}, {
  label: 'Ease In Out Quad',
  value: 'ease-in-out-quad'
}, {
  label: 'Ease In Cubic',
  value: 'ease-in-cubic'
}, {
  label: 'Ease Out Cubic',
  value: 'ease-out-cubic'
}, {
  label: 'Ease In Out Cubic',
  value: 'ease-in-out-cubic'
}, {
  label: 'Ease In Quart',
  value: 'ease-in-quart'
}, {
  label: 'Ease Out Quart',
  value: 'ease-out-quart'
}, {
  label: 'Ease In Out Quart',
  value: 'ease-in-out-quart'
}];

/**
 * AOS anchor placement values.
 * Format: "element-position window-position"
 * Reference: https://github.com/michalsnik/aos#anchor-placements
 */
const ANCHOR_PLACEMENT_OPTIONS = [{
  label: (0,external_wp_i18n_namespaceObject.__)('Top → Bottom (default)', 'lbc-animate-any-block'),
  value: 'top-bottom'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Top → Center', 'lbc-animate-any-block'),
  value: 'top-center'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Top → Top', 'lbc-animate-any-block'),
  value: 'top-top'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Center → Bottom', 'lbc-animate-any-block'),
  value: 'center-bottom'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Center → Center', 'lbc-animate-any-block'),
  value: 'center-center'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Center → Top', 'lbc-animate-any-block'),
  value: 'center-top'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Bottom → Bottom', 'lbc-animate-any-block'),
  value: 'bottom-bottom'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Bottom → Center', 'lbc-animate-any-block'),
  value: 'bottom-center'
}, {
  label: (0,external_wp_i18n_namespaceObject.__)('Bottom → Top', 'lbc-animate-any-block'),
  value: 'bottom-top'
}];

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
function AosControls({
  attributes,
  setAttributes
}) {
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
    lbcAosAnchor
  } = attributes;
  return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_wp_components_namespaceObject.PanelBody, {
    title: (0,external_wp_i18n_namespaceObject.__)('✨ Animate On Scroll (AOS)', 'lbc-animate-any-block'),
    initialOpen: false,
    className: "lbc-aab-panel",
    children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.ToggleControl, {
      label: (0,external_wp_i18n_namespaceObject.__)('Enable Animation', 'lbc-animate-any-block'),
      help: lbcAosEnabled ? (0,external_wp_i18n_namespaceObject.__)('Animation is active for this block.', 'lbc-animate-any-block') : (0,external_wp_i18n_namespaceObject.__)('Enable to add a scroll-triggered animation to this block.', 'lbc-animate-any-block'),
      checked: !!lbcAosEnabled,
      onChange: value => setAttributes({
        lbcAosEnabled: value
      })
    }), lbcAosEnabled && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_ReactJSXRuntime_namespaceObject.Fragment, {
      children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.SelectControl, {
        label: (0,external_wp_i18n_namespaceObject.__)('Animation Type', 'lbc-animate-any-block'),
        value: lbcAosAnimation,
        options: ANIMATION_OPTIONS,
        onChange: value => setAttributes({
          lbcAosAnimation: value
        }),
        help: (0,external_wp_i18n_namespaceObject.__)('The animation played when the user scrolls to this block.', 'lbc-animate-any-block'),
        __nextHasNoMarginBottom: true
      }), lbcAosEnabled && !lbcAosAnimation && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.PanelRow, {
        children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
          className: "lbc-aab-hint",
          children: (0,external_wp_i18n_namespaceObject.__)('👆 Select an animation type above to configure timing and behaviour options.', 'lbc-animate-any-block')
        })
      }), lbcAosAnimation && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_ReactJSXRuntime_namespaceObject.Fragment, {
        children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("hr", {
          className: "lbc-aab-divider"
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
          className: "lbc-aab-section-label",
          children: (0,external_wp_i18n_namespaceObject.__)('Timing', 'lbc-animate-any-block')
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.RangeControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Duration (ms)', 'lbc-animate-any-block'),
          value: lbcAosDuration,
          min: 50,
          max: 3000,
          step: 50,
          onChange: value => setAttributes({
            lbcAosDuration: value
          }),
          help: (0,external_wp_i18n_namespaceObject.__)('How long the animation takes (50–3000 ms). Default: 400.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.RangeControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Delay (ms)', 'lbc-animate-any-block'),
          value: lbcAosDelay,
          min: 0,
          max: 3000,
          step: 50,
          onChange: value => setAttributes({
            lbcAosDelay: value
          }),
          help: (0,external_wp_i18n_namespaceObject.__)('Delay before the animation begins (0–3000 ms). Default: 0.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("hr", {
          className: "lbc-aab-divider"
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
          className: "lbc-aab-section-label",
          children: (0,external_wp_i18n_namespaceObject.__)('Trigger', 'lbc-animate-any-block')
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.RangeControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Offset (px)', 'lbc-animate-any-block'),
          value: lbcAosOffset,
          min: 0,
          max: 500,
          step: 10,
          onChange: value => setAttributes({
            lbcAosOffset: value
          }),
          help: (0,external_wp_i18n_namespaceObject.__)('Distance (px) from the viewport edge that triggers the animation. Default: 120.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.SelectControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Anchor Placement', 'lbc-animate-any-block'),
          value: lbcAosAnchorPlacement,
          options: ANCHOR_PLACEMENT_OPTIONS,
          onChange: value => setAttributes({
            lbcAosAnchorPlacement: value
          }),
          help: (0,external_wp_i18n_namespaceObject.__)('Which part of the element aligns with which part of the viewport to trigger the animation.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Anchor Element (CSS selector)', 'lbc-animate-any-block'),
          value: lbcAosAnchor,
          onChange: value => setAttributes({
            lbcAosAnchor: value
          }),
          placeholder: ".my-section",
          help: (0,external_wp_i18n_namespaceObject.__)('Optional. Trigger this block\'s animation based on another element\'s scroll position. Enter a valid CSS selector.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("hr", {
          className: "lbc-aab-divider"
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
          className: "lbc-aab-section-label",
          children: (0,external_wp_i18n_namespaceObject.__)('Style & Behaviour', 'lbc-animate-any-block')
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.SelectControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Easing', 'lbc-animate-any-block'),
          value: lbcAosEasing,
          options: EASING_OPTIONS,
          onChange: value => setAttributes({
            lbcAosEasing: value
          }),
          help: (0,external_wp_i18n_namespaceObject.__)('The CSS timing function used for the animation. Default: ease.', 'lbc-animate-any-block'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.ToggleControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Animate Once', 'lbc-animate-any-block'),
          help: lbcAosOnce ? (0,external_wp_i18n_namespaceObject.__)('Animation plays only the first time the block enters the viewport.', 'lbc-animate-any-block') : (0,external_wp_i18n_namespaceObject.__)('Animation replays every time the block enters the viewport.', 'lbc-animate-any-block'),
          checked: !!lbcAosOnce,
          onChange: value => setAttributes({
            lbcAosOnce: value
          })
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.ToggleControl, {
          label: (0,external_wp_i18n_namespaceObject.__)('Mirror (animate out)', 'lbc-animate-any-block'),
          help: lbcAosMirror ? (0,external_wp_i18n_namespaceObject.__)('Block animates out when scrolled past (reverse animation).', 'lbc-animate-any-block') : (0,external_wp_i18n_namespaceObject.__)('Block stays visible after animating in.', 'lbc-animate-any-block'),
          checked: !!lbcAosMirror,
          onChange: value => setAttributes({
            lbcAosMirror: value
          })
        }), /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.PanelRow, {
          children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)("span", {
            className: "lbc-aab-summary-badge",
            children: [lbcAosAnimation, lbcAosDuration !== 400 && ` · ${lbcAosDuration}ms`, lbcAosDelay > 0 && ` · +${lbcAosDelay}ms delay`, lbcAosOnce && ' · once', lbcAosMirror && ' · mirror']
          })
        })]
      })]
    })]
  });
}
;// ./src/index.js
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
    default: false
  },
  /** AOS animation name (e.g. 'fade-up', 'zoom-in'). */
  lbcAosAnimation: {
    type: 'string',
    default: ''
  },
  /** Animation duration in ms (AOS default: 400). */
  lbcAosDuration: {
    type: 'number',
    default: 400
  },
  /** Animation delay in ms (AOS default: 0). */
  lbcAosDelay: {
    type: 'number',
    default: 0
  },
  /** Offset in px from trigger point (AOS default: 120). */
  lbcAosOffset: {
    type: 'number',
    default: 120
  },
  /** CSS easing function name (AOS default: 'ease'). */
  lbcAosEasing: {
    type: 'string',
    default: 'ease'
  },
  /** Play animation only once (AOS default: false, Plugin default: true). */
  lbcAosOnce: {
    type: 'boolean',
    default: true
  },
  /** Animate out when scrolling past (AOS default: false). */
  lbcAosMirror: {
    type: 'boolean',
    default: false
  },
  /** Which part of element/window triggers animation (AOS default: 'top-bottom'). */
  lbcAosAnchorPlacement: {
    type: 'string',
    default: 'top-bottom'
  },
  /** Optional CSS selector of another element used as the scroll anchor. */
  lbcAosAnchor: {
    type: 'string',
    default: ''
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// Filter 1 — Add attributes to every block type.
// ──────────────────────────────────────────────────────────────────────────────

(0,external_wp_hooks_namespaceObject.addFilter)('blocks.registerBlockType', `${NAMESPACE}/add-attributes`, settings => {
  // Guard: settings must exist, have an attributes object that is not null.
  if (!settings || null === settings.attributes || typeof settings.attributes !== 'object') {
    return settings;
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      ...AOS_ATTRIBUTES
    }
  };
});

// ──────────────────────────────────────────────────────────────────────────────
// Filter 2 — Inject Inspector Controls into every block's Edit component.
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Higher-order component that wraps BlockEdit to add the AOS sidebar panel.
 */
const withAosInspectorControls = (0,external_wp_compose_namespaceObject.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes,
      isSelected
    } = props;
    return /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_wp_element_namespaceObject.Fragment, {
      children: [/*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(BlockEdit, {
        ...props
      }), isSelected && /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_blockEditor_namespaceObject.InspectorControls, {
        children: /*#__PURE__*/(0,external_ReactJSXRuntime_namespaceObject.jsx)(AosControls, {
          attributes: attributes,
          setAttributes: setAttributes
        })
      })]
    });
  };
}, 'withAosInspectorControls');
(0,external_wp_hooks_namespaceObject.addFilter)('editor.BlockEdit', `${NAMESPACE}/with-inspector-controls`, withAosInspectorControls);
/******/ })()
;