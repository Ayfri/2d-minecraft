import { game } from '../main';
import { resolution } from '../ressources/GameData';
import TilePosition from '../utils/TilePosition';
import { Gui } from './Gui';
import Tile from './renderer/Tile';

export default class TilePlacementGui extends Gui {
	public tilePlacingPreview: PIXI.Sprite;

	constructor(app: PIXI.Application) {
		super(app);
		this.tilePlacingPreview = new Tile(game.player.blockSelected, TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition())).getAsSprite();

		this.tilePlacingPreview.alpha = 0.4;
		this.addPIXISprite('tilePlacementPreview', this.tilePlacingPreview);
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
