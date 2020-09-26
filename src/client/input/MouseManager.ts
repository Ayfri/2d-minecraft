import Blocks from '../../blocks/Blocks';
import { game } from '../../main';
import PIXI from '../../PIXI';
import { BlockType } from '../../types';
import Position from '../../utils/Position';

export default class MouseManager {
	public mouse: PIXI.InteractionData;
	public clicking: boolean;
	public blankTexture: PIXI.Texture = PIXI.Texture.from('./assets/sprites/null.png');

	public constructor(public readonly app: PIXI.Application) {
		this.mouse = app.renderer.plugins.interaction.mouse;
		this.clicking = false;

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
					case '1':
					case '&':
						MouseManager.setPlayerSelectedSlot(0);
						break;

					case '2':
					case 'é':
						MouseManager.setPlayerSelectedSlot(1);
						break;

					case '3':
					case '"':
						MouseManager.setPlayerSelectedSlot(2);
						break;

					case '4':
					case "'":
						MouseManager.setPlayerSelectedSlot(3);
						break;

					case '5':
					case '(':
						MouseManager.setPlayerSelectedSlot(4);
						break;

					case '6':
					case '-':
						MouseManager.setPlayerSelectedSlot(5);
						break;

					default:
						break;
				}

				game.tilePlacementGui.setTextureTilePlacingPreview(game.player.selectedSlot.item.block?.type === BlockType.AIR ? this.blankTexture : game.player.selectedSlot.item.block?.texture);
			}
		});
	}

	private static setPlayerSelectedSlot(number: number): void {
		game.player.selectedSlot = game.player.hotBar.getSlotAt(number);
		game.player.hotBar.selectedSlot = number;
	}

	public getMousePosition(): Position {
		return new Position(this.mouse.global.x, this.mouse.global.y);
	}
}
