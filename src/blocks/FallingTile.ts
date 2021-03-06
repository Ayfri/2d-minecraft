import { Directions } from '../types';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';
import Block from './Block';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;
	public motion: Position;
	public renderedPosition: Position;

	private _isFalling: boolean = false;

	public get isFalling(): boolean {
		return this._isFalling;
	}

	private _belowTile: Tile;

	public get belowTile(): Tile {
		return this._belowTile;
	}

	public constructor(block: Block, position: TilePosition) {
		super(block, position);
		this.renderedPosition = position.toPosition().copy();
		this.motion = new Position(0, 0);
		this.ensureNeighbor(Directions.DOWN);
		this.updateState();

		this.on('update', () => {
			if (this.canFall) this.update();
		});

		this.on('tick', () => {
			this.updateState();
		});
	}

	public update(): void {
		this.updateState();

		if (this._isFalling) {
			this.motion.y = this.motion.y > 10 ? this.motion.y : this.motion.y + 0.2;
			this.renderedPosition.addPosition(this.motion);
			this.sprite.position.set(this.renderedPosition.x, this.renderedPosition.y);

			if (!this.renderedPosition.round().equals(this.position)) {
				this.remove();
				this._position = TilePosition.fromPositionToTilePosition(this.renderedPosition);
				this.place();
				this.ensureNeighbor(Directions.DOWN);
			}
		}
	}

	public updateState(): void {
		this._belowTile = this.getNeighbor(Directions.DOWN);
		this.canFall = this._belowTile.isAir && this.position.y < 50;

		if (this.canFall) {
			this._isFalling = true;
		} else {
			this._isFalling = false;
			this.motion.set(0, 0);
			this.position = this.position.round();
			this.renderedPosition = this.position.toPosition();
		}
	}
}
