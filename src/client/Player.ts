import Block from '../blocks/Block';
import {game} from '../main';

export default class Player {
	public blockSelected: Block;
	
	constructor() {
		this.blockSelected = game.gameData.blocks.get('dirt');
	}
}