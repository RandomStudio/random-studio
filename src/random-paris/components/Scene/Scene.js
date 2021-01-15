import styles from './Scene.module.scss';

import React, { forwardRef, useImperativeHandle } from 'react';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import BabylonScene from 'babylonjs-hook';
import '@babylonjs/loaders/glTF';

import progressiveTileLoader, { loadAllTiles } from '../../utils/progressiveTileLoader';
import createParcelLine from '../../utils/createParcelLine';

let camera;
let parcelAnimGroup;
let parcelTrackerLine;
let createParcelTrackerLineMesh;

let camTargetProgress = 0;

const onSceneReady = async (scene, isLive) => {
	scene.autoClear = false;

	// This creates and positions a free camera (non-mesh)
	camera = new FreeCamera('camera1', new Vector3(0, 0, 0), scene);

	camera.speed = 0.1;
	camera.minZ = 0.001;
	// SceneLoader.ShowLoadingScreen = false;

	const canvas = scene.getEngine().getRenderingCanvas();

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);
	camera.inputs.attached.keyboard.detachControl();

	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

	// The focus/follow for the camera
	const followObject = MeshBuilder.CreateBox('box', { size: 0.05 }, scene);

	const { animationGroup: animParcel, trackerLine, createLiveTrackerLine } = createParcelLine(
		scene,
		camera,
		followObject,
		1,
		isLive,
	);

	parcelAnimGroup = animParcel;
	parcelTrackerLine = trackerLine;
	createParcelTrackerLineMesh = createLiveTrackerLine;

	// Initialize animation
	animParcel.play();
	animParcel.goToFrame(1);
	animParcel.pause();

	// loadAllTiles();

	let isDrag = false;

	canvas.addEventListener(
		'pointerup',
		() => {
			isDrag = false;
			camTargetProgress = 0;
		},
		false,
	);

	canvas.addEventListener(
		'pointerdown',
		() => {
			isDrag = true;
			camTargetProgress = 0;
		},
		false,
	);

	// runs every frame
	scene.registerBeforeRender(() => {
		progressiveTileLoader(scene, camera);

		if (!isDrag) {
			if (camTargetProgress >= 1) return;

			const newTarget = Vector3.Lerp(camera.target, followObject.position, camTargetProgress);
			camTargetProgress += 0.01;

			camera.setTarget(newTarget);
		}
	});
};

const Scene = ({ isLive }, ref) => {
	useImperativeHandle(
		ref,
		() => ({
			getAnimation() {
				return parcelAnimGroup;
			},
			getTrackerLinePoints() {
				return parcelTrackerLine;
			},
			getParcelTrackerLineMesh() {
				return createParcelTrackerLineMesh;
			},
		}),
		[],
	);

	return (
		<BabylonScene antialias onSceneReady={(scene) => onSceneReady(scene, isLive)} className={styles.renderCanvas} />
	);
};

export default forwardRef(Scene);
