import { Color3, Curve3, Path3D, Vector3 } from '@babylonjs/core/Maths/math';
import { Animation, AnimationGroup, Mesh } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { remap } from '@anselan/maprange';

import gpsData from './gpsWithData.json';
import { getNumberAfterDecimal } from './mathUtils';
// import gpsData from './gpsWithDataSmall.json';

// map-tiles
// const xRangeTarget = [0, 16];
// const xRangeWorld = [2.22272, 5.03522];
// const yRangeTarget = [0, 33];
// const yRangeWorld = [48.7622, 52.4415];

// Amsterdam
// Lat Y-axis: 52.370216
// Lon X-axis: 4.895168

// map-tiles-nl
// const xRangeTarget = [0, 6];
// const xRangeWorld = [4.38286, 6.49224];
// const yRangeTarget = [0, 8];
// const yRangeWorld = [50.7056, 52.4531];

const xRangeTarget = [0, 16];
// const xRangeTarget = [0, 15.125];
const xRangeWorld = [1.66654, 7.29154];
const yRangeTarget = [0, 20];
// const yRangeTarget = [-20, 0];
// const yRangeTarget = [0, 19.475];
const yRangeWorld = [48.2317, 52.7028];

// Extra is for debugging - higher number speeds things up
// Not 1:1 accurate but roughly 3600 frames is one minute
// Needs testing ofc
// Default 60
const FRAME_RATE = 60;
const FRAME_RATE_EXTRA = 60;

// Because y goes from bottom to top instead of top to bottom
const handleReverseCoordinate = (coord) => {
	const numAfterDecimal = 1 - getNumberAfterDecimal(coord);
	// console.log(numAfterDecimal);

	const fullDigit = Math.floor(coord) + numAfterDecimal;

	const diff = Math.abs(coord - fullDigit);

	// return coord - diff;
	return coord;
	// return 0;
};

const createParcelLine = (scene, camera, followMesh, zoomLevel = 0.1) => {
	const trackerLine = gpsData.map(
		// ({ lat, lng }) => new Vector3(remap(lng, xRangeWorld, xRangeTarget), remap(lat, yRangeWorld, yRangeTarget), 0),
		({ lat, lng }) =>
			new Vector3(
				// 0,
				remap(lng, xRangeWorld, xRangeTarget),
				// 0,
				handleReverseCoordinate(remap(lat, yRangeWorld, yRangeTarget)),
				0,
			),
	);

	console.log(trackerLine.map((v) => v._y));
	console.log(trackerLine.map((v) => handleReverseCoordinate(v._y)));

	// Would it be more accurate if i used 2.55614 (5 behind decimal)
	// const testX = remap(4.881, xRangeWorld, xRangeTarget);
	// const testY = remap(52.388, yRangeWorld, yRangeTarget);
	// const testX = remap(2.556, xRangeWorld, xRangeTarget);
	// const testY = remap(49.118, yRangeWorld, yRangeTarget);

	// const testX = remap(1.66654, xRangeWorld, xRangeTarget);
	// const testY = remap(48.2317, yRangeWorld, yRangeTarget);
	// const testX = remap(7.29154, xRangeWorld, xRangeTarget);
	// const testY = remap(52.7028, yRangeWorld, yRangeTarget);

	// const testX = remap(7.29154, xRangeWorld, xRangeWorld);
	// const testY = remap(52.7028, yRangeWorld, yRangeWorld);
	const testX = remap(4.881, xRangeWorld, xRangeWorld);
	const testY = remap(52.388, yRangeWorld, yRangeWorld);

	// const trackerLine = [...new Array(10)].map(() => new Vector3(testX, testY, 0));

	// console.log(testX, testY);
	console.log(gpsData[0], trackerLine[0], testX, testY);

	const catmullRom = Curve3.CreateCatmullRomSpline(trackerLine, 60);

	const catmullRomSpline = Mesh.CreateLines('catmullRom', catmullRom.getPoints(), scene);
	// catmullRomSpline.isVisible = false;
	// catmullRomSpline.color = new Color3(1, 0, 0);
	// catmullRomSpline.color = new Color3(1, 0.611, 0.254); // Dutch Orange - 225 156 65
	catmullRomSpline.color = new Color3(0.976, 0.572, 0.27); // Royal Orange - 249 146 69
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

	return animationGroup;
};

export default createParcelLine;
