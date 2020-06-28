import {Layer} from '../types';
import ChunkPosition from './ChunkPosition';

export default class Position {
	constructor(public x: number, public y: number, public layer: Layer = Layer.TILE_FRONT) {
	}
	
	public getAsChunkPosition(): ChunkPosition {
		return new ChunkPosition(Math.round(this.x / 16), Math.round(this.y / 16))
	}
}