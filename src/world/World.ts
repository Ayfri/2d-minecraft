import Block from '../blocks/Block';
import Blocks from '../blocks/Blocks';
import FallingTile from '../blocks/FallingTile';
import Tile from '../blocks/Tile';
import { game } from '../main';
import PIXI from '../PIXI';
import { BlockType } from '../types';
import TilePosition from '../utils/TilePosition';

export default class World {
	public tiles: Tile[] = [];
	public background: PIXI.Sprite;

	public constructor(public app: PIXI.Application) {
		this.background = new PIXI.Sprite();
		this.background.position.set(0, 0);
		this.background.anchor.set(0, 0);
		this.background.width = window.innerWidth;
		this.background.height = window.innerHeight;
		this.background.zIndex = -10000;

		this.init();
	}

	public init(): void {
		for (let i = -5; i < 60; i++) {
			for (let j = -5; j < 60; j++) {
				this.ensureTileAt(new TilePosition(i, j));
			}
		}
	}

	public getTileAt(position: TilePosition): Tile {
		this.ensureTileAt(position);
		return this.getTileAtOrUndefined(position);
	}

	public isTileAt(position: TilePosition): boolean {
		return !!this.getTileAtOrUndefined(position);
	}

	public ensureTileAt(position: TilePosition): void {
		if (!this.isTileAt(position)) {
			this.placeBlock(Blocks.AIR, position);
			console.log(`placing air at ${position.stringify()}`);
		}
	}

	public placeTile(tile: Tile): void {
		if (this.isTileAt(tile.position)) {
			this.tiles[this.tiles.findIndex((t) => t.position.equals(tile.position))] = tile;
		} else this.tiles.push(tile);
		tile.emit('place', tile.position);
		tile.emit('update');
		game.app.stage.addChild(tile.sprite);
	}

	public placeBlock(block: Block, position: TilePosition): void {
		let tile: Tile = new Tile(block, position);
		if (block.type === BlockType.FALLING) tile = new FallingTile(block, position);
		this.placeTile(tile);
	}

	public replaceBlock(block: Block, position: TilePosition): void {
		if (this.isTileAt(position)) {
			this.getTileAtOrUndefined(position)?.emit('replace', position, block);
		}

		this.removeTile(position);
		this.placeBlock(block, position);
	}

	public removeTile(position: TilePosition): void {
		const tile = this.getTileAt(position);
		tile.ensureNeighbors();
		tile.getNeighbors().forEach((t) => {
			t.emit('update');
		});
		game.app.stage.removeChild(tile.sprite);
		this.placeBlock(Blocks.AIR, position);
	}

	public clear(): void {
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.sprite);
		});
		this.tiles = [];
		this.init();
	}

	public async update(): Promise<void> {
		for (const tile of this.tiles) {
			tile.emit('tick');
			tile.emit('update');
		}
	}

	public getTileAtOrUndefined(position: TilePosition): Tile | undefined {
		return this.tiles.find((t) => t.position.equals(position));
	}
}
