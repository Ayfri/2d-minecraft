import * as PIXI from 'pixi.js';
import AbstractBlock from '../blocks/AbstractBlock';
import Blocks from '../blocks/Blocks';
import IShowable from '../client/IShowable';
import Tile from '../client/renderer/Tile';
import { game } from '../main';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import Collection from '../utils/Collection';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';

export default class Chunk implements IShowable {
	public isShow: boolean;

	public show(): void {
		if (this.isShow) return;
		this.isShow = true;
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
			game.app.stage.addChild(t.getAsSprite());
		});
	}

	public hide(): void {
		if (!this.isShow) return;
		this.isShow = false;
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
		});
	}

	public readonly tiles: Collection<StringTilePosition, Tile> = new Collection<StringTilePosition, Tile>();
	private container: PIXI.Container;

	public constructor(public position: ChunkPosition) {
		this.container = new PIXI.Container();
		this.fill(Blocks.AIR);
	}

	public setTile(tile: Tile): Tile {
		const stringTilePosition: StringTilePosition = tile.position.stringify();
		if (this.tiles.has(stringTilePosition)) game.app.stage.removeChild(this.tiles.get(stringTilePosition).getAsSprite());
		this.tiles.set(stringTilePosition, tile);
		tile.addToApplication(game.app);
		return tile;
	}

	public clear(): void {
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
		});
		this.tiles.clear();
		this.fill(Blocks.AIR);
	}

	public getTileAt(position: TilePosition): Tile | null {
		if (!this.tiles.has(position.stringify())) {
			return null;
		}

		return this.tiles.get(position.stringify());
	}

	public update(): void {
		for (const tile of this.tiles.values()) {
			game.app.stage.removeChild(tile.getAsSprite());
			if (this.isShow) {
				game.app.stage.addChild(tile.getAsSprite());
			}
			tile.update();
		}
	}

	public updateRendering(): void {
		this.canHide() ? this.hide() : this.show();
	}

	public fill(block: AbstractBlock): void {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				const position = new TilePosition(i, j).addTilePosition(this.position.toTilePosition());
				this.setTile(new Tile(block, position));
			}
		}
	}

	public canHide(): boolean {
		const position: Position = this.position.toTilePosition().toPosition();
		return position.distanceFrom(game.player.tileOn.toPosition()) > 64 * 32;
	}
}
