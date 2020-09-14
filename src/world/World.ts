import * as PIXI from 'pixi.js';
import AbstractBlock from '../blocks/AbstractBlock';
import FallingTile from '../client/renderer/FallingTile';
import Tile from '../client/renderer/Tile';
import { blocks } from '../ressources/GameData';
import { BlockType, StringChunkPosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import Collection from '../utils/Collection';
import TilePosition from '../utils/TilePosition';
import Chunk from './Chunk';

export default class World {
	public chunks: Collection<StringChunkPosition, Chunk> = new Collection<StringChunkPosition, Chunk>();

	public constructor(public app: PIXI.Application) {
		this.init();
	}

	public getTileAt(position: TilePosition): Tile {
		const chunkPosition: ChunkPosition = position.toChunkPosition();
		this.ensureChunkAt(chunkPosition);
		return this.getChunkAt(chunkPosition).getTileAt(position);
	}

	public placeTile(tile: Tile): void {
		const chunkPosition: ChunkPosition = tile.position.toChunkPosition();
		this.ensureChunkAt(chunkPosition);

		this.removeBlock(tile.position);
		this.getChunkAt(chunkPosition).setTile(tile);
	}

	public ensureChunkAt(position: ChunkPosition): void {
		if (!this.chunks.has(position.stringify())) {
			this.addBlankChunk(position);
		}
	}

	public placeBlock(block: AbstractBlock, position: TilePosition): void {
		const tile: Tile = new Tile(block, position);
		this.placeTile(tile);
	}

	public replaceBlock(block: AbstractBlock, position: TilePosition): void {
		this.removeBlock(position);
		if (block.type === BlockType.FALLING) this.placeTile(new FallingTile(block, position));
		else this.placeTile(new Tile(block, position));
	}

	public removeBlock(position: TilePosition): Tile | undefined {
		this.ensureChunkAt(position.toChunkPosition());
		const chunk: Chunk = this.getChunkAt(position.toChunkPosition());
		return chunk.setTile(new Tile(blocks.get('air'), position));
	}

	public addBlankChunk(chunkPosition: ChunkPosition): void {
		this.chunks.set(chunkPosition.stringify(), new Chunk(chunkPosition));
	}

	public getChunkAt(position: ChunkPosition): Chunk | undefined {
		return this.chunks.get(position.stringify());
	}

	public clear(): void {
		for (const chunk of this.chunks.values()) {
			chunk.clear();
		}
	}

	public async update(): Promise<void> {
		for (const chunk of this.chunks.values()) {
			if (chunk.isShow) chunk.update();
		}
	}

	public updateRendering(): void {
		for (const chunk of this.chunks.values()) {
			chunk.updateRendering();
		}
	}

	private init() {
		for (let i = 0; i < 1; i++) {
			for (let j = 0; j < 1; j++) {
				this.addBlankChunk(new ChunkPosition(i, j));
			}
		}
	}
}
