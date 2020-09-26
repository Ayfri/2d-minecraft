import AbstractBlock from '../blocks/AbstractBlock';
import Blocks from '../blocks/Blocks';
import FallingTile from '../client/renderer/FallingTile';
import Tile from '../client/renderer/Tile';
import { game } from '../main';
import PIXI from '../PIXI';
import { BlockType } from '../types';
import TilePosition from '../utils/TilePosition';

export default class World {
	public tiles: Array<Tile> = new Array<Tile>();
	public background: PIXI.Sprite;

	public constructor(public app: PIXI.Application) {
		this.background = new PIXI.Sprite();
		this.background.position.set(0, 0);
		this.background.anchor.set(0, 0);
		this.background.width = window.innerWidth;
		this.background.height = window.innerHeight;
		this.background.zIndex = -10000;
	}

	public getTileAt(position: TilePosition): Tile {
		this.ensureTileAt(position);
		return this.getTileAtOrUndefined(position);
	}

	public isTileAt(position: TilePosition): boolean {
		return !!this.getTileAtOrUndefined(position);
	}

	private getTileAtOrUndefined(position: TilePosition) {
		return this.tiles.find((t) => t.position.equals(position));
	}

	public ensureTileAt(position: TilePosition): void {
		if (!this.isTileAt(position)) {
			this.placeBlock(Blocks.AIR, position);
		}
	}

	public placeTile(tile: Tile): void {
		if (this.isTileAt(tile.position)) {
			this.tiles[this.tiles.findIndex((t) => this.getTileAtOrUndefined(t.position))] = tile;
		} else this.tiles.push(tile);
	}

	public placeBlock(block: AbstractBlock, position: TilePosition): void {
		let tile: Tile = new Tile(block, position);
		if (block.type === BlockType.FALLING) tile = new FallingTile(block, position);
		this.placeTile(tile);
	}

	public replaceBlock(block: AbstractBlock, position: TilePosition): void {
		this.removeTile(position);
		this.placeBlock(block, position);
	}

	public removeTile(position: TilePosition): void {
		this.placeBlock(Blocks.AIR, position);
	}

	public clear(): void {
		this.tiles = [];
		this.updateRendering();
	}

	public async update(): Promise<void> {
		for (const tile of this.tiles.values()) {
			// This will be changed
			game.app.stage.removeChild(tile.getAsSprite());
			game.app.stage.addChild(tile.getAsSprite());
			tile.update();
		}
	}

	public updateRendering(): void {}
}
