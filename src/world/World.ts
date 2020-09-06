import * as PIXI from 'pixi.js';
import AbstractBlock from '../blocks/AbstractBlock';
import Tile from '../client/renderer/Tile';
import { StringChunkPosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';
import Chunk from './Chunk';

export default class World {
	public chunks: Map<StringChunkPosition, Chunk> = new Map<StringChunkPosition, Chunk>();

	constructor(public app: PIXI.Application) {
		this.addBlankChunk(new ChunkPosition(0, 0));
	}

	public placeTile(tile: Tile): void {
		const chunkPosition: ChunkPosition = tile.position.getAsChunkPosition();
		if (!this.getChunkAt(chunkPosition)) {
			this.addBlankChunk(chunkPosition);
		}

		if (!this.getChunkAt(chunkPosition).getBlockAt(tile.position)) {
			this.getChunkAt(chunkPosition).blocks.set(tile.position.stringify(), tile);
			tile.addToApplication(this.app);
		}
	}

	public placeBlock(block: AbstractBlock, position: TilePosition): void {
		const tile: Tile = new Tile(block, position);
		this.placeTile(tile);
	}

	public replaceTile(tile: Tile): void {
		this.removeBlock(tile.position);
		this.placeTile(tile);
	}

	public replaceBlock(block: AbstractBlock, position: TilePosition): void {
		this.removeBlock(position);
		this.placeTile(new Tile(block, position));
	}

	public removeBlock(position: TilePosition): Tile {
		const chunk: Chunk = this.getChunkAt(position.getAsChunkPosition());
		if (chunk) {
			const tile: Tile = chunk.getBlockAt(position);
			if (tile) {
				tile.destroy();
				chunk.blocks.delete(position.stringify());
			}
			return tile;
		}
	}

	public addBlankChunk(chunkPosition: ChunkPosition): void {
		this.chunks.set(chunkPosition.stringify(), new Chunk(chunkPosition));
	}

	public getChunkAt(position: ChunkPosition): Chunk {
		return this.chunks.get(position.stringify());
	}

	public clear(): void {
		this.chunks.forEach((chunk): void => chunk.clear());
	}
}
