// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck Bad shader typing
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, Sphere } from '@react-three/drei';
import { BackSide, Color, Mesh, SphereGeometry, ShaderMaterial } from 'three';
import { RefObject, useRef } from 'react';
import type { SunState } from '../Sky';
import { findStages } from '../../../../utils/skyUtils';

const SkyMaterial = shaderMaterial(
  {
    topColor: new Color(0.2, 0.0, 0.1),
    bottomColor: new Color(0.2, 0.0, 0.1),
    horizon: 0.5,
  },
  `
    varying vec3 vWorldPosition;

    void main() {
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float horizon;
    varying vec3 vWorldPosition;

    void main() {
      // Adjusted to scale the gradient transition across the entire face
      float h = vWorldPosition.y;  // Maps y from -1 to 1 into 0 to 1
      h = smoothstep(0.0, 1.0, h);  // Use smoothstep to smooth the gradient

      gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
    }
`,
);

extend({ SkyMaterial });

type AtmosphereProps = {
  sunStateRef: RefObject<SunState>;
};

const topColorBase = new Color(0.2, 0.0, 0.1);
const bottomColorBase = new Color(0.2, 0.0, 0.1);

const Atmosphere = ({ sunStateRef }: AtmosphereProps) => {
  const skyRef = useRef<Mesh<SphereGeometry, ShaderMaterial>>(null);

  useFrame(() => {
    if (!sunStateRef.current?.elevation || !skyRef.current) {
      return;
    }

    const { azimuth, elevation } = sunStateRef.current;
    const { currentStage, nextStage } = findStages(elevation, azimuth);

    const ratio =
      (elevation - currentStage.elevation) /
      (nextStage.elevation - currentStage.elevation);

    const topColor = topColorBase
      .set(currentStage.topSkyColor)
      .lerp(nextStage.topSkyColor, ratio);

    const bottomColor = bottomColorBase
      .set(currentStage.bottomSkyColor)

      .lerp(nextStage.bottomSkyColor, ratio);

    skyRef.current.material.uniforms.topColor.value = topColor;
    skyRef.current.material.uniforms.bottomColor.value = bottomColor;
  });

  return (
    <Sphere args={[25, 30, 30]} position={[0, 0, 0]} ref={skyRef}>
      <skyMaterial horizon={0} side={BackSide} />
    </Sphere>
  );
};

export default Atmosphere;
