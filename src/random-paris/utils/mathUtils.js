export const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

export const getNumberAfterDecimal = (number, toFixed = false) => {
	if (toFixed) {
		return (number % 1).toFixed(toFixed);
	}
	return number % 1;
};
