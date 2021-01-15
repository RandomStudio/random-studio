import styles from './Main.module.scss';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { remap } from '@anselan/maprange';
import { Mesh } from '@babylonjs/core';
import Loadable from '@loadable/component';

const ImageContainer = Loadable(() => import('../ImageContainer/ImageContainer'));

import Scrubber from '../Scrubber/Scrubber';
import Scene from '../Scene/Scene';
import GridBlocks from './GridBlocks';
import Header from '../Header/Header';

import useRunEveryFrame from '../../hooks/useRunEveryFrame';
import useWindowSize from '../../hooks/useWindowSize';

import { ONE_THIRD, PARCEL_START_TIME, TWO_THIRD } from '../../utils/CONSTANTS';
import { clamp } from '../../utils/mathUtils';

import stats from '../../utils/addStats';
import gpsData from '../../utils/gpsWithData.json';

// Special takeover header
const Main = ({ isLive, totalDuration, isPastLive, handleSetSceneHasMounted }) => {
	const sceneRef = useRef();
	const scrubberRef = useRef();
	const imageContainerRef = useRef();
	const currentFrameRef = useRef(0);
	const timeProgress = useRef(0);

	// For during live only
	const progressiveTrackerLine = useRef();
	const progressiveTrackerLineToShowLength = useRef(0);
	const progressiveTrackerLineMesh = useRef();


	const { height, width } = useWindowSize();

	const [sceneAnimationGroup, setSceneAnimationGroup] = useState();

	const [totalFrames, setTotalFrames] = useState(0); // Total frames for whole animation

	const [currentCoordIndex, setCurrentCoordIndex] = useState(0);

	const [isPlaying, setIsPlaying] = useState(isLive || isPastLive);

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

			scrubberRef.current.setThumb({ x: newX });


			// Last minute fix to correctly sync
			// progress bar and exclusing the non reaching ends
			if (isLive) {
				scrubberRef.current.setLiveThumb({
					xLive: newX,
					scaleLive: clamp(
						26 / scrubberRef.current.scrubberWidth + (newX - 26) / scrubberRef.current.scrubberWidth,
						0,
						1
					)
				});
			}

			updateCoord();

			stats.end();
		}
	});

	// Initialize the animation group with positions
	// And duration
	useEffect(() => {
		if (sceneRef.current) {
			const animGroup = sceneRef.current.getAnimation();

			if (animGroup) {
				setSceneAnimationGroup(animGroup);

				setTotalFrames(animGroup._to);
			}
		}
	}, []);

	useEffect(() => {
		if (!progressiveTrackerLine.current && sceneRef.current && isLive) {
			// Get all the Vector3's for the line
			progressiveTrackerLine.current = sceneRef.current.getTrackerLinePoints();

			// Create and place live to be processing line
			progressiveTrackerLineMesh.current = sceneRef.current.getParcelTrackerLineMesh()(progressiveTrackerLine.current);
		}

		setIsPlaying(isLive || isPastLive);

		// For the loader
		// handleSetSceneHasMounted(true);
	}, [isLive, isPastLive]);

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

		const xLimit = scrubberRef.current.scrubberWidth * progressLive;

		const newX = clamp(xTarget, 0, xLimit);

		scrubberRef.current.setThumb({ x: newX });

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
		const currentOpacity = remap(limitedProgress, [0, ONE_THIRD], [0, 1], true);
		const currentOpacity2 = remap(limitedProgress, [ONE_THIRD, TWO_THIRD], [0, 1], true);
		const currentOpacity3 = remap(limitedProgress, [TWO_THIRD, 1], [0, 1], true);

		const isFirstPart = limitedProgress <= ONE_THIRD;
		const isSecondPart = limitedProgress >= ONE_THIRD && limitedProgress <= TWO_THIRD;
		const isThirdPart = limitedProgress >= TWO_THIRD && limitedProgress <= 1;

		// Huge if else to prevent a more seamless image transfer
		// Flashing due to image switching
		// Check due to component splitting
		if (!imageContainerRef.current) return;

		if (isPlaying) {
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
		}
		// Update if changes and has not reached the end
		if (currentCoordIndex !== currentCoordIndexJump && currentFrameRef.current !== totalFrames) {
			setCurrentCoordIndex(currentCoordIndexJump);

			if (currentFrameRef.current > progressiveTrackerLineToShowLength.current * 60 && isLive) {
				progressiveTrackerLineMesh.current.disableEdgesRendering();

				const newArr = Array.from(progressiveTrackerLine.current);
				const newTrack = newArr.slice(0, Math.floor(currentFrameRef.current / 60));

				progressiveTrackerLineToShowLength.current = newTrack.length; // Keep length progressive

				const updated = newArr.fill(progressiveTrackerLine.current[newTrack.length], newTrack.length, progressiveTrackerLine.current.length);

				progressiveTrackerLineMesh.current = Mesh.CreateLines(null, updated, null, null, progressiveTrackerLineMesh.current);
				progressiveTrackerLineMesh.current.enableEdgesRendering();
			}
		}
	}, [currentCoordIndex, totalFrames, isPlaying]);

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
						<ImageContainer ref={imageContainerRef} currentCoordIndex={currentCoordIndex} isPlaying={isPlaying} />
					</div>

					<div className={styles.mapFocusContainer}>
						<Scene ref={sceneRef} isLive={isLive} />

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
