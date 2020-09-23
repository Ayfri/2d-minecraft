import * as PIXI from 'pixi.js';

import('@pixi/unsafe-eval')
	.then(({ filter }) => filter(PIXI))
	.catch((e) => {
		console.log(e.stack);
	});

export default PIXI;
