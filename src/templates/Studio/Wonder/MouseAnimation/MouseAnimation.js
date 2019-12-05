import React, { useEffect } from 'react';
import { Vector3 } from 'babylonjs';

const MouseAnimation = ({ target }) => {
  useEffect(() => {
    const onMouseMove = e => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const widthPercentage = (e.pageX - (width / 2)) / width;
      const heightPercentage = (e.pageY - (height / 2)) / height;
      target.rotation = new Vector3(heightPercentage * -0.1, widthPercentage * -0.4, 0);
      console.log(target.rotation)
    };

    if (target) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [target]);

  return null;
}

export default MouseAnimation;
