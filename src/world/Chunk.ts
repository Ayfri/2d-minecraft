import Tile from '../client/renderer/Tile';
import {StringTilePosition} from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';

export default class Chunk {
	public readonly blocks: Map<StringTilePosition, Tile> = new Map<StringTilePosition, Tile>();
	
	constructor(public position: ChunkPosition) {
	}
	
	public clear(): void {
		this.blocks.clear();
	}
	
	public getBlockAt(position: TilePosition) {
		return this.blocks.get(position.stringify());
	}
}