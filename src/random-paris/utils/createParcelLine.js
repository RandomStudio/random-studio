import { Color3, Color4, Curve3, Path3D, Vector3 } from '@babylonjs/core/Maths/math';
import { Animation, AnimationGroup, Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { remap } from '@anselan/maprange';

import gpsData from './gpsWithData.json';

const xRangeTarget = [0, 16];
const xRangeWorld = [1.66654, 7.29154];
const yRangeTarget = [0, 20];
const yRangeWorld = [48.2317, 52.7028];

// Extra is for debugging - higher number speeds things up
// Not 1:1 accurate but roughly 3600 frames is one minute
// Needs testing ofc
// Default 60
const FRAME_RATE = 60;
const FRAME_RATE_EXTRA = 60;

const createParcelLine = (scene, camera, followMesh, zoomLevel = 0.1) => {
	const trackerLine = gpsData.map(
		({ lat, lng }) => new Vector3(remap(lng, xRangeWorld, xRangeTarget), remap(lat, yRangeWorld, yRangeTarget), 0),
	);

	// const testX = remap(4.881, xRangeWorld, xRangeWorld);
	// const testY = remap(52.388, yRangeWorld, yRangeWorld);

	// console.log(gpsData[0], trackerLine[0], testX, testY);

	const catmullRom = Curve3.CreateCatmullRomSpline(trackerLine, 60);
	const splinePoints = catmullRom.getPoints();

	const catmullRomSpline = Mesh.CreateLines('catmullRom', splinePoints, scene);

	// catmullRomSpline.color = new Color3(1, 0.611, 0.254); // Dutch Orange - 225 156 65
	// catmullRomSpline.color = new Color3(0.976, 0.572, 0.27); // Royal Orange - 249 146 69
	catmullRomSpline.color = new Color3(1, 0, 0); // Royal Orange - 249 146 69
	catmullRomSpline.enableEdgesRendering();
	catmullRomSpline.edgesWidth = 0.5;
	// catmullRomSpline.edgesColor = new Color4(0.976, 0.572, 0.27, 1);
	catmullRomSpline.edgesColor = new Color4(1, 0, 0, 1);
	catmullRomSpline.renderingGroupId = 2;

	// Create Path3D from array of points
	let path3d = new Path3D(catmullRom.getPoints());
	let curve = path3d.getCurve(); // create the curve
	let tangents = path3d.getTangents(); //array of tangents to the curve
	let normals = path3d.getNormals(); //array of normals to the curve
	let binormals = path3d.getBinormals(); //array of binormals to curve

	//Create and draw a plane in xy plane to trace the curve at (0, 0, 0)
	let norm = new Vector3(0, 0, 1); // normal to plane
	let pos_of_norm = new Vector3(0, 0, 0); // position of normal (for display)

	// Draw the normal line in yellow
	let normLine = Mesh.CreateLines('normLine', [pos_of_norm, pos_of_norm.add(norm).scale(0.1)], scene);
	normLine.color = Color3.Yellow();
	// //Set box as parent of normal line so they move and turn as one
	normLine.parent = followMesh;
	followMesh.isVisible = false;

	//
	const animPosCam = new Animation('animPosCam', 'position', FRAME_RATE_EXTRA, Animation.ANIMATIONTYPE_VECTOR3);
	let animPos = new Animation('animPos', 'position', FRAME_RATE_EXTRA, Animation.ANIMATIONTYPE_VECTOR3);
	let animRot = new Animation('animRot', 'rotation', FRAME_RATE_EXTRA, Animation.ANIMATIONTYPE_VECTOR3);

	const keysPositionCamera = [];
	const keysPosition = [];
	const keysRotation = [];

	for (let p = 0; p < catmullRom.getPoints().length; p++) {
		const { x, y } = catmullRom.getPoints()[p];

		keysPositionCamera.push({
			frame: p * FRAME_RATE,
			value: new Vector3(x, y, -zoomLevel), // How 'zoomed in' we are
		});

		keysPosition.push({
			frame: p * FRAME_RATE,
			value: catmullRom.getPoints()[p],
		});

		keysRotation.push({
			frame: p * FRAME_RATE,
			value: Vector3.RotationFromAxis(normals[p], binormals[p], tangents[p]),
		});
	}

	animPosCam.setKeys(keysPositionCamera);
	animPos.setKeys(keysPosition);
	animRot.setKeys(keysRotation);

	// Create the animation group
	let animationGroup = new AnimationGroup('Group');
	animationGroup.addTargetedAnimation(animPosCam, camera);
	animationGroup.addTargetedAnimation(animPos, followMesh);
	animationGroup.addTargetedAnimation(animRot, followMesh);

	// animationGroup.play(false);
	// animationGroup.goToFrame(framenum); // To sync
	console.log(`
		Ready animation group \n
		Total Frames: ${animationGroup._to}
		Coords Length/Minutes: ${gpsData.length} 
	`);

	return {
		animationGroup,
		trackerLine: splinePoints,
		updateLiveTrackerLine: (line, points) => {
			// const updatedLine = Mesh.CreateLines('liveTrackerLine', points, scene, true, line);
			const updatedLine = Mesh.CreateLines(null, points, null, true, line);

			return updatedLine;
		},
		createLiveTrackerLine: (startPoints) => {
			const liveTrackerLine = Mesh.CreateLines('liveTrackerLine', startPoints, scene, true);

			// liveTrackerLine.color = new Color3(1, 0.611, 0.254); // Dutch Orange - 225 156 65
			// liveTrackerLine.color = new Color3(0.976, 0.572, 0.27); // Royal Orange - 249 146 69
			liveTrackerLine.color = new Color3(0, 0, 1); // Royal Orange - 249 146 69
			liveTrackerLine.enableEdgesRendering();
			liveTrackerLine.edgesWidth = 0.5;
			// liveTrackerLine.edgesColor = new Color4(0.976, 0.572, 0.27, 1);
			liveTrackerLine.edgesColor = new Color4(0, 0, 1, 1);
			liveTrackerLine.renderingGroupId = 3;

			return liveTrackerLine;
		},
	};
};

export default createParcelLine;
