import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import PIXI from '../../PIXI';
import { BlockType, Directions, TileEvents } from '../../types';
import Collection from '../../utils/Collection';
import EventEmitter from '../../utils/EventEmitter';
import TilePosition from '../../utils/TilePosition';

export default class Tile extends EventEmitter<TileEvents> {
	public isAir: boolean;
	public sprite: PIXI.Sprite;

	public constructor(public block: AbstractBlock, position: TilePosition) {
		super();
		this.sprite = PIXI.Sprite.from(block.texture);
		this.sprite.width = game.renderer.resolution;
		this.sprite.height = game.renderer.resolution;
		this.sprite.zIndex = -1000;
		this.isAir = block.type === BlockType.AIR;
		this.position = position;
	}

	private _position: TilePosition;

	public get position(): TilePosition {
		return this._position;
	}

	public set position(value: TilePosition) {
		this._position = value;

		const position = value.toPosition();
		this.sprite.position.set(position.x, position.y);
	}

	public getNeighbors(): Collection<Directions, Tile> {
		const tiles: Collection<Directions, Tile> = new Collection();
		tiles.set(Directions.UP, this.getNeighbor(Directions.UP));
		tiles.set(Directions.DOWN, this.getNeighbor(Directions.DOWN));
		tiles.set(Directions.LEFT, this.getNeighbor(Directions.LEFT));
		tiles.set(Directions.RIGHT, this.getNeighbor(Directions.RIGHT));
		return tiles;
	}

	public getNeighbor(direction: Directions): Tile {
		let x;
		let y;
		switch (direction) {
			case Directions.UP:
				x = 0;
				y = -1;
				break;

			case Directions.DOWN:
				x = 0;
				y = 1;
				break;

			case Directions.LEFT:
				x = -1;
				y = 0;
				break;

			case Directions.RIGHT:
				x = 1;
				y = 0;
				break;
		}

		return game.world.getTileAt(this._position.add(x, y));
	}

	public update(): void {}
}
