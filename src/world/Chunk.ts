import Tile from '../client/renderer/Tile';
import {StringPosition} from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';

export default class Chunk {
	public readonly blocks: Map<StringPosition, Tile> = new Map<StringPosition, Tile>();
	
	constructor(public position: ChunkPosition) {
	}
	
	public clear(): void {
		this.blocks.clear();
	}
	
	public getBlockAt(position: Position) {
		return this.blocks.get(position.stringify());
	}
}