import { useEffect } from 'react';

const useRunEveryFrame = (callback) => {
	useEffect(() => {
		let rafId;
		const tick = () => {
			rafId = requestAnimationFrame(tick);
			callback();
		};
		tick();
		return () => cancelAnimationFrame(rafId);
	}, [callback]);
};

export default useRunEveryFrame;
