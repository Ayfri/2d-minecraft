import { StringChunkPosition } from '../types';
import Position from './Position';
import TilePosition from './TilePosition';

export default class ChunkPosition extends Position {
	constructor(public x: number, public y: number) {
		super(x, y);
	}

	public toTilePosition(): TilePosition {
		return new TilePosition(this.x * 16, this.y * 16);
	}

	public stringify(): StringChunkPosition {
		return JSON.stringify(this);
	}
}
