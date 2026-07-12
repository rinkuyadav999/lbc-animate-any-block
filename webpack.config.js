// webpack.config.js
// Extends the default @wordpress/scripts webpack config to produce two builds:
//
//  1. build/index.min.js  — minified, used by the plugin at runtime.
//  2. build/index.js      — unminified, required by the WordPress Plugin Review
//                           Team so they can audit the bundled source code.
//
// The PHP code only enqueues index.min.js; index.js is never loaded on the site.
//
// NOTE: Both configs run in parallel via webpack's multi-compiler. To avoid the
// clean-on-start race condition, we disable webpack's built-in clean on BOTH
// configs. The `prebuild` npm script handles cleaning the build/ folder first.

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Strip the clean option from the output object and remove any plugins that
 * perform directory cleaning, so we can safely run two configs in parallel.
 *
 * @param {object} config - A webpack configuration object.
 * @return {object} Modified config with cleaning disabled.
 */
function withoutClean( config ) {
	const { clean, ...outputWithoutClean } = config.output || {};
	return {
		...config,
		output: outputWithoutClean,
		plugins: ( config.plugins || [] ).filter(
			( plugin ) => plugin.constructor.name !== 'CleanWebpackPlugin'
		),
	};
}

/** Minified build — what the plugin actually serves. */
const minifiedConfig = {
	...withoutClean( defaultConfig ),
	output: {
		...withoutClean( defaultConfig ).output,
		filename: '[name].min.js',
	},
};

/** Unminified build — for the Plugin Review Team audit only. */
const unminifiedConfig = {
	...withoutClean( defaultConfig ),
	output: {
		...withoutClean( defaultConfig ).output,
		filename: '[name].js',
	},
	optimization: {
		...defaultConfig.optimization,
		minimize: false,
	},
};

module.exports = [ minifiedConfig, unminifiedConfig ];
