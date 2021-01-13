import Stats from 'stats.js';

let stats = {
	begin() { },
	end() { },
};

// if (typeof window !== 'undefined') {
// 	stats = new Stats();
// 	stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// 	document.body.appendChild(stats.dom);
// }

export default stats;
