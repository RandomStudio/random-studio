import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { DynamicTexture, StandardMaterial } from '@babylonjs/core';

const IMAGE_CANVAS = 1024;
//const URL_PREFIX = 'map-tiles';
const URL_PREFIX = 'https://d319unozazpg6l.cloudfront.net/map-tiles-1k';

// tiles which have been added
const addedMapParts = [];

// Load in images -> Object
const mapImages = ((ctx) => {
	const keys = ctx.keys();

	return keys
		.map((key) => key.replace('./', ''))
		.map((imageURL) => ({
			url: imageURL,
			x: Number(imageURL.match(new RegExp('_x' + '(.*)' + '_y'))[1]),
			y: Number(imageURL.match(new RegExp('_y' + '(.*)' + '.jpg'))[1]),
		}));
})(require.context('../map-tiles-1k', true, /.*/));

// Add images on grid
const addImageOnPoint = (scene, point, imageURL, size, flip = false) => {
	const imagePlane = MeshBuilder.CreatePlane(
		imageURL,
		{
			size,
		},
		scene,
	);

	imagePlane.position = point;

	if (flip) {
		imagePlane.rotate(new Vector3(0, 1, 0), (180 * Math.PI) / 180);
	}

	const texture = new DynamicTexture('texture', IMAGE_CANVAS, scene);

	const textureContext = texture.getContext();
	texture.hasAlpha = true;

	imagePlane.material = new StandardMaterial('imagePlaneMaterial', scene);

	imagePlane.material.opacityTexture = texture;
	imagePlane.material.emissiveTexture = texture;
	imagePlane.material.disableLighting = true;

	const projectImage = new Image();
	projectImage.crossOrigin = 'anonymous';
	projectImage.src = imageURL;

	projectImage.onload = () => {
		const aspectRatio = projectImage.width / projectImage.height;
		const sidesMargin = IMAGE_CANVAS - IMAGE_CANVAS * aspectRatio;

		textureContext.drawImage(projectImage, sidesMargin / 2, 0, IMAGE_CANVAS - sidesMargin, IMAGE_CANVAS);

		texture.update();
	};

	return imagePlane;
};

// Check and load tiles when intersecting with camera and missing
const progressiveTileLoader = (scene, camera) => {
	const camX = Math.round(camera.position.x);
	const camY = Math.round(camera.position.y);

	const shouldLoadXY = [
		[camX, camY],
		[camX - 1, camY],
		[camX + 1, camY],
		[camX - 1, camY - 1],
		[camX + 1, camY + 1],
		[camX + 1, camY - 1],
		[camX - 1, camY + 1],
		[camX, camY - 1],
		[camX, camY + 1],
	];

	const toLoadImages = shouldLoadXY.filter(
		(toAddXY) => !addedMapParts.find((addedXY) => addedXY[0] === toAddXY[0] && addedXY[1] === toAddXY[1]),
	);

	if (toLoadImages.length > 0) {
		toLoadImages.forEach((toAddXY) => {
			addedMapParts.push(toAddXY);
			const image = mapImages.find((image) => image.x === toAddXY[0] && image.y === toAddXY[1]);

			if (!image) {
				return;
			}

			const position = new Vector3(toAddXY[0] + 0.5, toAddXY[1] + 0.68, 0);
			addImageOnPoint(scene, position, `${URL_PREFIX}/${image.url}`, 1);
		});
	}
};

export const loadAllTiles = (scene) => {
	mapImages.forEach(({ x, y, url }) => {
		const position = new Vector3(x, y, 0);
		addImageOnPoint(scene, position, `${URL_PREFIX}/${url}`, 1);
	});
};

export default progressiveTileLoader;
