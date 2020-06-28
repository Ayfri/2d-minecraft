import Tile from '../tiles/Tile';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';

export default class Chunk {
	public loaded: boolean = false;
	public readonly blocks: Map<Position, Tile> = new Map<Position, Tile>();
	
	constructor(public position: ChunkPosition) {
	}
	
	public clear(): void {
		this.blocks.clear();
	}
}