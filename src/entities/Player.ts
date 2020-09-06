import AbstractBlock from '../blocks/AbstractBlock';
import { game } from '../main';
import TilePosition from '../utils/TilePosition';
import Entity from './Entity';

export default class Player extends Entity {
	public blockSelected: AbstractBlock;

	constructor() {
		super();
		this.blockSelected = game.gameData.blocks.get('dirt');
	}

	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition());
		game.world.replaceBlock(this.blockSelected, position);
	}
}
