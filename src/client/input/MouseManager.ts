import * as PIXI from 'pixi.js';
import { game } from '../../main';
import { BlockType } from '../../types';
import Position from '../../utils/Position';

export default class MouseManager {
	public mouse: PIXI.InteractionData;
	public clicking: boolean;

	constructor(public readonly app: PIXI.Application) {
		this.mouse = app.renderer.plugins.interaction.mouse;
		this.clicking = false;

		// Mouse Events
		game.eventHandler.on('mousemove', () => {
			if (game.loaded) {
				if (this.clicking) {
					game.player.putBlockWhereClicked();
				}

				game.tilePlacementGui.updateTilePlacingPreview();
			}
		});

		game.eventHandler.on('mouseup', () => {
			this.clicking = false;
		});

		game.eventHandler.on('mousedown', () => {
			this.clicking = true;
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
					default:
						break;
				}

				const blankTexture: PIXI.Texture = PIXI.Texture.from('./assets/sprites/null.png');
				game.tilePlacementGui.setTextureTilePlacingPreview(game.player.blockSelected.type === BlockType.AIR ? blankTexture : game.player.blockSelected.texture);
			}
		});
	}

	public getMousePosition(): Position {
		return new Position(this.mouse.global.x, this.mouse.global.y);
	}
}
