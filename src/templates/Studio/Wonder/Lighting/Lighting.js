import React, { useEffect } from 'react';
import {
  SpotLight,
  HemisphericLight,
  Vector3,
  Color3,
  ShadowGenerator,
} from 'babylonjs';

const Lighting = ({ layout, scene }) => {
  useEffect(() => {
    let light;

    const addLighting = () => {
      light = new SpotLight('Sun', layout.position[0].value, layout.direction[0].value, 1, 32, scene);
      light.intensity = 16;
      light.diffuse = new Color3(0.94, 1, 0.69);
      light.specular = new Color3(0.071, 0.078, 0.055);
      light.shadowEnabled = true;
      light.shadowMinZ = 6;
      light.shadowMaxZ = 17;
      const generalLight = new HemisphericLight('hemi', new Vector3(0, 10, -5), scene);
      generalLight.specular = new Color3(0, 0, 0);
      generalLight.specularPower = 0;
      generalLight.intensity = 0.7;
      return light;
    };

    const addShadows = () => {
      const shadows = new ShadowGenerator(1024, light);
      shadows.useExponentialShadowMap = true;
      shadows.useCloseExponentialShadowMap = true;
      scene.meshes.filter(mesh => mesh.id !== 'glass').map(model => {
        shadows.getShadowMap().renderList.push(model);
        shadows.addShadowCaster(model);
        return {
          ...model,
          receiveShadows: true,
        };
      });
    };

    const setupLightAnimation = () => {
      const dirAnim = new Animation('directionAnim', 'direction', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      const posAnim = new Animation('positionAnim', 'position', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      dirAnim.setKeys(light.direction);
      posAnim.setKeys(light.position);
      light.animations.push(posAnim);
      light.animations.push(dirAnim);
      scene.beginAnimation(light, 0, 3000, true);
    };

    if (scene) {
      addLighting();
      addShadows();
    }
  }, [scene]);

  return null;
}

Lighting.propTypes = {
};

Lighting.defaultProps = {
};

export default Lighting;
