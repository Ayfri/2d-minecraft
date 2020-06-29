import * as PIXI from 'pixi.js';
import Block from '../../blocks/Block';
import {resolution} from '../../ressources/GameData';
import Position from '../../utils/Position';

export default class Tile {
	private readonly sprite: PIXI.Sprite = null;
	
	constructor(public block: Block, public position: Position) {
		this.sprite = PIXI.Sprite.from(block.texture);
	}
	
	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(
			this.position.x * resolution,
			this.position.y * resolution,
			resolution / 16,
			resolution / 16
		);
		return this.sprite;
	}
	
	public addToApplication(app: PIXI.Application) {
		app.stage.addChild(this.getAsSprite());
	}
}