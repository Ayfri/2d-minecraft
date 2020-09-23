import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import PIXI from '../../PIXI';
import { BlockType, Directions } from '../../types';
import Collection from '../../utils/Collection';
import TilePosition from '../../utils/TilePosition';
import Sprite from './Sprite';

export default class Tile extends Sprite {
	public isAir: boolean;

	public constructor(public block: AbstractBlock, public position: TilePosition) {
		super();
		this.sprite = PIXI.Sprite.from(block.texture);
		this.sprite.zIndex = -1000;
		this.isAir = block.type === BlockType.AIR;
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.position.toPosition().x, this.position.toPosition().y, game.renderer.resolution / 16, game.renderer.resolution / 16);
		return this.sprite;
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
		return game.world.getTileAt(this.position.add(x, y));
	}

	public update(): void {}
}
