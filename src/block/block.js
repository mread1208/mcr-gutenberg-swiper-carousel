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
const { registerBlockType, RichText } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	MediaUpload,
	MediaPlaceholder,
	MediaUploadCheck,
	InspectorControls
} = wp.editor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	RadioControl
} = wp.components;

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
		images: {
			type: "array",
			default: []
		},
		autoplay: {
			type: "string",
			default: "true"
		},
		speed: {
			type: "string",
			default: "500"
		},
		delay: {
			type: "string",
			default: "5000"
		},
		loop: {
			type: "string",
			default: "true"
		},
		effect: {
			type: "string",
			default: "slide"
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

	edit: function(props) {
		const { images, autoplay, loop, speed, delay, effect } = props.attributes;

		function updateSliderSetting(event) {
			const selected = event.target.querySelector(
				"#mcr-carousel-loop-setting option:checked"
			);
			props.setAttributes({ loop: selected.value });
			event.preventDefault();
		}
		function updateSliderSetting(value) {
			props.setAttributes(value);
		}

		function removeImage(removeImg, currentImages) {
			// Filter out the image we're deleting
			const filterImages = currentImages.filter(img => img.id != removeImg.id);
			// Reset the ID's to the new index
			const updatedImages = filterImages.map((img, index) => {
				if (img.id != removeImg.id) {
					return {
						id: index,
						imgid: img.imgid,
						url: img.url,
						thumbnailUrl: img.thumbnailUrl,
						alt: img.alt,
						caption: img.caption
					};
				}
			});
			props.setAttributes({
				images: updatedImages
			});
		}

		function addImage(selectedImage, selectedImages, selectedImageIndex) {
			const updatedImage = {
				id: selectedImageIndex,
				imgid: selectedImage.id,
				url: selectedImage.sizes.full.url,
				thumbnailUrl: selectedImage.sizes.thumbnail.url,
				alt: selectedImage.alt,
				caption: selectedImage.caption
			};
			// Insert our new image into the array after the current index.
			selectedImages.splice(selectedImageIndex + 1, 0, updatedImage);
			const updatedImages = selectedImages.map((img, index) => {
				return {
					id: index,
					imgid: img.id,
					url: img.url,
					thumbnailUrl: img.thumbnailUrl,
					alt: img.alt,
					caption: img.caption
				};
			});

			props.setAttributes({
				images: updatedImages
			});
		}

		// Replace the image with the new selected one
		// need to update the specific attribute image with this iamge
		const onSelectImage = function(
			selectedImage,
			selectedImages,
			selectedImageIndex
		) {
			const updatedImages = selectedImages.map(img => {
				if (img.id === selectedImageIndex) {
					return {
						id: selectedImageIndex,
						imgid: selectedImage.id,
						url: selectedImage.sizes.full.url,
						thumbnailUrl: selectedImage.sizes.thumbnail.url,
						alt: selectedImage.alt,
						caption: selectedImage.caption
					};
				} else {
					return img;
				}
			});
			props.setAttributes({
				images: updatedImages
			});
		};

		// Add an id to the array of selected images and update the img attribute
		const onSelectImages = function(selectedImages) {
			const updatedImages = selectedImages.map((img, index) => {
				return {
					id: index,
					imgid: img.id,
					url: img.sizes.full.url,
					thumbnailUrl: img.sizes.thumbnail.url,
					alt: img.alt,
					caption: img.caption
				};
			});
			props.setAttributes({
				images: updatedImages
			});
		};

		//https://wordpress.stackexchange.com/questions/303749/only-show-focused-toolbar-for-gutenberg-block-with-multiple-text-fields
		if (images.length > 0) {
			return [
				<InspectorControls>
					<PanelBody title={__("Carousel Settings")}>
						<PanelRow>
							<RadioControl
								label="Auto Play"
								selected={autoplay}
								options={[
									{ label: "True", value: "true" },
									{ label: "False", value: "false" }
								]}
								onChange={option => {
									updateSliderSetting({ autoplay: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Delay"
								value={delay}
								onChange={option => {
									updateSliderSetting({ delay: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Speed"
								value={speed}
								onChange={option => {
									updateSliderSetting({ speed: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<RadioControl
								label="Loop"
								selected={loop}
								options={[
									{ label: "True", value: "true" },
									{ label: "False", value: "false" }
								]}
								onChange={option => {
									updateSliderSetting({ loop: option });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="Effect"
								selected={effect}
								options={[
									{ label: "Slide", value: "slide" },
									{ label: "Fade", value: "fade" },
									{ label: "Cube", value: "cube" },
									{ label: "Coverflow", value: "coverflow" },
									{ label: "Flip", value: "flip" }
								]}
								onChange={option => {
									updateSliderSetting({ effect: option });
								}}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>,
				<Fragment>
					{images.map((img, imgMapIndex) => {
						return [
							<div class="media-row mcr-media-row">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={selectedImg =>
											onSelectImage(selectedImg, images, imgMapIndex)
										}
										type="image"
										value={img.imgid}
										accept="image/*"
										type="image"
										className=""
										render={({ open }) => (
											<Button className={"image-button"} onClick={open}>
												<img src={img.url} />
											</Button>
										)}
									/>
									<div className="mcr-media-row--delete-button">
										<Button
											className={"button button-large"}
											onClick={() => {
												removeImage(img, images);
											}}
										>
											X
										</Button>
									</div>
									<div className="mcr-media-row--add-button">
										<MediaUpload
											onSelect={selectedImage =>
												addImage(selectedImage, images, imgMapIndex)
											}
											type="image"
											accept="image/*"
											type="image"
											render={({ open }) => (
												<Button
													className={"button button-large"}
													onClick={open}
												>
													Add Image
												</Button>
											)}
										/>
									</div>
								</MediaUploadCheck>
							</div>
						];
					})}
				</Fragment>
			];
		} else {
			return (
				<Fragment>
					<div className={props.className}>
						<MediaPlaceholder
							icon="format-gallery"
							className={props.className}
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
		const { images, autoplay, loop, speed, delay, effect } = props.attributes;
		return (
			<div
				className={`swiper-container mcr-swiper-container js-mcr-swiper-container`}
				data-mcr-carousel-autoplay={autoplay}
				data-mcr-carousel-delay={delay}
				data-mcr-carousel-loop={loop}
				data-mcr-carousel-speed={speed}
				data-mcr-carousel-effect={effect}
			>
				<div className="swiper-wrapper mcr-swiper-wrapper">
					{images.map((image, index) => {
						return (
							<div className="swiper-slide mcr-swiper-slide">
								<img src={image.url} alt={image.alt} />
							</div>
						);
					})}
				</div>
				<div className="swiper-pagination js-mcr-swiper-pagination" />
				<div className="js-mcr-swiper-button-prev swiper-button-prev mcr-swiper-button-prev" />
				<div className="js-mcr-swiper-button-next swiper-button-next mcr-swiper-button-next" />
			</div>
		);
	}
});
