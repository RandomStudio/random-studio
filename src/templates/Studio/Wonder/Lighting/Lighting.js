import { useEffect } from 'react';
import { HemisphericLight, CubeTexture, Vector3, Color3 } from 'babylonjs';

const Lighting = ({ scene, hdr }) => {
  useEffect(() => {
    if (!scene) {
      return undefined;
    }

    const generalLight = new HemisphericLight(
      'hemi',
      new Vector3(0, 10, -5),
      scene,
    );
    generalLight.specular = new Color3(0, 0, 0);
    generalLight.specularPower = 0;
    generalLight.intensity = 0.4;

    const hdrTexture = new CubeTexture.CreateFromPrefilteredData(
      hdr.url,
      scene,
    );

    hdrTexture.gammaSpace = false;
    scene.environmentTexture = hdrTexture;

    return () => {
      generalLight.dispose();
    };
  }, [hdr.url, scene]);

  return null;
};

export default Lighting;
