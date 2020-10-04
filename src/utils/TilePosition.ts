import { game } from '../main';
import { Directions, Layer, StringTilePosition } from '../types';
import Position from './Position';

export default class TilePosition extends Position {
	constructor(public x: number, public y: number, public layer: Layer = Layer.FRONT_TILE) {
		super(x, y);
	}

	public static from(position: Position): TilePosition {
		return new TilePosition(position.x, position.y, Layer.FRONT_TILE);
	}

	public static fromPositionToTilePosition(position: Position): TilePosition {
		const resolutionDivided: number = game.renderer.resolution / 2;
		return TilePosition.from(position.subtract(resolutionDivided, resolutionDivided).divide(game.renderer.resolution).round());
	}

	public copy(): TilePosition {
		return new TilePosition(this.x, this.y);
	}

	public toPosition(): Position {
		return Position.fromPosition(this.multiply(game.renderer.resolution));
	}

	public addTilePosition(tilePosition: TilePosition): TilePosition {
		return TilePosition.from(this.add(tilePosition.x, tilePosition.y));
	}

	public addWithDirection(direction: Directions, length: number) {
		return TilePosition.from(super.addWithDirection(direction, length));
	}

	public add(x: number, y?: number): TilePosition {
		return new TilePosition(this.x + x, this.y + y);
	}

	public multiply(ratio: number): TilePosition;
	public multiply(x: number, y?: number): TilePosition {
		return TilePosition.from(super.multiply(x));
	}

	public subtract(x: number, y?: number): TilePosition {
		return this.add(-x, -y);
	}

	public round(): TilePosition {
		return TilePosition.from(super.round());
	}

	public divide(ratio: number): TilePosition {
		return TilePosition.from(super.divide(ratio));
	}

	public stringify(): StringTilePosition {
		return JSON.stringify(this);
	}

	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}, layer: ${this.layer}]`;
	}
}
