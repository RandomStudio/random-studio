import React, { useEffect } from 'react';
import { Vector3 } from 'babylonjs';

const MouseAnimation = ({ layout, target }) => {
  useEffect(() => {
    if (!target) {
      return undefined;
    }

    const { rotation } = layout;

    const onMouseMove = e => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthPercentage = ((e.pageX - (width / 2)) / width) * 2;
      const heightPercentage = ((e.pageY - (height / 2)) / height) * 2;

      target.rotation = new Vector3(rotation.x + (heightPercentage * -0.1), rotation.y + (widthPercentage * -0.2), rotation.z)
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [layout, target]);

  return null;
};

export default MouseAnimation;
