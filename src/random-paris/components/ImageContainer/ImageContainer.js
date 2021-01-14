import React, { useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useSprings, animated } from 'react-spring';
import gpsData from '../../utils/gpsWithData.json';
// import gpsData from '../../utils/gpsWithDataSmall.json';

import { LazyImageFull, ImageState } from 'react-lazy-images';
import styles from './ImageContainer.module.scss';
import useTimeout from '../../hooks/useTimeout';

const overlayStyles = {
	position: 'absolute',
	filter: 'blur(1px)',
	transition: 'opacity ease-in 300ms',
	clipPath: 'inset(0)',
};

const ImageContainer = ({ currentCoordIndex }, ref) => {
	const activeIndexRef = useRef(0);

	const [shouldRender, setShouldRender] = useState(false);
	useTimeout(() => setShouldRender(true), 500);

	const currentImages = useMemo(() => {
		const shouldFlip = currentCoordIndex % 2 === 1;

		if (currentCoordIndex >= gpsData.length - 1) {
			return gpsData[currentCoordIndex].images;
		}

		if (shouldFlip) {
			return [...gpsData[currentCoordIndex + 1].images, ...gpsData[currentCoordIndex].images];
		}

		return [...gpsData[currentCoordIndex].images, ...gpsData[currentCoordIndex + 1].images];
	}, [currentCoordIndex]);

	const [imageSprings, setImageSprings] = useSprings(
		currentImages.length,
		index => ({ opacity: index === 0 && currentCoordIndex === 0 ? 1 : 0 }),
		[currentImages],
	);

	useImperativeHandle(
		ref,
		() => ({
			setOpacitySprings: setImageSprings,
			setActiveIndexRef: newIndex => {
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

				return (
					<LazyImageFull
						key={imgSrc}
						// debounceDurationMs={0}
						debounceDurationMs={150}
						// src={`/images/${imgSrc}`}
						// placeholderSrc={`/images-thumbnails/${imgSrc}`}
						src={`https://random-paris.s3.eu-central-1.amazonaws.com/images/${imgSrc}`}
						placeholderSrc={`https://random-paris.s3.eu-central-1.amazonaws.com/images-thumbnails/${imgSrc}`}
					>
						{({ imageProps, imageState, ref }) => (
							<animated.div ref={ref} style={{ opacity: opacity }}>
								<animated.img
									src={imageState === ImageState.LoadSuccess ? imageProps.src : imageProps.placeholderSrc}
									alt=""
								/>
								<img
									alt=""
									src={imageProps.placeholderSrc}
									style={{
										...overlayStyles,
										opacity: imageState === ImageState.LoadSuccess ? 0 : 1
									}}
								/>
							</animated.div>
						)}
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
