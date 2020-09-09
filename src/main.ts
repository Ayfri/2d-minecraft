import * as PIXI from 'pixi.js';
import Game from './Game';

// app
export const app = new PIXI.Application({
	antialias: true,
	backgroundColor: 0x000000,
	resolution: devicePixelRatio,
});

// Game
export const game: Game = new Game(app);
app.stage.sortableChildren = true;
game.preInit();
game.init();

game.eventHandler.once('launch', () => {
	game.postInit();
	console.log('Game launched.');
});

// Events
app.ticker.add(() => {
	if (game.loaded) {
		game.update();
		app.stage.sortChildren();
	}
});

function resize(app: PIXI.Application) {
	return function () {
		const vpw = window.innerWidth;
		const vph = window.innerHeight;
		let nvw;
		let nvh;

		const height: number = window.innerHeight;
		const width: number = window.innerWidth;
		if (vph / vpw < height / width) {
			nvh = vph;
			nvw = (nvh * width) / height;
		} else {
			nvw = vpw;
			nvh = (nvw * height) / width;
		}

		app.renderer.resize(nvw, nvh);

		const wid: number = window.innerWidth;
		const hei: number = window.innerHeight;
		app.stage.scale.set(nvw / wid, nvh / hei);
	};
}

resize(app)();
window.addEventListener('resize', resize(app));

// Global objects
Object.defineProperties(window, {
	app: {
		value: app,
	},
	blocks: {
		value: game.gameData.blocks,
	},
	game: {
		value: game,
	},
	PIXI: {
		value: PIXI,
	},
	world: {
		value: game.world,
	},
});
