import { game } from '../main';
import PIXI from '../PIXI';
import { BlockType, Directions, TileEvents } from '../types';
import Collection from '../utils/Collection';
import EventEmitter from '../utils/EventEmitter';
import TilePosition from '../utils/TilePosition';
import Block from './Block';

export default class Tile extends EventEmitter<TileEvents> {
	public isAir: boolean;
	public sprite: PIXI.Sprite;
	public type: BlockType;

	protected _position: TilePosition;

	public get position(): TilePosition {
		return this._position;
	}

	public set position(value: TilePosition) {
		this._position = value;

		const position = value.toPosition();
		this.sprite.position.set(position.x, position.y);
	}

	public constructor(public block: Block, position: TilePosition) {
		super();
		this.sprite = PIXI.Sprite.from(block.texture);
		this.sprite.width = game.renderer.resolution;
		this.sprite.height = game.renderer.resolution;
		this.sprite.zIndex = -1000;
		this.type = block.type;
		this.isAir = block.type === BlockType.AIR;
		this.position = position;
	}

	public getNeighbors(): Collection<Directions, Tile | undefined> {
		const tiles: Collection<Directions, Tile> = new Collection();
		tiles.set(Directions.UP, this.getNeighbor(Directions.UP));
		tiles.set(Directions.DOWN, this.getNeighbor(Directions.DOWN));
		tiles.set(Directions.LEFT, this.getNeighbor(Directions.LEFT));
		tiles.set(Directions.RIGHT, this.getNeighbor(Directions.RIGHT));
		return tiles;
	}

	public ensureNeighbor(direction: Directions): boolean {
		if (this.getNeighbor(direction)) {
			return true;
		} else {
			game.world.ensureTileAt(this.position.addWithDirection(direction, 1));
			return false;
		}
	}

	public ensureNeighbors(): void {
		this.ensureNeighbor(Directions.UP);
		this.ensureNeighbor(Directions.DOWN);
		this.ensureNeighbor(Directions.LEFT);
		this.ensureNeighbor(Directions.RIGHT);
	}

	public place(): void {
		game.world.placeTile(this);
	}

	public replaceTo(block: Block) {
		game.world.replaceBlock(block, this.position);
	}

	public remove(): void {
		game.world.removeTile(this.position);
	}

	public isExposedToSky(): boolean {
		return game.world.tiles
			.toValuesArray()
			.filter((t) => t.position.x === this.position.x && t.position.y < this.position.y)
			.every((t) => t.isAir);
	}

	public getNeighbor(direction: Directions): Tile | undefined {
		return game.world.getTileAtOrUndefined(this._position.addWithDirection(direction, 1));
	}
}
