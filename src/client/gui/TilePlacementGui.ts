import { OutlineFilter } from '@pixi/filter-outline';
import Blocks from '../../blocks/Blocks';
import Tile from '../../blocks/Tile';
import { game } from '../../main';
import PIXI from '../../PIXI';
import TilePosition from '../../utils/TilePosition';
import Color from '../renderer/Color';
import Gui from './Gui';

export default class TilePlacementGui extends Gui {
	public tilePreview: PIXI.Sprite;
	public blockSelected: PIXI.Sprite;

	constructor(app: PIXI.Application) {
		super(app);
		this.tilePreview = new Tile(Blocks.AIR, TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition())).sprite;
		this.blockSelected = new PIXI.Sprite();

		this.tilePreview.alpha = 0.4;
		this.tilePreview.zIndex = 1000;

		this.blockSelected.zIndex = 1000;
		this.blockSelected.texture = this.tilePreview.texture;
		const outlineFilter: PIXI.filters.OutlineFilter = new OutlineFilter(10, new Color(1, 1, 1).toNumber());
		outlineFilter.enabled = true;
		outlineFilter.padding = 3;
		this.blockSelected.filters = [outlineFilter];
		this.blockSelected.position.set(window.innerWidth - 150, 150);
		this.blockSelected.scale.set(4, 4);

		this.addSprite('tilePlacementPreview', this.tilePreview);
		this.addSprite('blockSelected', this.blockSelected);
	}

	public updateTilePlacingPreview() {
		const position: TilePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition()).multiply(game.renderer.resolution);
		this.tilePreview.width = game.renderer.resolution;
		this.tilePreview.height = game.renderer.resolution;
		this.tilePreview.position.set(position.x, position.y);
	}

	public setTextureTilePlacingPreview(texture: PIXI.Texture) {
		this.tilePreview.texture = texture;
		this.blockSelected.texture = texture;
	}
}
