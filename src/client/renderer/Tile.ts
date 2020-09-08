import * as PIXI from 'pixi.js';
import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import TilePosition from '../../utils/TilePosition';
import Sprite from './Sprite';

export default class Tile extends Sprite {
	public resolution: number;

	constructor(public block: AbstractBlock, public position: TilePosition) {
		super();
		this.resolution = game.renderer.resolution;
		this.sprite = PIXI.Sprite.from(block.texture);
		this.sprite.zIndex = -1000;
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.position.x * this.resolution, this.position.y * this.resolution, this.resolution / 16, this.resolution / 16);
		return this.sprite;
	}
}
