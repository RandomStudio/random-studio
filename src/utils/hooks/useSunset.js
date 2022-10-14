import { useEffect, useState } from 'react';

const getSunriseSunsetTimes = async () => {
  const response = await fetch(
    'https://api.sunrise-sunset.org/json?lat=52.3676&lng=4.90414&date=today&formatted=0',
  );

  const { sunrise, sunset } = (await response.json()).results;

  return [new Date(sunrise), new Date(sunset)];
};

const useSunset = () => {
  const [isAfterDark, setIsAfterDark] = useState(false);

  useEffect(() => {
    const now = new Date(Date.now());
    let timer;

    getSunriseSunsetTimes().then(([sunrise, sunset]) => {
      const isNight = sunset > now;
      setIsAfterDark(isNight);

      timer = setTimeout(
        () => setIsAfterDark(value => !value),
        (isNight ? sunrise : sunset) - now,
      );
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isAfterDark;
};

export default useSunset;
