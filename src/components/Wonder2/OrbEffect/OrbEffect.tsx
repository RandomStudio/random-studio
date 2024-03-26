import React, { forwardRef, useMemo } from 'react';
import { Effect, ShaderPass } from 'postprocessing';
import { ShaderMaterial, Uniform, Vector2 } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const fragmentShader = `
  precision highp float;

  uniform sampler2D tDiffuse; // Input texture from the previous pass
  uniform float warpStrength; // Adjustable strength of the spherical effect, ranges from 0.0 to 1.0

  // Function to adjust the spherical effect based on the aspect ratio
  vec2 adjustForAspectRatio(vec2 uv, float aspectRatio) {
      if (aspectRatio > 1.0) {
          uv.x *= aspectRatio;
      } else {
          uv.y /= aspectRatio;
      }
      return uv;
  }

  // Converts cartesian to polar coordinates
  vec2 cartesianToPolar(vec2 coord) {
      float radius = length(coord);
      float angle = atan(coord.y, coord.x);
      return vec2(radius, angle);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Calculate normalized coordinates (from -1 to 1)
    vec2 adjustedUv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    float aspectRatio = resolution.x / resolution.y;

    // Adjust UVs based on aspect ratio
    adjustedUv.x *= aspectRatio;

    // Sphere radius and centering adjustments
    float radius = 2.0; // Sphere fits within the canvas
    vec2 center = vec2(0.0, 0.0); // Center at origin

    // Calculate distance from the center
    float distance = length(adjustedUv - center);

    // Warp effect: Calculate new UVs based on distance and warpStrength
    if (distance < radius) {
        float effect = 1.0 - distance / radius;
        effect = pow(effect,  warpStrength); // Exaggerate effect based on strength

        // Adjust UVs towards the center for stronger warping effect
        adjustedUv = mix(adjustedUv, center, effect);
    }

    // Re-normalize to [0, 1] range
    adjustedUv = adjustedUv / aspectRatio / 10.0 + 0.5;

    // Ensure UVs are within bounds
    adjustedUv = clamp(adjustedUv, 0.0, 10.0);

    // Sample the texture
    outputColor = texture2D(tDiffuse, adjustedUv);

  }`;

// Effect implementation
class OrbEffectImpl extends Effect {
  constructor() {
    super('MyCustomEffect', fragmentShader, {
      uniforms: new Map([['warpStrength', new Uniform(3.0)]]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    //  this.uniforms.get('param').value = _uParam;
  }
}

// Effect component
export const OrbEffect = forwardRef(({ param }, ref) => {
  const effect = useMemo(() => new OrbEffectImpl(), []);

  return <primitive dispose={null} object={effect} ref={ref} />;
});

OrbEffect.displayName = 'OrbEffect';
export default OrbEffect;
