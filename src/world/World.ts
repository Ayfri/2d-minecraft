import * as PIXI from 'pixi.js';
import AbstractBlock from '../blocks/AbstractBlock';
import FallingTile from '../client/renderer/FallingTile';
import Tile from '../client/renderer/Tile';
import { BlockType, StringChunkPosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';
import Chunk from './Chunk';

export default class World {
	public chunks: Map<StringChunkPosition, Chunk> = new Map<StringChunkPosition, Chunk>();

	public constructor(public app: PIXI.Application) {
		this.addBlankChunk(new ChunkPosition(0, 0));
	}
	public getTileAt(position: TilePosition): Tile {
		const chunkPosition: ChunkPosition = position.getAsChunkPosition();
		this.ensureChunkAt(chunkPosition);
		return this.getChunkAt(chunkPosition).getTileAt(position);
	}

	public placeTile(tile: Tile): void {
		const chunkPosition: ChunkPosition = tile.position.getAsChunkPosition();
		this.ensureChunkAt(chunkPosition);

		if (!this.getChunkAt(chunkPosition).getTileAt(tile.position)) {
			this.getChunkAt(chunkPosition).tiles.set(tile.position.stringify(), tile);
			tile.addToApplication(this.app);
		}
	}

	private ensureChunkAt(position: ChunkPosition): void {
		if (!this.getChunkAt(position)) {
			this.addBlankChunk(position);
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
		if (block.type === BlockType.FALLING) this.placeTile(new FallingTile(block, position));
		else this.placeTile(new Tile(block, position));
	}

	public removeBlock(position: TilePosition): Tile {
		const chunk: Chunk = this.getChunkAt(position.getAsChunkPosition());
		if (chunk) {
			const tile: Tile = chunk.getTileAt(position);
			if (tile) {
				tile.destroy();
				chunk.tiles.delete(position.stringify());
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

	public update(): void {
		this.chunks.forEach((chunk) => chunk.update());
	}
}
