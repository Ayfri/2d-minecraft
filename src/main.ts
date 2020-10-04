import Block from './blocks/Block';
import Blocks from './blocks/Blocks';
import Button from './client/gui/Button';
import Gui from './client/gui/Gui';
import Color from './client/renderer/Color';
import Entity from './entities/Entity';
import Game from './Game';
import Inventory from './inventory/Inventory';
import ItemStack from './inventory/ItemStack';
import Items from './items/Items';
import PIXI from './PIXI';
import SimpleRegistry from './ressources/SimpleRegistry';
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
	Blocks: {
		value: Blocks,
	},
	gameClasses: {
		value: {
			Block,
			Color,
			Position,
			SimpleRegistry,
			Entity,
			Button,
			Gui,
			TilePosition,
			Inventory,
			ItemStack,
		},
	},
	game: {
		value: game,
	},
	Items: {
		value: Items,
	},
	/*PIXI: {
		value: { ...PIXI, filters: { ...filters, ...PIXI.filters } },
	},*/
	world: {
		value: game.world,
	},
});
