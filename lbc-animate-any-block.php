<?php
/**
 * Plugin Name:       LBC Animate Any Block
 * Description:       Add AOS (Animate On Scroll) effects to any WordPress block. Easily configure scroll-triggered animations directly from the block editor sidebar.
 * Version:           1.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            rinkuyadav999
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       lbc-animate-any-block
 *
 * @package LBC_Animate_Any_Block
 */

// Prevent direct file access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ──────────────────────────────────────────────────────────────────────────────
// Plugin constants
// ──────────────────────────────────────────────────────────────────────────────

/** Plugin version. */
define( 'LBC_AAB_VERSION', '1.0' );

/** Absolute path to the plugin root directory (trailing slash). */
define( 'LBC_AAB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/** URL to the plugin root directory (trailing slash). */
define( 'LBC_AAB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/** Absolute path to the main plugin file. */
define( 'LBC_AAB_PLUGIN_FILE', __FILE__ );

/** Plugin text domain. */
define( 'LBC_AAB_TEXT_DOMAIN', 'lbc-animate-any-block' );

/** Minimum required WordPress version. */
define( 'LBC_AAB_MIN_WP', '6.2' );

/** Minimum required PHP version. */
define( 'LBC_AAB_MIN_PHP', '7.4' );

/** Basename of the plugin (used for activation/deactivation hooks). */
define( 'LBC_AAB_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// ──────────────────────────────────────────────────────────────────────────────
// Version checks
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Displays an admin notice if the environment does not meet requirements.
 */
function lbc_aab_requirements_notice() {
	global $wp_version;

	$errors = array();

	if ( version_compare( PHP_VERSION, LBC_AAB_MIN_PHP, '<' ) ) {
		$errors[] = sprintf(
			/* translators: 1: required PHP version, 2: current PHP version */
			__( 'LBC Animate Any Block requires PHP %1$s or higher. Your site is running PHP %2$s.', 'lbc-animate-any-block' ),
			LBC_AAB_MIN_PHP,
			PHP_VERSION
		);
	}

	if ( version_compare( $wp_version, LBC_AAB_MIN_WP, '<' ) ) {
		$errors[] = sprintf(
			/* translators: 1: required WP version, 2: current WP version */
			__( 'LBC Animate Any Block requires WordPress %1$s or higher. Your site is running WordPress %2$s.', 'lbc-animate-any-block' ),
			LBC_AAB_MIN_WP,
			$wp_version
		);
	}

	if ( ! empty( $errors ) ) {
		foreach ( $errors as $error ) {
			echo '<div class="notice notice-error"><p>' . esc_html( $error ) . '</p></div>';
		}
	}
}

// Bail early if requirements not met.
// Use the global $wp_version (always set by WP core before plugins load),
// not get_bloginfo() which may not be ready at this stage.
global $wp_version;
if (
	version_compare( PHP_VERSION, LBC_AAB_MIN_PHP, '<' ) ||
	version_compare( $wp_version, LBC_AAB_MIN_WP, '<' )
) {
	add_action( 'admin_notices', 'lbc_aab_requirements_notice' );
	return;
}

// ──────────────────────────────────────────────────────────────────────────────
// Bootstrap
// ──────────────────────────────────────────────────────────────────────────────

require_once LBC_AAB_PLUGIN_DIR . 'includes/class-lbc-aab-plugin.php';

// Initialise the plugin singleton.
LBC_AAB_Plugin::get_instance();
