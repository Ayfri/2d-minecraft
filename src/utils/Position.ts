import {resolution} from '../ressources/GameData';
import {Layer, StringPosition} from '../types';
import ChunkPosition from './ChunkPosition';

export default class Position {
	constructor(public x: number, public y: number, public layer: Layer = Layer.TILE_FRONT) {
	}
	
	public getAsChunkPosition(): ChunkPosition {
		return new ChunkPosition(Math.round(this.x / resolution), Math.round(this.y / resolution));
	}
	
	public stringify(): StringPosition {
		return JSON.stringify(this);
	}
	
	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}, layer: ${this.layer}]`;
	}
}