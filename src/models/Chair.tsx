import { Group, Mesh, MeshStandardMaterial } from 'three';
import React, { ForwardedRef, forwardRef } from 'react';
import { animated } from '@react-spring/three';
import { GLTF } from 'three-stdlib';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
  nodes: {
    Cube032: Mesh;
    ['Metal_H-Beam001']: Mesh;
    Desk_Studio007: Mesh;
    HMI_Aeron_Chair_B_Size_Fully_Adjustable_Arms029: Mesh;
    Runway_Wood005: Mesh;
    Plant_pots: Mesh;
    ID549002: Mesh;
    ID549002_1: Mesh;
    GILLIS250: Mesh;
  };
  materials: {
    ['default']: MeshStandardMaterial;
    Gray: MeshStandardMaterial;
    ['MDF Gray']: MeshStandardMaterial;
    SEAT_FABRIC: MeshStandardMaterial;
    ['Wood Fine Veneer Oak']: MeshStandardMaterial;
    ['Plaster Lime']: MeshStandardMaterial;
    ['Aluminium Brushed']: MeshStandardMaterial;
    ['Cork Surface']: MeshStandardMaterial;
  };
};

const Chair = forwardRef(
  (props: JSX.IntrinsicElements['group'], ref: ForwardedRef<Group>) => {
    const { nodes, materials } = useGLTF(
      '/models/Mainspace/mainspace.gltf',
    ) as GLTFResult;

    return (
      <animated.group {...props} dispose={null} ref={ref}>
        <mesh
          geometry={
            nodes.HMI_Aeron_Chair_B_Size_Fully_Adjustable_Arms029.geometry
          }
          material={materials.SEAT_FABRIC}
          position={[0, -0.7, 0]}
          rotation={[Math.PI / 2, 0, -1.082]}
          scale={0.025}
        />
      </animated.group>
    );
  },
);

Chair.displayName = 'Chair';

useGLTF.preload('/models/Mainspace/mainspace.gltf');
export default Chair;
