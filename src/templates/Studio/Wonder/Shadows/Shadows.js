import React, { useEffect } from 'react';
import { ShadowGenerator } from 'babylonjs';

const Shadows = ({ scene, sun, world }) => {
  useEffect(() => {
    if (!scene || !sun || !world) {
      return undefined;
    }

    const shadows = new ShadowGenerator(1024, sun);
    shadows.useCloseExponentialShadowMap = true;
    scene.meshes.filter(mesh => !['glass', 'outside'].includes(mesh.id)).forEach(model => {
      shadows.getShadowMap().renderList.push(model);
      shadows.addShadowCaster(model);
      model.receiveShadows = true;
    });

    return () => {
      shadows.dispose();
    };
  }, [scene, sun, world]);

  return null;
};

export default Shadows;
