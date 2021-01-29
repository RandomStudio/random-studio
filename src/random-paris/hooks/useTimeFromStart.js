import { useEffect, useState } from 'react';
import { PARCEL_START_TIME } from '../utils/CONSTANTS';

const useTimeFromStart = () => {
	const [timeAfterShowStart, setTimeAfterShowStart] = useState(null);

	useEffect(() => {
		let requestId;
		const tick = () => {
			const nowTimestamp = new Date().getTime();
			setTimeAfterShowStart(nowTimestamp - PARCEL_START_TIME.getTime());
			requestId = requestAnimationFrame(tick);
		};

		tick();

		return () => {
			cancelAnimationFrame(requestId);
		};
	}, []);

	return timeAfterShowStart;
};

export default useTimeFromStart;
