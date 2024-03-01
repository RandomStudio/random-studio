import React, { useEffect } from 'react';
import { ShadowGenerator } from 'babylonjs';

const Shadows = ({ scene, sun, world }) => {
  useEffect(() => {
    if (!scene || !sun || !world) {
      return undefined;
    }

    const shadows = new ShadowGenerator(1024, sun);
    shadows.useCloseExponentialShadowMap = true;
    scene.meshes.forEach(model => {
      shadows.getShadowMap().renderList.push(model);
      shadows.addShadowCaster(model);
      model.receiveShadows = true;
      shadows.useContactHardeningShadow = true;
      shadows.contactHardeningLightSizeUVRatio = 0.05;
      shadows.setDarkness(0.5);
    });

    return () => {
      shadows.dispose();
    };
  }, [scene, sun, world]);

  return null;
};

export default Shadows;
