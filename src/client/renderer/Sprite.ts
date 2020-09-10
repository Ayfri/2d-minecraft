import { game } from '../../main';
import Position from '../../utils/Position';
import * as PIXI from 'pixi.js';

export default abstract class Sprite {
	public position: Position;
	public sprite: PIXI.Sprite;

	protected constructor() {
		this.position = new Position();
		this.sprite = new PIXI.Sprite();
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.position.x, this.position.y, game.renderer.resolution / 16, game.renderer.resolution / 16);
		return this.sprite;
	}

	public destroy(): void {
		this.sprite.destroy();
	}

	public setTexture(texture: PIXI.Texture): void {
		this.sprite.texture = texture;
	}

	public addToApplication(app: PIXI.Application) {
		app.stage.addChild(this.getAsSprite());
	}
}
