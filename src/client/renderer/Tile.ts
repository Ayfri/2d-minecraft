import * as PIXI from 'pixi.js';
import Block from '../../blocks/Block';
import {resolution} from '../../ressources/GameData';
import TilePosition from '../../utils/TilePosition';

export default class Tile {
	private readonly sprite: PIXI.Sprite = null;
	
	constructor(public block: Block, public position: TilePosition) {
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
	
	public destroy(): void {
		this.sprite.destroy();
	}
	
	public addToApplication(app: PIXI.Application) {
		app.stage.addChild(this.getAsSprite());
	}
}