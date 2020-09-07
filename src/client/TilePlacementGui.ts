import { game } from '../main';
import { resolution } from '../ressources/GameData';
import TilePosition from '../utils/TilePosition';
import Sprite from './renderer/Sprite';
import Tile from './renderer/Tile';

export default class Gui {
	public tilePlacingPreview: PIXI.Sprite;
	private sprites: Map<string, PIXI.Sprite> = new Map();

	constructor(public readonly app: PIXI.Application) {
		this.tilePlacingPreview = new Tile(game.player.blockSelected, TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition())).getAsSprite();

		this.tilePlacingPreview.alpha = 0.4;
		app.stage.addChild(this.tilePlacingPreview);
	}

	public updateTilePlacingPreview() {
		const position: TilePosition = TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition()).multiply(resolution);

		this.tilePlacingPreview.position.x = position.x;
		this.tilePlacingPreview.position.y = position.y;
	}

	public setTextureTilePlacingPreview(texture: PIXI.Texture) {
		this.tilePlacingPreview.texture = texture;
	}
}
