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
let updateParcelTrackerLineMesh;

const onSceneReady = async (scene) => {
	scene.autoClear = false;

	// This creates and positions a free camera (non-mesh)
	camera = new FreeCamera('camera1', new Vector3(0, 0, 0), scene);

	camera.speed = 0.1;
	camera.minZ = 0.001;
	// SceneLoader.ShowLoadingScreen = false;

	const canvas = scene.getEngine().getRenderingCanvas();

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);

	// // WASD keys
	// camera.keysUp.push(87);
	// camera.keysDown.push(83);
	camera.keysDown.push(69); // Q
	camera.keysUp.push(81); // E
	camera.keysLeft.push(65);
	camera.keysRight.push(68);
	camera.keysDownward.push(83); // S
	camera.keysUpward.push(87); // W

	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

	// The focus/follow for the camera
	const followObject = MeshBuilder.CreateBox('box', { size: 0.05 }, scene);

	const { animationGroup: animParcel, trackerLine, createLiveTrackerLine, updateLiveTrackerLine } = createParcelLine(
		scene,
		camera,
		followObject,
		1,
	);

	parcelAnimGroup = animParcel;
	parcelTrackerLine = trackerLine;
	createParcelTrackerLineMesh = createLiveTrackerLine;
	updateParcelTrackerLineMesh = updateLiveTrackerLine;

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
			console.log('up');
		},
		false,
	);

	canvas.addEventListener(
		'pointerdown',
		() => {
			isDrag = true;
			console.log('up');
		},
		false,
	);

	// runs every frame
	scene.registerBeforeRender(() => {
		if (!isDrag) {
			// console.log(g);
			// camera.setTarget(followObject.position);
		}

		progressiveTileLoader(scene, camera);
	});
};

const Scene = (props, ref) => {
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
			getHandleUpdateParcelTrackerLineMesh() {
				return updateParcelTrackerLineMesh;
			},
		}),
		[],
	);

	return <BabylonScene antialias onSceneReady={onSceneReady} className={styles.renderCanvas} />;
};

export default forwardRef(Scene);
