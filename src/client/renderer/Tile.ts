import * as PIXI from 'pixi.js';
import AbstractBlock from '../../blocks/AbstractBlock';
import { resolution } from '../../ressources/GameData';
import TilePosition from '../../utils/TilePosition';
import Sprite from './Sprite';

export default class Tile extends Sprite {
	constructor(public block: AbstractBlock, public position: TilePosition) {
		super();
		this.sprite = PIXI.Sprite.from(block.texture);
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.position.x * resolution, this.position.y * resolution, resolution / 16, resolution / 16);
		return this.sprite;
	}
}
