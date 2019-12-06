import React, { useEffect } from 'react';
import {
  SpotLight,
  HemisphericLight,
  Vector3,
  Color3,
  ShadowGenerator,
} from 'babylonjs';

const Shadows = ({ scene, sun, world }) => {
  useEffect(() => {
    let shadows;
    if (scene && sun && world) {
      shadows = new ShadowGenerator(1024, sun);
      shadows.useCloseExponentialShadowMap = true;
      scene.meshes.filter(mesh => mesh.id !== 'glass').forEach(model => {
        shadows.getShadowMap().renderList.push(model);
        shadows.addShadowCaster(model);
        model.receiveShadows = true;
      });
    }

    return () => {
      if (shadows) {
        shadows.dispose();
      }
    };
  }, [scene, sun, world]);

  return null;
};

export default Shadows;
