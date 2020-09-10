import * as PIXI from 'pixi.js';
import { game } from '../main';
import TilePosition from '../utils/TilePosition';
import { Gui } from './Gui';
import Tile from './renderer/Tile';

export default class TilePlacementGui extends Gui {
	public tilePreview: PIXI.Sprite;

	constructor(app: PIXI.Application) {
		super(app);
		this.tilePreview = new Tile(game.player.blockSelected, TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition())).getAsSprite();

		this.tilePreview.alpha = 0.4;
		this.tilePreview.zIndex = 1000;
		this.addPIXISprite('tilePlacementPreview', this.tilePreview);
	}

	public updateTilePlacingPreview() {
		const position: TilePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition()).multiply(game.renderer.resolution);
		this.tilePreview.width = game.renderer.resolution;
		this.tilePreview.height = game.renderer.resolution;
		this.tilePreview.position.set(position.x, position.y);
	}

	public setTextureTilePlacingPreview(texture: PIXI.Texture) {
		this.tilePreview.texture = texture;
	}
}
