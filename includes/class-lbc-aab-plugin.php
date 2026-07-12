<?php
/**
 * Core plugin class — singleton pattern.
 *
 * Handles all hook registrations for the LBC Animate Any Block plugin:
 *  - Editor asset enqueueing (compiled JS + CSS).
 *  - Front-end asset enqueueing (AOS library + init script).
 *  - PHP render_block filter to inject data-aos-* attributes into block HTML.
 *
 * @package LBC_Animate_Any_Block
 */

// Prevent direct file access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class LBC_AAB_Plugin
 */
final class LBC_AAB_Plugin {

	// ──────────────────────────────────────────────────────────────────────────
	// Singleton
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Holds the single class instance.
	 *
	 * @var LBC_AAB_Plugin|null
	 */
	private static $instance = null;

	/**
	 * Returns the single instance, creating it on first call.
	 *
	 * @return LBC_AAB_Plugin
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Private constructor — register all WordPress hooks.
	 */
	private function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'wp_enqueue_scripts',          array( $this, 'register_frontend_assets' ) );
		add_filter( 'render_block',                array( $this, 'inject_aos_attributes' ), 9999, 2 );
		add_filter( 'register_block_type_args',    array( $this, 'register_block_attributes' ), 10, 2 );
		add_filter( 'wp_kses_allowed_html',        array( $this, 'whitelist_aos_attributes' ), 10, 2 );
	}

	/**
	 * Prevent cloning of the singleton instance.
	 */
	private function __clone() {}

	/**
	 * Prevent unserialization of the singleton instance.
	 */
	public function __wakeup() {
		_doing_it_wrong(
			__FUNCTION__,
			esc_html__( 'Unserializing instances of LBC_AAB_Plugin is forbidden.', 'lbc-animate-any-block' ),
			'1.0'
		);
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Hooks
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Register the custom block attributes on the PHP side for all blocks.
	 * This prevents WordPress from stripping them during parsing, especially for dynamic blocks.
	 *
	 * @param array  $args       Array of arguments for registering a block type.
	 * @param string $block_type Block type name including namespace.
	 * @return array Modified block type arguments.
	 */
	public function register_block_attributes( $args, $block_type ) {
		// Ensure attributes array exists.
		if ( ! isset( $args['attributes'] ) ) {
			$args['attributes'] = array();
		}

		$aos_attributes = array(
			'lbcAosEnabled'         => array( 'type' => 'boolean', 'default' => false ),
			'lbcAosAnimation'       => array( 'type' => 'string', 'default' => '' ),
			'lbcAosDuration'        => array( 'type' => 'number', 'default' => 400 ),
			'lbcAosDelay'           => array( 'type' => 'number', 'default' => 0 ),
			'lbcAosOffset'          => array( 'type' => 'number', 'default' => 120 ),
			'lbcAosEasing'          => array( 'type' => 'string', 'default' => 'ease' ),
			'lbcAosOnce'            => array( 'type' => 'boolean', 'default' => true ),
			'lbcAosMirror'          => array( 'type' => 'boolean', 'default' => false ),
			'lbcAosAnchorPlacement' => array( 'type' => 'string', 'default' => 'top-bottom' ),
			'lbcAosAnchor'          => array( 'type' => 'string', 'default' => '' ),
		);

		$args['attributes'] = array_merge( $args['attributes'], $aos_attributes );

		return $args;
	}

	/**
	 * Whitelist data-aos-* attributes in WordPress KSES.
	 * This prevents FSE themes or security functions (like wp_kses_post)
	 * from stripping the animation attributes from the final HTML output.
	 *
	 * @param array  $tags    Array of allowed HTML tags and their attributes.
	 * @param string $context The context for which to filter the tags.
	 * @return array Modified array of allowed HTML tags.
	 */
	public function whitelist_aos_attributes( $tags, $context ) {
		if ( ! is_array( $tags ) ) {
			return $tags;
		}

		// Define the custom AOS attributes we want to allow.
		$aos_attrs = array(
			'data-aos'                  => true,
			'data-aos-duration'         => true,
			'data-aos-delay'            => true,
			'data-aos-offset'           => true,
			'data-aos-easing'           => true,
			'data-aos-once'             => true,
			'data-aos-mirror'           => true,
			'data-aos-anchor-placement' => true,
			'data-aos-anchor'           => true,
		);

		// Loop through all currently allowed HTML tags and inject our AOS attributes.
		// Using pass-by-reference and the += operator is significantly faster than array_merge in a loop.
		foreach ( $tags as $tag => &$attributes ) {
			if ( is_array( $attributes ) ) {
				$attributes += $aos_attrs;
			}
		}
		unset( $attributes ); // Break reference.

		return $tags;
	}
	/**
	 * Enqueue the compiled block editor script and editor-only stylesheet.
	 *
	 * The asset manifest (build/index.asset.php) is generated by @wordpress/scripts
	 * and contains the correct dependency handles and content hash version.
	 */
	public function enqueue_editor_assets() {
		$asset_file = LBC_AAB_PLUGIN_DIR . 'build/index.min.asset.php';

		// Guard: build step must have been run. Return silently if missing.
		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		// Validate the asset manifest returned an array with required keys.
		if ( ! is_array( $asset ) || empty( $asset['dependencies'] ) || empty( $asset['version'] ) ) {
			return;
		}

		// Block editor script.
		wp_enqueue_script(
			'lbc-aab-editor',
			LBC_AAB_PLUGIN_URL . 'build/index.min.js',
			$asset['dependencies'],
			$asset['version'],
			true // Load in footer.
		);

		// Set script translations (WordPress resolves the path automatically).
		wp_set_script_translations(
			'lbc-aab-editor',
			LBC_AAB_TEXT_DOMAIN
		);

		// Editor-only styles (animation indicator badge, panel tweaks).
		wp_enqueue_style(
			'lbc-aab-editor',
			LBC_AAB_PLUGIN_URL . 'assets/css/lbc-aab-editor.css',
			array(),
			LBC_AAB_VERSION
		);

		// Pass plugin info to JS (available as window.lbcAabData).
		wp_localize_script(
			'lbc-aab-editor',
			'lbcAabData',
			array(
				'version'    => LBC_AAB_VERSION,
				'pluginUrl'  => LBC_AAB_PLUGIN_URL,
				'textDomain' => LBC_AAB_TEXT_DOMAIN,
			)
		);
	}

	/**
	 * Register the AOS library and the plugin's front-end init script.
	 * They will be enqueued conditionally only when a block uses animation.
	 *
	 * AOS is bundled locally inside /vendor/aos/ — no CDN dependency.
	 */
	public function register_frontend_assets() {
		// AOS stylesheet.
		wp_register_style(
			'lbc-aab-aos',
			LBC_AAB_PLUGIN_URL . 'vendor/aos/aos.min.css',
			array(),
			LBC_AAB_VERSION
		);

		// AOS JavaScript library (no dependencies; must load before frontend init).
		wp_register_script(
			'lbc-aab-aos',
			LBC_AAB_PLUGIN_URL . 'vendor/aos/aos.min.js',
			array(),
			LBC_AAB_VERSION,
			true // Load in footer.
		);

		// Plugin front-end init (initialises AOS after DOM is ready).
		wp_register_script(
			'lbc-aab-frontend',
			LBC_AAB_PLUGIN_URL . 'assets/js/lbc-aab-frontend.js',
			array( 'lbc-aab-aos' ),
			LBC_AAB_VERSION,
			true // Load in footer, after AOS.
		);
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Block render filter
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Inject data-aos-* HTML attributes into the block's outermost wrapper element.
	 *
	 * This filter fires for both static (client-saved) and dynamic (server-rendered)
	 * blocks, so a single code path handles all core block types.
	 *
	 * @param string $block_content The rendered block HTML output.
	 * @param array  $block         Parsed block data (name, attrs, innerBlocks, etc.).
	 * @return string Potentially modified block HTML.
	 */
	public function inject_aos_attributes( $block_content, $block ) {
		// Guard: must be a non-empty string.
		if ( ! is_string( $block_content ) || '' === trim( $block_content ) ) {
			return $block_content;
		}

		// Guard: block must be an array with an attrs key.
		$attrs = ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) )
			? $block['attrs']
			: array();

		// Only act when animation is explicitly enabled AND a type is chosen.
		if ( empty( $attrs['lbcAosEnabled'] ) || empty( $attrs['lbcAosAnimation'] ) ) {
			return $block_content;
		}

		// Build the list of data-aos-* attributes to inject.
		$data_attrs = array();

		// Required: animation type.
		$animation = sanitize_text_field( $attrs['lbcAosAnimation'] );
		if ( '' === $animation ) {
			return $block_content;
		}
		$data_attrs['data-aos'] = $animation;

		// Optional: duration (ms). Must be a positive integer.
		if ( isset( $attrs['lbcAosDuration'] ) && is_numeric( $attrs['lbcAosDuration'] ) ) {
			$duration = absint( $attrs['lbcAosDuration'] );
			if ( $duration > 0 ) {
				$data_attrs['data-aos-duration'] = $duration;
			}
		}

		// Optional: delay (ms). 0 is valid; only skip if not set.
		if ( isset( $attrs['lbcAosDelay'] ) && is_numeric( $attrs['lbcAosDelay'] ) ) {
			$data_attrs['data-aos-delay'] = absint( $attrs['lbcAosDelay'] );
		}

		// Optional: offset (px). 0 is valid; only skip if not set.
		if ( isset( $attrs['lbcAosOffset'] ) && is_numeric( $attrs['lbcAosOffset'] ) ) {
			$data_attrs['data-aos-offset'] = absint( $attrs['lbcAosOffset'] );
		}

		// Optional: easing function name.
		if ( ! empty( $attrs['lbcAosEasing'] ) ) {
			$data_attrs['data-aos-easing'] = sanitize_text_field( $attrs['lbcAosEasing'] );
		}

		// Optional: once (boolean → string 'true'/'false').
		if ( isset( $attrs['lbcAosOnce'] ) ) {
			$data_attrs['data-aos-once'] = $attrs['lbcAosOnce'] ? 'true' : 'false';
		}

		// Optional: mirror (boolean → string 'true'/'false').
		if ( isset( $attrs['lbcAosMirror'] ) ) {
			$data_attrs['data-aos-mirror'] = $attrs['lbcAosMirror'] ? 'true' : 'false';
		}

		// Optional: anchor placement.
		if ( ! empty( $attrs['lbcAosAnchorPlacement'] ) ) {
			$data_attrs['data-aos-anchor-placement'] = sanitize_text_field( $attrs['lbcAosAnchorPlacement'] );
		}

		// Optional: anchor CSS selector.
		if ( ! empty( $attrs['lbcAosAnchor'] ) ) {
			$data_attrs['data-aos-anchor'] = sanitize_text_field( $attrs['lbcAosAnchor'] );
		}

		// Enqueue frontend assets conditionally since this block has animation enabled.
		if ( ! is_admin() && ! wp_is_json_request() ) {
			wp_enqueue_style( 'lbc-aab-aos' );
			wp_enqueue_script( 'lbc-aab-frontend' );
		}

		// ── Inject into the first real opening HTML tag ────────────────────────
		// Use the WordPress HTML API (introduced in WP 6.2).
		if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
			return $block_content;
		}

		$processor = new WP_HTML_Tag_Processor( $block_content );

		// Find the very first valid tag.
		if ( $processor->next_tag() ) {
			foreach ( $data_attrs as $key => $value ) {
				$processor->set_attribute( $key, (string) $value );
			}
			return $processor->get_updated_html();
		}

		return $block_content;
	}
}
