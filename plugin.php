<?php
/**
 * Plugin Name: MCR Image Carousel — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/mread1208/mcr-gutenberg-swiper-carousel
 * Description: MCR Image Carousel — is a Gutenberg plugin created via create-guten-block to add image carousel's to a page.
 * Author: Michael Read
 * Author URI: http://www.michaelcread.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
