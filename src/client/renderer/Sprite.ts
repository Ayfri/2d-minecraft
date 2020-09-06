import {resolution} from '../../ressources/GameData';
import Position from '../../utils/Position';

export default abstract class Sprite {
	public position: Position;
	protected sprite: PIXI.Sprite;
	
	protected constructor() {
		this.position = new Position();
		this.sprite = new PIXI.Sprite();
	}
	
	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(
			this.position.x,
			this.position.y,
			resolution / 16,
			resolution / 16,
		);
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
