import styles from './ImageContainer.module.scss';
import React, { useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
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

	const [shouldRender, setShouldRender] = useState(false);
	useTimeout(() => setShouldRender(true), 500);

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

	if (!shouldRender) return null;

	return (
		<section className={styles.container}>
			{imageSprings.map(({ opacity }, index) => {
				const imgSrc = currentImages[index];
        const extension = imgSrc.split('.').pop();
				return (
					<LazyImageFull
						key={imgSrc}
						// debounceDurationMs={0}
            debounceDurationMs={150}
						//src={`/images/${imgSrc}`}
						//placeholderSrc={`/images-thumbnails/${imgSrc}`}
						placeholderSrc={`https://d319unozazpg6l.cloudfront.net/images-thumbnails/${imgSrc}`}
						sizes="(max-width: 1280px) 50vw,
									 (max-width: 2160px) 40vw,
									 25vw"
						src={`https://d319unozazpg6l.cloudfront.net/images/${imgSrc}`}
						srcSet={`
							https://d319unozazpg6l.cloudfront.net/images/${imgSrc}_small.${extension} 512w,
							https://d319unozazpg6l.cloudfront.net/images/${imgSrc} 1080w
						`}
					>
						{({ imageProps, imageState, ref }) => {
							return (
								<animated.div ref={ref} style={{ opacity: !isPlaying ? 1 : opacity }}>
									<img
										alt=""
										src={imageProps.placeholderSrc}
										className={styles.placeholder}
										style={{
											...overlayStyles,
											opacity: imageState === ImageState.LoadSuccess ? 0 : 1
										}}
									/>
									<animated.img
										src={imageState === ImageState.LoadSuccess ? imageProps.src : imageProps.placeholderSrc}
										srcSet={imageProps.srcSet}
										alt=""
										style={{
											opacity: imageState === ImageState.LoadSuccess ? 1 : 0
										}}
									/>
								</animated.div>
							)
						}}
					</LazyImageFull>
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
