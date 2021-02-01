import styles from './ImageContainer.module.scss';
import React, { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useSprings, animated } from 'react-spring';
import gpsData from '../../utils/gpsWithData.json';
// import gpsData from '../../utils/gpsWithDataSmall.json';

import { LazyImageFull, ImageState } from 'react-lazy-images';
import useTimeout from '../../hooks/useTimeout';

const overlayStyles = {
	position: 'absolute',
	filter: 'blur(2px)',
	transition: 'opacity ease-in 300ms',
	clipPath: 'inset(0)',
};

const ImageContainer = ({ currentCoordIndex, isPlaying }, ref) => {
	const activeIndexRef = useRef(0);

	const currentImages = useMemo(() => {
		if (!isPlaying) return [gpsData[currentCoordIndex].images[0]];

		const shouldFlip = currentCoordIndex % 2 === 1;

		if (currentCoordIndex >= gpsData.length - 1) {
			return gpsData[currentCoordIndex].images;
		}

		if (shouldFlip) {
			return [...gpsData[currentCoordIndex + 1].images, ...gpsData[currentCoordIndex].images];
		}

		return [...gpsData[currentCoordIndex].images, ...gpsData[currentCoordIndex + 1].images];
	}, [currentCoordIndex, isPlaying]);

	const [imageSprings, setImageSprings] = useSprings(
		currentImages.length,
		(index) => ({ opacity: index === 0 && currentCoordIndex === 0 ? 1 : 0 }),
		[currentImages],
	);

	useImperativeHandle(
		ref,
		() => ({
			setOpacitySprings: setImageSprings,
			setActiveIndexRef: (newIndex) => {
				activeIndexRef.current = newIndex;
			},
		}),
		[setImageSprings],
	);

	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		window.setTimeout(() => setShouldRender(true), 500);
		return () => {
			setShouldRender(false);
		}
	}, [currentImages]);

	const [imagesWithState, setImagesWithState] = useState([]);
	useEffect(() => {
		const images = imageSprings.map((_, index) => {
			const imgSrc = currentImages[index];
			const extension = imgSrc.split('.').pop();
			return {
				isLoaded: false,
				src: `https://d319unozazpg6l.cloudfront.net/images/${imgSrc}`,
				srcSet: `https://d319unozazpg6l.cloudfront.net/images/${imgSrc}_small.${extension} 512w, https://d319unozazpg6l.cloudfront.net/images/${imgSrc} 1080w`,
				placeholder: `https://d319unozazpg6l.cloudfront.net/images-thumbnails/${imgSrc}`,
			};
		});
		setImagesWithState(images);

		if (!shouldRender) {
			return;
		}

		Promise.all(images.map(async (details, index) => {
			const {src, srcSet } = details;
			const image = new Image();
			image.src = src;
			image.srcset = srcSet;
			image.decoding = 'async';
			await image.decode();
			return {
				...details,
				isLoaded: true,
			}
		})).then(loadedImages => {
			setImagesWithState(loadedImages);
		});

		return () => {
			setImagesWithState([]);
		}
	}, [currentImages, shouldRender]);

	return (
		<section className={styles.container}>
			{imageSprings.map(({ opacity }, index) => {
				if (!imagesWithState[index]) {
					return null;
				}
				const {placeholder, src, srcSet, isLoaded } = imagesWithState[index];

				return (
					<animated.div style={{ opacity: !isPlaying ? 1 : opacity }}>
						<img
							alt=""
							src={placeholder}
							className={styles.placeholder}
							style={{
								...overlayStyles,
							}}
						/>
						<img
							className={`${styles.full} ${isLoaded ? styles.isLoaded : ''}`}
							sizes="(max-width: 1280px) 50vw, (max-width: 2160px) 40vw, 25vw"
							src={isLoaded ? src : placeholder}
							srcSet={isLoaded ? srcSet : ''}
							alt=""
						/>
					</animated.div>
				);
			})}
		</section>
	);
};

ImageContainer.propTypes = {
	currentCoordIndex: PropTypes.number.isRequired,
};

ImageContainer.defaultProps = {};

ImageContainer.displayName = 'ImageContainer';

export default forwardRef(ImageContainer);
