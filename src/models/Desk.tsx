import React, { useMemo, useContext, createContext } from 'react';
import { useGLTF, Merged } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Mesh, MeshStandardMaterial } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Desk_Studio007: Mesh;
  };
  materials: {
    ['MDF Gray']: MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>;

const context = createContext({} as ContextType);

export const DeskInstances = ({
  children,
  ...props
}: JSX.IntrinsicElements['group']) => {
  const { nodes } = useGLTF('/models/Desk/Desk.gltf') as GLTFResult;

  const instances = useMemo(
    () => ({
      DeskStudio: nodes.Desk_Studio007,
    }),
    [nodes],
  );

  return (
    <Merged meshes={instances} {...props}>
      {(instances: ContextType) => (
        <context.Provider children={children} value={instances} />
      )}
    </Merged>
  );
};

const Desk = (props: JSX.IntrinsicElements['group']) => {
  const instances = useContext(context);

  return (
    <group {...props} dispose={null}>
      <instances.DeskStudio
        position={[-0.304, 0.357, 0.133]}
        rotation={[0, 1.571, 0]}
      />
    </group>
  );
};

useGLTF.preload('/desk-transformed.glb');
export default Desk;
