=== LBC Animate Any Block ===
Contributors:      rinkuyadav999
Donate link: https://rinkuyadav.in
Tags:              animation, animate on scroll, AOS, block editor, gutenberg
Requires at least: 6.2
Tested up to:      7.0
Stable tag:        1.1
Requires PHP:      7.4
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Add AOS (Animate On Scroll) effects to any WordPress block. Easily configure scroll-triggered animations directly from the block editor sidebar.

== Description ==

**LBC Animate Any Block** brings the wildly popular [AOS – Animate On Scroll](https://github.com/michalsnik/aos) library straight into the WordPress Block Editor (Gutenberg). 

Bring your pages to life without writing a single line of code. Simply select any block, toggle the animation switch, and choose from dozens of professional scroll-triggered effects.

= Core Features =
* **Universal Block Support:** Works flawlessly with all Core blocks (Paragraph, Image, Group, Cover) AND third-party plugins (WooCommerce, Kadence, GenerateBlocks, ACF, etc).
* **28 Animation Types:** Choose from elegant Fades, Slides, Flips, and Zooms.
* **Granular Control:** Tweak animation Duration, Delay, Easing, and Offset on a per-block basis.
* **Advanced Triggers:** Configure Anchor Placement, CSS Anchor selectors, and specify whether animations should play once or mirror on scroll up.
* **FSE Compatible:** Fully compatible with WordPress Full Site Editing (FSE) themes.
* **Performance Focused:** No jQuery required. The AOS library is bundled locally (only ~14 KB minified) with zero external CDN requests.
* **Clean DOM:** Animations are strictly opt-in. Unaffected blocks remain completely untouched with zero added bloat.

= How it works =
1. Select any block in the page or post editor.
2. Open the **"✨ Animate On Scroll (AOS)"** panel in the block sidebar.
3. Toggle **Enable Animation** and customize your effect.
4. Save the page and scroll down on the front end to watch it trigger!

== Credits ==

* **AOS Library:** This plugin bundles the [AOS – Animate On Scroll](https://github.com/michalsnik/aos) library created by Michał Sajnóg, which is distributed under the [MIT License](https://opensource.org/licenses/MIT).

== GitHub Repo ==

[LBC Animate Any Block](https://github.com/rinkuyadav999/lbc-animate-any-block)

== Installation ==

= Option 1: Install via WordPress Dashboard (Recommended) =

1. Navigate to **Dashboard → Plugins → Add New**.
2. Search for **LBC Animate Any Block**.
3. Click **Install Now**, and then click **Activate**.

= Option 2: Upload via WordPress Dashboard =

1. Download the plugin ZIP from the official repository: https://wordpress.org/plugins/lbc-animate-any-block/
2. Go to **Dashboard → Plugins → Add New → Upload Plugin**.
3. Select the downloaded ZIP file and click **Install Now**.
4. Click **Activate Plugin**.

= Option 3: Upload via FTP =

1. Download the plugin ZIP file.
2. Extract the ZIP to reveal the `lbc-animate-any-block` folder.
3. Upload the entire folder to the `/wp-content/plugins/` directory on your server.
4. Go to **Dashboard → Plugins**, locate the plugin, and click **Activate**.

== Frequently Asked Questions ==

= Does this slow down my site? =
Not at all. The plugin uses the lightweight AOS library (~14 KB minified) and has absolutely zero dependencies (no jQuery). It only loads on the front-end when activated.

= Can I use it with third-party blocks? =
Yes! The plugin universally attaches to the WordPress rendering pipeline. It automatically adds animation controls to any third-party block out of the box.

= Will it conflict with my theme? =
No. The plugin stores its data in dedicated block attributes and cleanly injects `data-aos-*` HTML attributes on render. This avoids any CSS class conflicts.

= Why is my animation not showing in the editor? =
Animations are intentionally **not previewed** inside the editor. This prevents elements from jumping around or blocking your ability to click and edit them. Simply preview the page on the front end to see the animations in action.

== Screenshots ==

1. The "Animate On Scroll" panel in the block editor sidebar.

== Changelog ==

= 1.1 =
* Fix plugin review
* Avail both min and non-min
* Fix readme: installation section
* GPL license ready check
* Provide a public source code: added in readme GitHub Repo

= 1.0 =
* Initial release.
* 28 AOS animation types & 20 easing functions.
* Per-block duration, delay, offset, once, mirror, and anchor controls.
* AOS 2.3.4 bundled locally.

== Upgrade Notice ==

= 1.1 =
Initial release.

= 1.0 =
Initial release.
