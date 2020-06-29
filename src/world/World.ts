import * as PIXI from 'pixi.js';
import Block from '../blocks/Block';
import Tile from '../client/renderer/Tile';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';
import Chunk from './Chunk';

export default class World {
	public chunks: Map<ChunkPosition, Chunk> = new Map<ChunkPosition, Chunk>();
	
	constructor(public app: PIXI.Application) {
		this.addBlankChunk(new ChunkPosition(0, 0));
	}
	
	public addTile(tile: Tile): void {
		const chunkPosition: ChunkPosition = tile.position.getAsChunkPosition();
		if ( !this.getChunkAt(chunkPosition)) {
			this.addBlankChunk(chunkPosition);
		}
		
		if ( !this.getChunkAt(chunkPosition).getBlockAt(tile.position)) {
			this.getChunkAt(chunkPosition).blocks.set(tile.position, tile);
			tile.addToApplication(this.app);
		}
	}
	
	public addBlock(block: Block, position: Position): void {
		const tile: Tile = new Tile(block, position);
		this.addTile(tile);
	}
	
	public addBlankChunk(chunkPosition: ChunkPosition) {
		this.chunks.set(chunkPosition, new Chunk(chunkPosition));
	}
	
	public getChunkAt(position: ChunkPosition) {
		return [...this.chunks.values()].find(chunk => chunk.position.x === position.x && chunk.position.y === position.y) || null;
	}
	
	public clear(): void {
		this.chunks.forEach(chunk => chunk.clear());
	}
}