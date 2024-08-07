import {
  Material,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from 'three';

export const convertMaterial = (
  currentMaterial: Material,
  TargetMaterial:
    | typeof MeshBasicMaterial
    | typeof MeshStandardMaterial
    | typeof MeshLambertMaterial
    | typeof MeshPhongMaterial
    | typeof MeshPhysicalMaterial
    | typeof MeshNormalMaterial,
) => {
  const dummyTargetMaterial = new TargetMaterial();
  const currentMaterialProps = Object.keys(currentMaterial);

  // Copy over the properties that exist on both materials
  const basicMaterialProps = Object.fromEntries(
    currentMaterialProps
      .map(prop => {
        if (prop in dummyTargetMaterial) {
          return [prop, currentMaterial[prop as keyof typeof currentMaterial]];
        }

        return null;
      })
      .filter(value => value !== null),
  );

  return new TargetMaterial(basicMaterialProps);
};

export default convertMaterial;
