import * as PIXI from 'pixi.js';
import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import { BlockType } from '../../types';
import TilePosition from '../../utils/TilePosition';
import Sprite from './Sprite';

export default class Tile extends Sprite {
	public resolution: number;
	public isAir: boolean;

	public constructor(public block: AbstractBlock, public position: TilePosition) {
		super();
		this.resolution = game.renderer.resolution;
		this.sprite = PIXI.Sprite.from(block.texture);
		this.sprite.zIndex = -1000;
		this.isAir = block.type === BlockType.AIR;
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.position.toPosition().x, this.position.toPosition().y, this.resolution / 16, this.resolution / 16);
		return this.sprite;
	}

	public update(): void {}
}
