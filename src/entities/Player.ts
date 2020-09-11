import AbstractBlock from '../blocks/AbstractBlock';
import { game } from '../main';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';
import Entity from './Entity';

export default class Player extends Entity {
	public blockSelected: AbstractBlock;

	constructor() {
		super();
		this.position = new Position(0, 0);
		this.blockSelected = game.gameData.blocks.get('dirt');
	}

	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());

		if (game.world.getTileAt(position).block.name !== this.blockSelected.name) game.world.replaceBlock(this.blockSelected, position);
	}
}
