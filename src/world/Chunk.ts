import Tile from '../client/renderer/Tile';
import { game } from '../main';
import { blocks } from '../ressources/GameData';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import TilePosition from '../utils/TilePosition';

export default class Chunk {
	public readonly tiles: Map<StringTilePosition, Tile> = new Map<StringTilePosition, Tile>();

	constructor(public position: ChunkPosition) {
		this.fillWithAir();
	}

	public setTile(tile: Tile): Tile {
		const stringTilePosition: StringTilePosition = tile.position.stringify();
		if (this.tiles.has(stringTilePosition)) {
			game.app.stage.removeChild(this.tiles.get(stringTilePosition).sprite);
			this.tiles.delete(stringTilePosition);
		}

		this.tiles.set(stringTilePosition, tile);
		tile.addToApplication(game.app);
		return tile;
	}

	public clear(): void {
		this.tiles.forEach((t) => t.destroy());
		this.tiles.clear();
		this.fillWithAir();
	}

	public getTileAt(position: TilePosition): Tile | null {
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

	private fillWithAir(): void {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				const position = new TilePosition(i, j).addTilePosition(this.position.toTilePosition());
				this.setTile(new Tile(blocks.get('air'), position));
			}
		}
	}
}
