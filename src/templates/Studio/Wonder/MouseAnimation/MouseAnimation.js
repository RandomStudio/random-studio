import React, { useEffect } from 'react';
import { throttle } from 'lodash';
import { Vector3 } from 'babylonjs';

const MouseAnimation = ({ layout, target }) => {
  useEffect(() => {
    const { rotation } = layout;

    const onMouseMove = e => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthPercentage = ((e.pageX - (width / 2)) / width) * 2;
      const heightPercentage = ((e.pageY - (height / 2)) / height) * 2;

      target.rotation = new Vector3(rotation.x + (heightPercentage * -0.1), rotation.y + (widthPercentage * -0.2), rotation.z)
    };

    const handleDeviceRotation = throttle((e) => {
      const { alpha, beta, gamma } = e;
      const offset = [240, 45, 0];
      const [a, b, g] = [alpha, beta, gamma].map((val, i) => (val - offset[i]) / 180);

      target.rotation = new Vector3(b * -1, g, a);
    }, 16);

    if (target) {
      // if (window.DeviceOrientationEvent) {
      //   window.addEventListener('deviceorientation', handleDeviceRotation);
      // }
      document.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      // window.removeEventListener('deviceorientation', handleDeviceRotation);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [target]);

  return null;
};

export default MouseAnimation;
