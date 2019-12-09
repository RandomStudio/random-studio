import React, { useEffect } from 'react';
import {
  Animation,
  DirectionalLight,
  Color3,
} from 'babylonjs';

const Sun = ({ layout, onAddSun, scene, world }) => {
  useEffect(() => {
    let interval;
    let light;
    let prevProgress = 0;

    const getMinutesSinceMidnight = (timestamp = Date.now()) => {
      const date = new Date(timestamp);
      const utcDate = date.getTime() + (date.getTimezoneOffset() * 60000);
      const amsterdamDate = new Date(utcDate + (3600000 * 1));
      return amsterdamDate.getMinutes() + (amsterdamDate.getHours() * 60);
    };

    const getCurrentSunProperties = async () => {
      let sunrise;
      let sunset;

      try {
        const response = await fetch('https://api.sunrise-sunset.org/json?lng=4.881437&lat=52.388408&formatted=0');
        const data = await response.json();
        sunrise = data.results.sunrise;
        sunset = data.results.sunset;
      } catch (error) {
        console.log(error);
        sunrise = '2019-12-06T07:00:00+00:00';
        sunset = '2019-12-06T19:00:00+00:00';
      }

      sunrise = getMinutesSinceMidnight(sunrise);
      sunset = getMinutesSinceMidnight(sunset);
      const currentTime = getMinutesSinceMidnight();

      const rawProgress = ((currentTime - sunrise) / (sunrise - sunset)) * 100;
      const progress = Math.min(Math.max(Math.abs(rawProgress), 0), 100);
      return progress;
    }

    const animateToCurrentTimeOfDay = async () => {
      const progress = await getCurrentSunProperties();
      const dirAnim = new Animation('directionAnim', 'direction', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      const colorAnim = new Animation('colorAnim', 'diffuse', 30, Animation.ANIMATIONTYPE_COLOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      dirAnim.setKeys(layout.direction);
      colorAnim.setKeys(layout.color);
      light.animations.push(dirAnim);
      light.animations.push(colorAnim);
      scene.beginAnimation(light, prevProgress, progress, false);
      prevProgress = progress;
    };

    if (scene && world) {
      light = new DirectionalLight('Sun', layout.direction[0].value, scene);
      light.position = layout.position;
      light.intensity = 3;
      light.diffuse = layout.color[0].value;
      light.specular = new Color3(0.071, 0.078, 0.055);
      light.shadowEnabled = true;
      const [shadowMinZ, shadowMaxZ] = layout.shadows;
      light.shadowMinZ = shadowMinZ;
      light.shadowMaxZ = shadowMaxZ;

      onAddSun(light);
      animateToCurrentTimeOfDay();
      interval = window.setInterval(animateToCurrentTimeOfDay, 60000);
    }

    return () => {
      if (light) {
        light.dispose();
      }
      window.clearInterval(interval);
    };
  }, [scene, world]);

  return null;
};

export default Sun;
