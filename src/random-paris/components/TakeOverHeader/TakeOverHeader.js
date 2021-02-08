import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Main from '../Main/Main';
import useTimeFromStart from '../../hooks/useTimeFromStart';

import gpsData from '../../utils/gpsWithData.json';

const TakeOverHeader = () => {
  const timeAfterStart = useTimeFromStart();

  // Total duration in seconds of the whole journey
  const totalDuration = useMemo(() => gpsData.length * 60, []);

  if (timeAfterStart === null) {
    return null;
  }

  const isBeforeLive = timeAfterStart < 0;
  const isDuringLive = timeAfterStart >= 0 && timeAfterStart < totalDuration * 1000;
  const isPastLive = timeAfterStart > totalDuration * 1000;

  return <Main isBeforeLive={isBeforeLive} isLive={isDuringLive} isPastLive={isPastLive} totalDuration={totalDuration} />;
};

TakeOverHeader.propTypes = {};
TakeOverHeader.defaultProps = {};

export default TakeOverHeader;
