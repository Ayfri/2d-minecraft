import * as PIXI from 'pixi.js';
import Block from '../blocks/Block';
import Position from '../utils/Position';

export default class Tile {
	private readonly sprite: PIXI.Sprite = null;
	
	constructor(public block: Block, public position: Position) {
		this.sprite = PIXI.Sprite.from(block.texture);
	}
	
	public getAsSprite(): PIXI.Sprite {
		this.sprite.transform.position.x = this.position.x;
		this.sprite.transform.position.y = this.position.y;
		return this.sprite;
	}
	
	public addToApplication(app: PIXI.Application) {
		app.stage.addChild(this.getAsSprite());
	}
}