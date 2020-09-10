import { game } from '../main';
import { Layer, StringTilePosition } from '../types';
import ChunkPosition from './ChunkPosition';
import Position from './Position';

export default class TilePosition extends Position {
	constructor(public x: number, public y: number, public layer: Layer = Layer.FRONT_TILE) {
		super(x, y);
	}

	public static from(position: Position): TilePosition {
		return new TilePosition(position.x, position.y, Layer.FRONT_TILE);
	}

	public static fromPositionToShortTilePosition(position: Position): TilePosition {
		return TilePosition.from(
			position
				.subtract(game.renderer.resolution / 2, game.renderer.resolution / 2)
				.divide(game.renderer.resolution)
				.round()
		);
	} // Fonction pour remplacer Position#toTilePosition

	public getAsChunkPosition(): ChunkPosition {
		return new ChunkPosition(Math.round(this.x / game.renderer.resolution), Math.round(this.y / game.renderer.resolution));
	}

	public add(x: number, y?: number): TilePosition {
		return TilePosition.from(super.add(x, y));
	}

	public multiply(ratio: number, y?: number): TilePosition;
	public multiply(x: number, y: number): TilePosition {
		return y ? TilePosition.from(super.multiply(x, y)) : TilePosition.from(super.multiply(x));
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
