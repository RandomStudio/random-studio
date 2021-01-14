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
		currentColor,
	},
	ref,
) => {
	const isPlayingRef = useRef(isPlaying);
	const scrubberRef = useRef();

	// The BG color saved when paused on drag
	const liveBackgroundColor = useRef();

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [isLiveDragging, setIsLiveDragging] = useState(false);

	const [{ x }, set] = useSpring(() => ({ x: 0 }));
	const [{ xLive, scaleLive }, setLive] = useSpring(() => ({ xLive: 0, scaleLive: 0 }));

	useEffect(() => {
		function getSize() {
			if (scrubberRef.current) {
				setDimensions({
					width: scrubberRef.current.offsetWidth,
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
				width: scrubberRef.current.offsetWidth,
				height: scrubberRef.current.offsetHeight,
			});
		}
	}, []);

	// On resize update the scrubber loc
	useEffect(() => {
		const newX = (currentFrame / totalFrames) * dimensions.width;

		set({ x: newX });
	}, [dimensions, set, totalFrames, currentFrame]);

	const getClientSideX = (inputX) => {
		if (typeof window === 'undefined') return 0;

		// Calculated by
		// padding of container(scrubber) - 32
		// left offset of scrubber box (initial) - 28
		// width of scrubber- 20
		const mappedX = remap(inputX, [70, window.innerWidth - 70], [0, dimensions.width], true);

		return mappedX;
	};

	const getTargetFrame = (inputX) => {
		if (typeof window === 'undefined') return 0;

		const targetFrame = Math.floor(remap(inputX, [70, window.innerWidth - 70], [0, totalFrames], true));

		return targetFrame;
	};

	const handleUpdateFrameByClick = (inputX) => {
		const targetX = getClientSideX(inputX);

		if (isLive) {
			updateLiveFrames(targetX);
		} else {
			const targetFrame = getTargetFrame(inputX);

			set({ x: targetX });
			updateFrames(targetFrame);
		}
	};

	const bind = useDrag(
		({ first, last, xy: [ogX] }) => {
			if (typeof window === 'undefined') return;

			if (first) {
				isPlayingRef.current = isPlaying;
				setIsPlaying(false);
			}

			const targetX = getClientSideX(ogX);
			const targetFrame = getTargetFrame(ogX);

			if (isLive) {
				if (first) {
					setIsLiveDragging(true);
					liveBackgroundColor.current = currentColor;
				}

				updateLiveFrames(targetX);

				if (last) {
					setIsLiveDragging(false);
				}
			} else {
				set({ x: targetX });

				updateFrames(targetFrame);
			}

			// Resume playing if started scrub while playing
			if (last && isPlayingRef.current) {
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
			setThumb: set,
			setLiveThumb: setLive,
			scrubberWidth: dimensions.width,
		}),
		[set, dimensions, setLive],
	);

	const contrainerClasses = classnames(styles.container, {
		[customClass]: customClass,
	});

	const scrubberContainerClasses = classnames(styles.scrubberContainer, {
		[styles.isLive]: isLive,
	});

	const interactiveThumbnailClasses = classnames(styles.thumbnail, styles.thumbnailInteractive, {
		[styles.isLive]: isLive,
		[styles.isDragging]: isLiveDragging,
	});

	const liveThumbnailClasses = classnames(styles.thumbnail, styles.thumbnailLive, {
		[styles.isDragging]: isLiveDragging,
	});

	return (
		<section className={contrainerClasses}>
			<animated.div
				className={scrubberContainerClasses}
				style={{ '--scrubberLineScale': scaleLive }}
				onPointerDown={(e) => {
					handleUpdateFrameByClick(e.clientX);
				}}
			>
				<span></span>
				<span></span>
				<span></span>

				<div ref={scrubberRef} className={styles.scrubber}>
					{isLive && (
						<animated.div
							className={liveThumbnailClasses}
							style={{
								backgroundColor: isLiveDragging ? liveBackgroundColor.current : currentColor,
								x: xLive,
							}}
						>
							<p>LIVE</p>
						</animated.div>
					)}

					<animated.div
						{...bind()}
						className={interactiveThumbnailClasses}
						style={{
							backgroundColor: currentColor || '#fff',
							x,
						}}
					>
						<p>{`${gpsData[currentCoordIndex].timestamp.date} ${gpsData[currentCoordIndex].timestamp.time}`}</p>
					</animated.div>
				</div>
			</animated.div>
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
