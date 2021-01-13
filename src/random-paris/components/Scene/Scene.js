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

const onSceneReady = async (scene) => {
	// This creates and positions a free camera (non-mesh)
	camera = new FreeCamera('camera1', new Vector3(0, 0, 0), scene);

	camera.speed = 0.1;
	camera.minZ = 0.001;
	// SceneLoader.ShowLoadingScreen = false;

	// const canvas = scene.getEngine().getRenderingCanvas();

	// // This attaches the camera to the canvas
	// camera.attachControl(canvas, true);

	// // // WASD keys
	// camera.keysUp.push(87);
	// camera.keysDown.push(83);
	// camera.keysLeft.push(65);
	// camera.keysRight.push(68);
	// camera.keysDownward.push(81); // Q
	// camera.keysUpward.push(69); // E

	const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

	// The focus/follow for the camera
	const followObject = MeshBuilder.CreateBox('box', { size: 0.05 }, scene);

	const animParcel = createParcelLine(scene, camera, followObject, 1);
	parcelAnimGroup = animParcel;

	// loadAllTiles();

	// runs every frame
	scene.registerBeforeRender(() => {
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
		}),
		[],
	);

	return <BabylonScene antialias onSceneReady={onSceneReady} className={styles.renderCanvas} />;
};

export default forwardRef(Scene);
