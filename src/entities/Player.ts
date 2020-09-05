import Block from '../blocks/Block';
import {game} from '../main';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';


export default class Player {
	public blockSelected: Block;
	public position: Position;
	public velocity: Position;
	public sprite: PIXI.Texture;
	
	constructor() {
		this.blockSelected = game.gameData.blocks.get('dirt');
		this.position = new Position();
		this.velocity = new Position();
	}
	
	public move(x: number, y: number): void {
		this.velocity.x = x;
		this.velocity.y = y;
	}
	
	public update(): void {
		this.updatePosition();
	}
	
	public putBlockWhereClicked(): void {
		const position: TilePosition = TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition());
		game.world.replaceBlock(this.blockSelected, position);
	}
	
	private updatePosition(): void {
		this.position.add(this.velocity.x, this.velocity.y);
	}
}