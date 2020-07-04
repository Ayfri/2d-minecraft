import Block from '../blocks/Block';
import {game} from '../main';
import {resolution} from '../ressources/GameData';
import TilePosition from '../utils/TilePosition';

export default class Player {
	public blockSelected: Block;
	
	constructor() {
		this.blockSelected = game.gameData.blocks.get('dirt');
	}
	
	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition());
		game.world.replaceBlock(this.blockSelected, position);
	}
}