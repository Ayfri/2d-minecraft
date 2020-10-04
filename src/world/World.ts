import Block from '../blocks/Block';
import Blocks from '../blocks/Blocks';
import DirtTile from '../blocks/DirtTile';
import FallingTile from '../blocks/FallingTile';
import GrassTile from '../blocks/GrassTile';
import Tile from '../blocks/Tile';
import { game } from '../main';
import PIXI from '../PIXI';
import { BlockType, StringTilePosition } from '../types';
import Collection from '../utils/Collection';
import TilePosition from '../utils/TilePosition';

export default class World {
	public tiles: Collection<StringTilePosition, Tile> = new Collection();
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
		}
	}

	public placeTile(tile: Tile): void {
		this.tiles.set(tile.position.stringify(), tile);
		tile.emit('place', tile.position);
		tile.emit('update');
		if (!tile.isAir) game.app.stage.addChild(tile.sprite);
	}

	public placeBlock(block: Block, position: TilePosition): void {
		let tile: Tile = new Tile(block, position);
		switch (block.type) {
			case BlockType.FALLING:
				tile = new FallingTile(block, position);
				break;
			case BlockType.GRASS:
				tile = new GrassTile(block, position);
				break;
			case BlockType.DIRT:
				tile = new DirtTile(block, position);
				break;
		}
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
		game.app.stage.removeChild(tile.sprite);
		this.placeBlock(Blocks.AIR, position);
	}

	public clear(): void {
		this.tiles.toValuesArray().forEach((t) => {
			game.app.stage.removeChild(t.sprite);
		});
		this.tiles.clear();
		this.init();
	}

	public async update(): Promise<void> {
		for (const tile of this.tiles.values()) {
			tile.emit('tick');
			tile.emit('update');
		}
	}

	public getTileAtOrUndefined(position: TilePosition): Tile | undefined {
		return this.tiles.toValuesArray().find((t) => t.position.equals(position));
	}
}
