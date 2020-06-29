import Tile from '../client/renderer/Tile';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';

export default class Chunk {
	public readonly blocks: Map<Position, Tile> = new Map<Position, Tile>();
	
	constructor(public position: ChunkPosition) {
	}
	
	public clear(): void {
		this.blocks.clear();
	}
	
	public getBlockAt(position: Position) {
		return [...this.blocks.values()].find(tile => tile.position.x === position.x && tile.position.y === position.y && tile.position.layer === position.layer) || null;
	}
}