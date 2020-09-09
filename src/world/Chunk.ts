import Tile from '../client/renderer/Tile';
import { game } from '../main';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';

export default class Chunk {
	public readonly tiles: Map<StringTilePosition, Tile> = new Map<StringTilePosition, Tile>();

	constructor(public position: ChunkPosition) {}

	public clear(): void {
		this.tiles.forEach((t) => t.destroy());
		this.tiles.clear();
	}

	public getTileAt(position: TilePosition): Tile {
		if (!this.tiles.has(position.stringify())) {
			return null;
		}

		return this.tiles.get(position.stringify());
	}

	public update(): void {
		this.tiles.forEach((t) => {
			t.resolution = game.renderer.resolution;
			game.app.stage.removeChild(t.getAsSprite());
			game.app.stage.addChild(t.getAsSprite());
			t.update();
		});
	}
}
