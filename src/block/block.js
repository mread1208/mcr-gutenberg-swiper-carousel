/**
 * BLOCK: mcr-image-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { MediaUpload, MediaPlaceholder } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-mcr-image-carousel", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("MCR Image Carousel"), // Block title.
	icon: "images-alt2", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("mcr-image-carousel"), __("Image Carousel")],
	attributes: {
		imageAlt: {
			attribute: "alt",
			selector: ".card__image"
		},
		imageUrl: {
			attribute: "src",
			selector: ".card__image"
		},
		images: {
			type: "array",
			default: []
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: function({ attributes, className, setAttributes }) {
		const { images } = attributes;

		const getImageButton = openEvent => {
			return (
				<div>
					<img src={images.imageUrl} onClick={openEvent} className="image" />
					<div className="button-container">
						<Button onClick={openEvent} className="button button-large">
							Add an image
						</Button>
						<Button onClick={openEvent} className="button button-large">
							Remove image
						</Button>
					</div>
				</div>
			);
		};

		const removeImage = function(image) {
			console.log(image);
		};

		const onSelectImages = function(images) {
			setAttributes({
				images: images.map(img => {
					return {
						id: img.id,
						url: img.sizes.full.url,
						alt: img.alt,
						caption: img.caption
					};
				})
			});
		};

		// return (
		// 	<div>
		// 		<MediaPlaceholder
		// 			icon="format-gallery"
		// 			onSelect={onSelectImages}
		// 			accept="image/*"
		// 			type="image"
		// 			multiple
		// 		/>
		// 		<MediaUpload
		// 			onSelect={media => {
		// 				setAttributes({ imageAlt: media.alt, imageUrl: media.url });
		// 			}}
		// 			type="image"
		// 			value={attributes.imageID}
		// 			render={({ open }) => getImageButton(open)}
		// 		/>
		// 	</div>
		// );

		if (images.length > 0) {
			return (
				<Fragment>
					{images.map((img, index) => {
						return [
							<div>
								<img src={img.url} alt={img.alt} />
								<div className="button-container">
									<Button
										onClick={removeImage(img)}
										className="button button-large"
									>
										Remove image
									</Button>
								</div>
							</div>
						];
					})}
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<div className={className}>
						<MediaPlaceholder
							icon="format-gallery"
							className={className}
							labels={{
								title: __("Carousel"),
								name: __("images")
							}}
							onSelect={onSelectImages}
							accept="image/*"
							type="image"
							multiple
						/>
					</div>
				</Fragment>
			);
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(props) {
		return (
			<div
				className={`swiper-container mcr-swiper-container js-mcr-swiper-container`}
			>
				<div class="swiper-wrapper mcr-swiper-wrapper">
					<div class="swiper-slide mcr-swiper-slide">
						<img src="https://via.placeholder.com/1090x450" alt="" />
					</div>
					<div class="swiper-slide mcr-swiper-slide">
						<img src="https://via.placeholder.com/1090x450" alt="" />
					</div>
				</div>
				<div class="swiper-pagination mcr-swiper-pagination" />

				<div class="js-mcr-swiper-button-prev swiper-button-prev mcr-swiper-button-prev" />
				<div class="js-mcr-swiper-button-next swiper-button-next mcr-swiper-button-next" />
			</div>
		);
	}
});
