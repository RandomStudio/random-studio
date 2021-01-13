import styles from './Scrubber.module.scss';

import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { remap } from '@anselan/maprange';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { WIDTH_CORRECTION } from '../../utils/CONSTANTS';
import gpsData from '../../utils/gpsWithData.json';

const HALF_WIDTH_CORRECTION = WIDTH_CORRECTION / 2;

const Scrubber = (
	{
		customClass,
		currentFrame,
		updateFrames,
		totalFrames,
		isPlaying,
		setIsPlaying,
		isLive,
		currentCoordIndex,
		updateLiveFrames,
	},
	ref,
) => {
	const isPlayingRef = useRef(isPlaying);
	const scrubberRef = useRef(scrubberRef);

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		function getSize() {
			if (scrubberRef.current) {
				setDimensions({
					width: scrubberRef.current.offsetWidth - HALF_WIDTH_CORRECTION,
					height: scrubberRef.current.offsetHeight,
				});
			}
		}

		window.addEventListener('resize', getSize);
		return () => window.removeEventListener('resize', getSize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	useEffect(() => {
		if (scrubberRef.current) {
			setDimensions({
				// To fit withing boundaries
				width: scrubberRef.current.offsetWidth - HALF_WIDTH_CORRECTION,
				height: scrubberRef.current.offsetHeight,
			});
		}
	}, []);

	// On resize update the scrubber loc
	useEffect(() => {
		const newX = (currentFrame / totalFrames) * dimensions.width;

		set({ x: newX, immediate: true });
	}, [dimensions, set, totalFrames, currentFrame]);

	const [{ x }, set] = useSpring(() => ({ x: 0 }));

	const frameStepPerPixel = useMemo(() => dimensions.width / totalFrames, [dimensions, totalFrames]);

	const getClientSideX = (inputX) => {
		if (typeof window === 'undefined') return 0;

		const mappedX = remap(inputX, [HALF_WIDTH_CORRECTION + 30, window.innerWidth - 110], [0, dimensions.width]);

		return mappedX;
	};

	const handleUpdateLiveFrames = (inputX) => {
		setIsPlaying(false);

		const newX = getClientSideX(inputX);

		updateLiveFrames(newX);
	};

	const bind = useDrag(
		({ offset: [ox], first, last, xy: [ogX] }) => {
			if (typeof window === 'undefined') return;

			if (first) {
				isPlayingRef.current = isPlaying;
				setIsPlaying(false);
			}

			if (isLive) {
				handleUpdateLiveFrames(ogX);
			} else {
				const newX = (ox / dimensions.width) * dimensions.width;

				set({ x: newX });

				updateFrames(Math.floor(ox / frameStepPerPixel));
			}

			// Resume playing if started scrub while playing
			if (last && isPlayingRef.current && !isLive) {
				setIsPlaying(true);
			}
		},
		{
			bounds: {
				left: 0,
				right: dimensions.width,
			},
			axis: 'x',
		},
	);

	useImperativeHandle(
		ref,
		() => ({
			setDrag: set,
			scrubberWidth: dimensions.width,
		}),
		[set, dimensions],
	);

	const contrainerClasses = classnames(styles.container, {
		[customClass]: customClass,
	});

	return (
		<section className={contrainerClasses}>
			<div className={styles.scrubberContainer}>
				<span></span>
				<span></span>
				<span></span>

				<div
					ref={scrubberRef}
					className={styles.scrubber}
					onPointerDown={(e) => {
						handleUpdateLiveFrames(e.clientX);
					}}
				>
					<animated.div
						{...bind()}
						className={styles.thumbnail}
						style={{
							backgroundSize: 'contain',
							x,
						}}
					>
						{!isPlaying && (
							<button
								className={styles.liveContinueButton}
								onClick={() => {
									setIsPlaying(true);
								}}
							>
								RESUME
							</button>
						)}
						<p>{gpsData[currentCoordIndex].timestamp.date}</p>
						<p>{`${gpsData[currentCoordIndex].timestamp.time}`}</p>
					</animated.div>
				</div>
			</div>
		</section>
	);
};

Scrubber.propTypes = {
	customClass: PropTypes.string,
	thumbnail: PropTypes.string.isRequired,
	updateFrames: PropTypes.func.isRequired,
	totalFrames: PropTypes.number.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	setIsPlaying: PropTypes.func.isRequired,
	currentFrame: PropTypes.number.isRequired,
};

Scrubber.defaultProps = {
	customClass: '',
};

export default forwardRef(Scrubber);
