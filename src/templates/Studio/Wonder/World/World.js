import React, { useEffect } from 'react';
import { SceneLoader } from 'babylonjs';
import 'babylonjs-loaders';

const World = ({ filename, layout, onImportWorld, scene }) => {
  useEffect(() => {
    console.log('scene:', scene);
    let importedModel;
    let model;

    const importWorld = async () => {
      SceneLoader.ShowLoadingScreen = false;

      importedModel = await SceneLoader.AppendAsync(
        filename.path,
        filename.file,
        scene

        // 'gltf'
      );

      model = scene.meshes.find(mesh => mesh.id === '__root__');
      model.scaling.z = 1;

      if (layout.identifier) {
        model = scene.meshes.find(mesh => mesh.id === layout.identifier);
        model.position = layout.position;
        model.rotation = layout.rotation;
        model.scaling.z = 1;

        scene.meshes = [model];
      } else {
        model.position = layout.position;
        model.rotation = layout.rotation;
      }
      onImportWorld(model);
    };

    if (filename && scene && !scene.isDisposed) {
      importWorld();
    }

    return () => {
      console.log('model', model);
      console.log('importedModel:', importedModel);
      if (importedModel) {
        importedModel.dispose();
        onImportWorld(null);
      }
    };
  }, [filename, layout, onImportWorld, scene]);
  return null;
};

export default World;
