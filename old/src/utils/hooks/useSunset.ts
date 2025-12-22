import { useEffect, useState } from 'react';

type SunriseSunsetResponse = {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
};

const getSunriseSunsetTimes = async () => {
  const response = await fetch(
    'https://api.sunrise-sunset.org/json?lat=52.3676&lng=4.90414&date=today&formatted=0',
  );

  const { sunrise, sunset } = ((await response.json()) as SunriseSunsetResponse)
    .results;

  return [new Date(sunrise), new Date(sunset)];
};

const useSunset = () => {
  const [isAfterDark, setIsAfterDark] = useState(false);

  useEffect(() => {
    const now = new Date(Date.now());
    let timer: number;

    getSunriseSunsetTimes()
      .then(([sunrise, sunset]) => {
        const isNight = sunset > now;
        setIsAfterDark(isNight);

        timer = window.setTimeout(
          () => setIsAfterDark(value => !value),
          (isNight ? sunrise : sunset).getTime() - now.getTime(),
        );
      })
      .catch(() => {
        console.warn('Could not fetch sunrise/sunset times');
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isAfterDark;
};

export default useSunset;
