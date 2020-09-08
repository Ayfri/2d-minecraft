import * as PIXI from 'pixi.js';
import Game from './Game';

// app
export const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
});
// Game
export const game: Game = new Game(app);
let clicking = false;

game.preInit();
game.init();

// Events
app.ticker.add(() => {
	if (game.loaded) {
		game.update();
	}
});

game.eventHandler.once('launch', () => {
	game.postInit();
	console.log('Game launched.');
});

// Mouse Events
game.eventHandler.on('mousemove', () => {
	if (game.loaded) {
		if (clicking) {
			game.player.putBlockWhereClicked();
		}

		game.tilePlacementGui.updateTilePlacingPreview();
	}
});

game.eventHandler.on('mouseup', () => {
	clicking = false;
});

game.eventHandler.on('mousedown', () => {
	clicking = true;
	game.player.putBlockWhereClicked();
});

game.eventHandler.on('keydown', (key) => {
	if (game.loaded) {
		switch (key.name) {
			case '²':
				// fixme: fix the air block which does not replace the blocks :/
				game.player.blockSelected = game.gameData.blocks.get('air');
				break;
			case '&':
				game.player.blockSelected = game.gameData.blocks.get('dirt');
				break;
			case 'é':
				game.player.blockSelected = game.gameData.blocks.get('stone');
				break;
		}

		game.tilePlacementGui.setTextureTilePlacingPreview(game.player.blockSelected.texture);
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
