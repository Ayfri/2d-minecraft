import {resolution} from '../ressources/GameData';
import {Layer, StringTilePosition} from '../types';
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
		return TilePosition.from(position.subtract(resolution / 2, resolution / 2).divide(resolution).round());
	} // Fonction pour remplacer Position#toTilePosition
	
	public getAsChunkPosition(): ChunkPosition {
		return new ChunkPosition(Math.round(this.x / resolution), Math.round(this.y / resolution));
	}
	
	public add(x: number, y?: number): TilePosition {
		return TilePosition.from(super.add(x, y));
	}
	
	public multiply(ratio: number): TilePosition {
		return TilePosition.from(super.multiply(ratio));
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
	
	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}, layer: ${this.layer}]`;
	}
	
	public stringify(): StringTilePosition {
		return JSON.stringify(this);
	}
}