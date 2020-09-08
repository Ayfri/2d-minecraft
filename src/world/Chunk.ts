import Tile from '../client/renderer/Tile';
import { game } from '../main';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';

export default class Chunk {
	public readonly blocks: Map<StringTilePosition, Tile> = new Map<StringTilePosition, Tile>();

	constructor(public position: ChunkPosition) {}

	public clear(): void {
		this.blocks.forEach((t) => t.destroy());
		this.blocks.clear();
	}

	public getBlockAt(position: TilePosition) {
		return this.blocks.get(position.stringify());
	}

	public update(): void {
		this.blocks.forEach((t) => {
			t.resolution = game.renderer.resolution;
			game.app.stage.removeChild(t.getAsSprite());
			game.app.stage.addChild(t.getAsSprite());
		});
	}
}
