import { useEffect } from 'react';
import { SceneLoader, StandardMaterial, Texture, Color3 } from 'babylonjs';
import 'babylonjs-loaders';

const World = ({ filename, layout, onImportWorld, scene }) => {
  useEffect(() => {
    let importedModel;
    let model;

    const importWorld = async () => {
      SceneLoader.ShowLoadingScreen = false;

      importedModel = await SceneLoader.AppendAsync(
        filename.path,
        filename.file,
        scene,
      );
      const belt = await scene.meshes[1];

      model = scene.meshes.find(mesh => mesh.id === '__root__');

      const material = new StandardMaterial('CustomSTANDARTMaterial', scene);
      belt.material = material;
      // makes belt lighter
      material.emissiveColor = new Color3(1, 1, 1);

      const texture = new Texture('models/sculpture/checkers_big.png');
      material.diffuseTexture = texture;
      belt.material = material;
      // moves the texture, creates illusion of belt moving
      scene.registerBeforeRender(() => {
        texture.uOffset -= 1 / 60;
      });

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
      if (importedModel) {
        importedModel.dispose();
        onImportWorld(null);
      }
    };
  }, [filename, layout, onImportWorld, scene]);
  return null;
};

export default World;
