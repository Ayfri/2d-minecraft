import * as PIXI from 'pixi.js';
import Game from './Game';

// app
export const app = new PIXI.Application({
	antialias: true,
	backgroundColor: 0x000000,
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
