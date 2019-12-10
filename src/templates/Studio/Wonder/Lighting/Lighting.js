import React, { useEffect } from 'react';
import {
  HemisphericLight,
  Vector3,
  Color3,
} from 'babylonjs';

const Lighting = ({ scene }) => {
  useEffect(() => {
    if (scene) {
      return null;
    }

    const generalLight = new HemisphericLight('hemi', new Vector3(0, 10, -5), scene);
    generalLight.specular = new Color3(0, 0, 0);
    generalLight.specularPower = 0;
    generalLight.intensity = 0.4;

    return () => {
      generalLight.dispose();
    };
  }, [scene]);

  return null;
};

export default Lighting;
