import React, { useEffect } from 'react';
import { SceneLoader } from 'babylonjs';

const World = ({ filename, layout, onImportWorld, scene }) => {
  useEffect(() => {
    const importWorld = async () => {
      SceneLoader.ShowLoadingScreen = false;
      await SceneLoader.AppendAsync('/models/', filename, scene);
      let world = scene.meshes.find(mesh => mesh.id === '__root__');
      world = {
        ...world,
        position: layout.position,
        rotation: layout.rotation,
        scaling: 1,
      };
      // for island: world.position = new Vector3(0, -20, 100);

      onImportWorld(world);
    };

    if (filename && scene) {
      importWorld();
    }
  }, [filename, scene]);
  return null;
};

export default World;
