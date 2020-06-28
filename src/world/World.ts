import Block from '../blocks/Block';
import Tile from '../tiles/Tile';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';
import Chunk from './Chunk';
import * as PIXI from 'pixi.js';

export default class World {
	public chunks: Map<ChunkPosition, Chunk> = new Map<ChunkPosition, Chunk>();
	
	constructor(public app: PIXI.Application) {
		this.addBlankChunk(new ChunkPosition(0, 0));
	}
	
	public addTile(tile: Tile): void {
		const chunkPosition: ChunkPosition = tile.position.getAsChunkPosition();
		
		if ( !this.chunks.has(chunkPosition)) {
			this.addBlankChunk(chunkPosition);
		}
		
		this.chunks.get(chunkPosition).blocks.set(tile.position, tile);
		tile.addToApplication(this.app);
	}
	
	public addBlock(block: Block, position: Position): void {
		const chunkPosition: ChunkPosition = position.getAsChunkPosition();
		
		if ( !this.chunks.has(chunkPosition)) {
			this.addBlankChunk(chunkPosition);
		}
		
		const tile: Tile = new Tile(block, position);
		this.chunks.get(chunkPosition).blocks.set(position, tile);
		tile.addToApplication(this.app);
	}
	
	public addBlankChunk(chunkPosition: ChunkPosition) {
		this.chunks.set(chunkPosition, new Chunk(chunkPosition));
	}
	
	public clear(): void {
		this.chunks.forEach(chunk => chunk.clear());
	}
}