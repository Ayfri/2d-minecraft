import * as PIXI from 'pixi.js';
import Blocks from './blocks/Blocks';
import Game from './Game';
import Position from './utils/Position';

export const app = new PIXI.Application({
	width : window.innerWidth,
	height: window.innerHeight
});


export const game: Game = new Game(app);
game.preInit();
game.init();
app.ticker.add(() => {
	if(game.loaded) {
		game.world.addBlock(Blocks.VOID, new Position(0, 0));
	}
});

Object.defineProperties(window, {
	app: {
		value: app
	},
	blocks: {
		value: game.gameData.blocks
	},
	game: {
		value: game
	}
});

