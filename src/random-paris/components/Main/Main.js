import styles from './Main.module.scss';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { remap } from '@anselan/maprange';

import Scrubber from '../Scrubber/Scrubber';

import Loadable from '@loadable/component';
import Scene from '../Scene/Scene';
// import ImageContainer from '../ImageContainer/ImageContainer';

const ImageContainer = Loadable(() => import('../ImageContainer/ImageContainer'));
// const Scene = Loadable(() => import('../Scene/Scene'));

import GridBlocks from './GridBlocks';

import useRunEveryFrame from '../../hooks/useRunEveryFrame';
import useWindowSize from '../../hooks/useWindowSize';
import Header from '../Header/Header';

import { ONE_THIRD, PARCEL_START_TIME, TWO_THIRD } from '../../utils/CONSTANTS';
import { clamp } from '../../utils/mathUtils';

import stats from '../../utils/addStats';
import gpsData from '../../utils/gpsWithData.json';

// Special takeover header
const Main = ({ isLive, totalDuration }) => {
	const sceneRef = useRef();
	const scrubberRef = useRef();
	const imageContainerRef = useRef();

	const currentFrameRef = useRef(0);
	const timeProgress = useRef(0);

	const { height, width } = useWindowSize();

	const [sceneAnimationGroup, setSceneAnimationGroup] = useState();

	const [totalFrames, setTotalFrames] = useState(0); // Total frames for whole animation

	const [currentCoordIndex, setCurrentCoordIndex] = useState(0);

	const [isPlaying, setIsPlaying] = useState(isLive);

	// Make it time reliant instead of fps
	const runClock = useMemo(() => {
		if (typeof window !== 'undefined') {
			const startTime = performance.now();
			const startTimeProgressRefCurrent = timeProgress.current;

			return () => {
				if (isLive) {
					const liveTime = (new Date().getTime() - PARCEL_START_TIME) / 1000;

					timeProgress.current = liveTime;
				} else if (isPlaying) {
					timeProgress.current = startTimeProgressRefCurrent + (performance.now() - startTime) / 1000;
				}
			};
		}

		return () => { };
	}, [isPlaying, isLive]);

	useRunEveryFrame(runClock);

	// On play run loop
	useRunEveryFrame(() => {
		if (sceneAnimationGroup && isPlaying && currentFrameRef.current < totalFrames && scrubberRef.current) {
			stats.begin();

			const progress = clamp(timeProgress.current / totalDuration, 0, 1);

			const currentFrame = Math.floor(totalFrames * progress);

			currentFrameRef.current = currentFrame;
			sceneAnimationGroup.goToFrame(currentFrameRef.current);

			const newX = scrubberRef.current.scrubberWidth * progress;

			scrubberRef.current.setDrag({ x: newX });

			updateCoord();

			stats.end();
		}
	});

	// Initialize the animation group with positions
	// And duration
	useEffect(() => {
		// Scene.load().then(() => {
		// 	console.log('Component is loaded!', sceneRef.current)
		if (sceneRef.current) {
			// const onReadyInterval = setInterval(() => {
			const animGroup = sceneRef.current.getAnimation();

			if (animGroup) {
				console.log(animGroup);

				// animGroup.play();
				// animGroup.goToFrame(1);
				// animGroup.pause();
				setSceneAnimationGroup(animGroup);

				setTotalFrames(animGroup._to);

				console.log(`
							DURATION in Minutes - ${gpsData.length}
							TOTAL FRAMES - ${animGroup._to}
						`);

				// clearInterval(onReadyInterval);
			}

			// }, 300);




			// const animGroup = sceneRef.current.getAnimation();

		}
		// })
	}, []);

	useEffect(() => {
		setIsPlaying(isLive);
	}, [isLive]);

	const scrubUpdateFrames = (frame) => {
		sceneAnimationGroup.goToFrame(frame);
		currentFrameRef.current = frame;

		// Update the time accordingly on drag
		timeProgress.current = (currentFrameRef.current / totalFrames) * totalDuration;

		updateCoord();
	};

	const scrubUpdateLiveFrames = (xTarget) => {
		// If isLive allow only dragging to the past
		// Handle drag execution here instead of in Scrubber (access to time here)
		const progressLive = timeProgress.current / totalDuration;
		// const newX = totalWidth * progress;
		const xLimit = scrubberRef.current.scrubberWidth * progressLive;

		// const xTarget = (inputX / scrubberRef.current.scrubberWidth) * scrubberRef.current.scrubberWidth;

		const newX = clamp(xTarget, 0, xLimit);

		scrubberRef.current.setDrag({ x: newX });

		//
		const frameTarget = (newX / scrubberRef.current.scrubberWidth) * totalFrames;

		sceneAnimationGroup.goToFrame(frameTarget);
		currentFrameRef.current = frameTarget;

		updateCoord();
	};

	const updateCoord = useCallback(() => {
		const progress = currentFrameRef.current / (totalFrames / gpsData.length);

		const currentCoordIndexJump = Math.floor(progress) % gpsData.length;

		const limitedProgress = progress % 1;
		const shouldFlip = currentCoordIndexJump % 2 === 1;

		// A three step opacity transition
		const currentOpacity = remap(limitedProgress, [0, ONE_THIRD], [0, 1]);
		const currentOpacity2 = remap(limitedProgress, [ONE_THIRD, TWO_THIRD], [0, 1]);
		const currentOpacity3 = remap(limitedProgress, [TWO_THIRD, 1], [0, 1]);

		// TODO - Quick test - make this better
		const isFirstPart = limitedProgress <= ONE_THIRD;
		const isSecondPart = limitedProgress >= ONE_THIRD && limitedProgress <= TWO_THIRD;
		const isThirdPart = limitedProgress >= TWO_THIRD && limitedProgress <= 1;

		// Huge if else to prevent a more seamless image transfer
		// Flashing due to image switching
		// Check due to component splitting
		if (!imageContainerRef.current) return;

		imageContainerRef.current.setOpacitySprings((index) => {
			if (shouldFlip) {
				if (isFirstPart) {
					if (index === 3) {
						return { immediate: true, opacity: 1 - currentOpacity };
					} else if (index === 4) {
						return { immediate: true, opacity: currentOpacity };
					}
				} else if (isSecondPart) {
					if (index === 4) {
						return { immediate: true, opacity: 1 - currentOpacity2 };
					} else if (index === 5) {
						return { immediate: true, opacity: currentOpacity2 };
					}
				} else if (isThirdPart) {
					if (index === 5) {
						return { immediate: true, opacity: 1 - currentOpacity3 };
					} else if (index === 0) {
						return { immediate: true, opacity: currentOpacity3 };
					}
				}
			} else {
				if (isFirstPart) {
					if (index === 0) {
						return { immediate: true, opacity: 1 - currentOpacity };
					} else if (index === 1) {
						return { immediate: true, opacity: currentOpacity };
					}
				} else if (isSecondPart) {
					if (index === 1) {
						return { immediate: true, opacity: 1 - currentOpacity2 };
					} else if (index === 2) {
						return { immediate: true, opacity: currentOpacity2 };
					}
				} else if (isThirdPart) {
					if (index === 2) {
						return { immediate: true, opacity: 1 - currentOpacity3 };
					} else if (index === 3) {
						return { immediate: true, opacity: currentOpacity3 };
					}
				}
			}

			return { immediate: true, opacity: 0 };
		});

		// Update if changes and has not reached the end
		if (currentCoordIndex !== currentCoordIndexJump && currentFrameRef.current !== totalFrames) {
			setCurrentCoordIndex(currentCoordIndexJump);
		}
	}, [currentCoordIndex, totalFrames]);

	const activeCoord = useMemo(() => {
		return gpsData[currentCoordIndex] || {};
	}, [currentCoordIndex]);

	return (
		<>
			<main
				style={{
					'--window-height': height,
					'--window-width': width,
					backgroundColor: activeCoord?.mixedColor,
				}}
				className={styles.container}
			>
				<section className={styles.grid}>
					<div className={styles.imageContainer}>
						<ImageContainer ref={imageContainerRef} currentCoordIndex={currentCoordIndex} />
					</div>

					<div className={styles.mapFocusContainer}>
						<Scene ref={sceneRef} />

						<div className={styles.crossHairContainer}>
							<span></span>
							<span></span>
							<span className={styles.crossHairSwatch}
								style={{ backgroundColor: activeCoord?.mixedColor || '#fff' }}
							></span>
						</div>

						<div className={styles.coordinates}>
							<p>X {activeCoord.lng}</p>
							<p>Y {activeCoord.lat}</p>
						</div>
					</div>
				</section>

				{sceneAnimationGroup && (
					<Scrubber
						ref={scrubberRef}
						thumbnail={gpsData[currentCoordIndex].images[1]}
						customClass={styles.scrubber}
						updateFrames={scrubUpdateFrames}
						updateLiveFrames={scrubUpdateLiveFrames}
						totalFrames={totalFrames}
						currentFrame={currentFrameRef.current}
						currentCoordIndex={currentCoordIndex}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						isLive={isLive}
						currentColor={activeCoord?.mixedColor}
					/>
				)}

				<section className={`${styles.grid} ${styles.bgGrid}`}>
					<GridBlocks />
				</section>

				<Header />
			</main>
		</>
	);
};

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
