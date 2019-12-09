import React, { useEffect } from 'react';
import { SceneLoader } from 'babylonjs';
import { GLTFFileLoader } from 'babylonjs-loaders';

const World = ({ filename, layout, onImportWorld, scene }) => {
  useEffect(() => {
    let importedModel;
    const importWorld = async () => {
      SceneLoader.ShowLoadingScreen = false;
      importedModel = await SceneLoader.AppendAsync(filename.path, filename.file, scene);
      const root = scene.meshes.find(mesh => mesh.id === '__root__');
      root.scaling.z = 1;

      if (layout.identifier) {
        const world = scene.meshes.find(mesh => mesh.id === layout.identifier);
        world.position = layout.position;
        world.rotation = layout.rotation;
        world.scaling.z = 1;

        scene.meshes = [world];
        onImportWorld(world);
      } else {
        root.position = layout.position;
        root.rotation = layout.rotation;
        onImportWorld(root);
      }

    };

    if (filename && scene && !scene.isDisposed) {
      importWorld();
    }

    return () => {
      if (importedModel) {
        importedModel.dispose();
      }
    }
  }, [filename, scene]);
  return null;
};

export default World;
