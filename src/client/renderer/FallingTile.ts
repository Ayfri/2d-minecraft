import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import { Directions } from '../../types';
import Position from '../../utils/Position';
import TilePosition from '../../utils/TilePosition';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;
	public motion: Position;
	public renderedPosition: TilePosition;

	private _isFalling: boolean = false;

	public get isFalling(): boolean {
		return this._isFalling;
	}

	private _belowTile: Tile;

	public get belowTile(): Tile {
		return this._belowTile;
	}

	public constructor(public block: AbstractBlock, position: TilePosition) {
		super(block, position);
		this.renderedPosition = position.copy();
		this.motion = new Position(0, 0);

		this.on('update', () => {
			this.updateState();
		});

		this.on('tick', () => {
			if (this.canFall) this.update();
		});
	}

	public update(): void {
		this.updateState();

		if (this._isFalling) {
			this.motion.y = this.motion.y > 0.4 ? this.motion.y : this.motion.y + 0.005;
			this.renderedPosition.addPosition(this.motion);
			if (!this.renderedPosition.round().equals(this.position)) {
				game.world.removeTile(this.position);
				this.position = this.renderedPosition.round();
				game.world.placeTile(this);
			}
		}

		if (this.canFall) {
			this._isFalling = true;
		} else {
			this._isFalling = false;
			this.motion.set(0, 0);
			this.renderedPosition = this.position;
		}
	}

	public updateState(): void {
		this.ensureNeighbor(Directions.DOWN);
		this._belowTile = this.getNeighbor(Directions.DOWN);
		this.canFall = this._belowTile.isAir && this.position.y < 50;
	}
}
