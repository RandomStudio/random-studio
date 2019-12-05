import React, { useEffect } from 'react';
import { Vector3, Plane, StandardMaterial, MirrorTexture, MeshBuilder, Color3 } from 'babylonjs';

const Mirrors = ({ layout, scene, world }) => {
  useEffect(() => {
    const addMirrors = () => {
      layout.forEach(mirrorLayout => {
        //const mirror = MeshBuilder.CreatePlane('glass', {
        //  width: mirrorLayout.width,
        //  height: mirrorLayout.height,
        //}, scene);
        //mirror.parent = world;
        //mirror.position = mirrorLayout.position;
        //mirror.rotation = mirrorLayout.rotation;
        //mirror.computeWorldMatrix(true);

        //const mirrorWorldMatrix = mirror.getWorldMatrix();
        //const [vertex0, vertex1, vertex2] = mirror.getVerticesData('normal');
        //let mirrorNormal = new Vector3(vertex0, vertex1, vertex2);
        //mirrorNormal = new Vector3.TransformNormal(mirrorNormal, mirrorWorldMatrix);
//
        //const reflector = new Plane.FromPositionAndNormal(mirror.position, mirrorNormal.scale(-1));
        //const mirrorMaterial = new StandardMaterial('MirrorMat', scene);
        //mirrorMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
        //mirrorMaterial.reflectionTexture = new MirrorTexture('mirror', 1024, scene, true);
        //mirrorMaterial.reflectionTexture.mirrorPlane = reflector;
        //mirrorMaterial.reflectionTexture.renderList = [world];
        //mirror.material = mirrorMaterial;
      });
    };

    if (scene && world) {
      addMirrors();
    }
  }, []);
  return null;
}

export default Mirrors;
