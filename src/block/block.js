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
const { MediaUpload, MediaPlaceholder, MediaUploadCheck } = wp.editor;
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
						alt: img.alt,
						caption: img.caption
					};
				}
			});
			setAttributes({
				images: updatedImages
			});
		}

		function addImage(selectedImage, selectedImages, selectedImageIndex) {
			const updatedImage = {
				id: selectedImageIndex,
				imgid: selectedImage.id,
				url: selectedImage.sizes.full.url,
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
					alt: img.alt,
					caption: img.caption
				};
			});

			setAttributes({
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
						alt: selectedImage.alt,
						caption: selectedImage.caption
					};
				} else {
					return img;
				}
			});
			setAttributes({
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
					alt: img.alt,
					caption: img.caption
				};
			});
			setAttributes({
				images: updatedImages
			});
		};

		//https://wordpress.stackexchange.com/questions/303749/only-show-focused-toolbar-for-gutenberg-block-with-multiple-text-fields
		if (images.length > 0) {
			console.log(images);
			return (
				<div>
					{images.map((img, imgMapIndex) => {
						return [
							<div class="media-row">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={selectedImg =>
											onSelectImage(selectedImg, images, imgMapIndex)
										}
										type="image"
										value={img.imgid}
										accept="image/*"
										type="image"
										render={({ open }) => (
											<div>
												<Button className={"image-button"} onClick={open}>
													<img src={img.url} />
												</Button>
											</div>
										)}
									/>
									<div className="button-container">
										<Button
											className={"button button-large"}
											onClick={() => {
												removeImage(img, images);
											}}
										>
											Remove Image
										</Button>
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
				</div>
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
