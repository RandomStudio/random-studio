import React, { useEffect } from 'react';
import {
  DirectionalLight,
  Color3,
  ShadowGenerator,
} from 'babylonjs';

const Sun = ({ layout, onAddSun, scene, world }) => {
  useEffect(() => {
    let light;

    const setupLightAnimation = () => {
      const dirAnim = new Animation('directionAnim', 'direction', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      const posAnim = new Animation('positionAnim', 'position', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      dirAnim.setKeys(light.direction);
      posAnim.setKeys(light.position);
      light.animations.push(posAnim);
      light.animations.push(dirAnim);
      scene.beginAnimation(light, 0, 3000, true);
    };

    if (scene && world) {
      light = new DirectionalLight('Sun', layout.direction.centre, scene);
      light.position = layout.position.centre;
      light.intensity = 3;
      light.diffuse = new Color3(0.94, 1, 0.69);
      light.specular = new Color3(0.071, 0.078, 0.055);
      light.shadowEnabled = true;
      const [shadowMinZ, shadowMaxZ] = layout.shadows;
      light.shadowMinZ = shadowMinZ;
      light.shadowMaxZ = shadowMaxZ;

      onAddSun(light);
    }

    return () => {
      if (light) {
        light.dispose();
      }
    };
  }, [scene, world]);

  return null;
};

export default Sun;
