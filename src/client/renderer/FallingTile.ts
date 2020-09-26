import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import { BlockType, Directions } from '../../types';
import Position from '../../utils/Position';
import TilePosition from '../../utils/TilePosition';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;
	public motion: Position;
	public renderedPosition: TilePosition;
	private isFalling: boolean = false;
	private belowTile: Tile;

	public constructor(public block: AbstractBlock, position: TilePosition) {
		super(block, position);
		this.renderedPosition = position.copy();
		this.motion = new Position(0, 0);
	}

	public update(): void {
		this.updateState();

		if (this.isFalling) {
			this.motion.y = this.motion.y > 0.4 ? this.motion.y : this.motion.y + 0.005;
			this.renderedPosition.addPosition(this.motion);
			if (!this.renderedPosition.round().equals(this.position)) {
				game.world.removeTile(this.position);
				this.position = this.renderedPosition.round();
				game.world.placeTile(this);
			}
		}

		if (this.canFall) {
			this.isFalling = true;
		} else {
			this.isFalling = false;
			this.motion.set(0, 0);
			this.renderedPosition = this.position;
			//			if (game.world.getTileAt(this.position).type !== BlockType.FALLING) game.world.placeTile(this);
		}
	}

	public updateState(): void {
		this.belowTile = this.getNeighbor(Directions.DOWN);
		this.canFall = this.belowTile.isAir && this.position.y < 50;
	}
}
