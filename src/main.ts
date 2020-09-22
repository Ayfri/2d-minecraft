import * as filters from '@pixi/filter-outline';
import PIXI from './PIXI';
import SimpleBlock from './blocks/SimpleBlock';
import Button from './client/gui/Button';
import Gui from './client/gui/Gui';
import Color from './client/renderer/Color';
import Sprite from './client/renderer/Sprite';
import Entity from './entities/Entity';
import Game from './Game';
import SimpleRegistry from './ressources/SimpleRegistry';
import ChunkPosition from './utils/ChunkPosition';
import Position from './utils/Position';
import TilePosition from './utils/TilePosition';

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
		const vph = window.innerHeight + 1000;
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
	gameClasses: {
		value: {
			Color,
			Position,
			SimpleRegistry,
			Entity,
			Button,
			Gui,
			Sprite,
			SimpleBlock,
			TilePosition,
			ChunkPosition,
		},
	},
	game: {
		value: game,
	},
	/*PIXI: {
		value: { ...PIXI, filters: { ...filters, ...PIXI.filters } },
	},*/
	world: {
		value: game.world,
	},
});
