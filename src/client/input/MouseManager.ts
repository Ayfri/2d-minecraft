import PIXI from '../../PIXI';
import Blocks from '../../blocks/Blocks';
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
		game.eventHandler.on('mouseMove', () => {
			if (game.loaded) {
				if (this.clicking) {
					game.player.putBlockWhereClicked();
				}

				game.tilePlacementGui.updateTilePlacingPreview();
			}
		});

		game.eventHandler.on('mouseUp', () => {
			this.clicking = false;
		});

		game.eventHandler.on('mouseUpOutside', () => {
			this.clicking = false;
		});

		game.eventHandler.on('mouseDown', () => {
			this.clicking = true;
			game.player.putBlockWhereClicked();
		});

		game.eventHandler.on('keydown', (key) => {
			if (game.loaded) {
				switch (key.name) {
					case '²':
						game.player.selectedBlock = Blocks.AIR;
						break;

					case '1':
					case '&':
						game.player.selectedBlock = Blocks.DIRT;
						break;

					case '2':
					case 'é':
						game.player.selectedBlock = Blocks.STONE;
						break;

					case '3':
					case '"':
						game.player.selectedBlock = Blocks.GRASS;
						break;

					case '4':
					case "'":
						game.player.selectedBlock = Blocks.SAND;
						break;

					case '5':
					case '(':
						game.player.selectedBlock = Blocks.OAK_LOG;
						break;

					case '6':
					case '-':
						game.player.selectedBlock = Blocks.OAK_LEAVE;
						break;

					default:
						break;
				}

				const blankTexture: PIXI.Texture = PIXI.Texture.from('./assets/sprites/null.png');
				game.tilePlacementGui.setTextureTilePlacingPreview(game.player.selectedBlock.type === BlockType.AIR ? blankTexture : game.player.selectedBlock.texture);
			}
		});
	}

	public getMousePosition(): Position {
		return new Position(this.mouse.global.x, this.mouse.global.y);
	}
}
