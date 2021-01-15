import styles from './TakeOverHeader.module.scss';

import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Main from '../Main/Main';
import useTimeFromStart from '../../hooks/useTimeTillStart';

import gpsData from '../../utils/gpsWithData.json';

const TakeOverHeader = () => {
	const timeAfterStart = useTimeFromStart();

	// Total duration in seconds of the whole journey
	const totalDuration = useMemo(() => gpsData.length * 60, []);

	const [sceneHasMounted, setSceneHasMounted] = useState(false);

	const handleSetSceneHasMounted = useCallback(
		(bool) => {
			setSceneHasMounted(bool);
		},
		[setSceneHasMounted],
	);

	if (timeAfterStart === null) {
		return null;
	}

	// const isBeforeLive = timeAfterStart < 0;
	const isDuringLive = timeAfterStart >= 0 && timeAfterStart < totalDuration * 1000;
	const isPastLive = timeAfterStart > totalDuration * 1000;

	// const loaderClasses = classnames(styles.loader, {
	// 	[styles.hasLoaded]: sceneHasMounted,
	// });

	return (
		<>
			<Main
				isPastLive={isPastLive}
				isLive={isDuringLive}
				totalDuration={totalDuration}
				handleSetSceneHasMounted={handleSetSceneHasMounted}
			/>
			{/* <div className={loaderClasses}>
				<img
					src={`https://i2.wp.com/boingboing.net/
				wp-content/uploads/2015/10/P1Chi6u1.gif?w=970`}
				/>
			</div> */}
		</>
	);
};

TakeOverHeader.propTypes = {};
TakeOverHeader.defaultProps = {};

export default TakeOverHeader;
