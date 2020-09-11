import * as PIXI from 'pixi.js';
import IShowable from '../IShowable';
import Sprite from '../renderer/Sprite';

export class Gui implements IShowable {
	public isShow: boolean;
	private readonly container: PIXI.Container;
	private sprites: Map<string, PIXI.Sprite> = new Map();

	constructor(public readonly app: PIXI.Application) {
		this.container = new PIXI.Container();
	}

	public addPIXISprite(name: string, sprite: PIXI.Sprite) {
		this.sprites.set(name, sprite);
		this.container.addChild(sprite);
	}

	public addSprite(name: string, sprite: Sprite): void {
		this.addPIXISprite(name, sprite.getAsSprite());
	}

	public removeSprite(name: string): void {
		if (this.sprites.has(name)) {
			this.container.removeChild(this.sprites.get(name));
			this.sprites.delete(name);
		}
	}

	public show(): void {
		this.isShow = true;
		this.app.stage.addChild(this.container);
	}

	public hide(): void {
		this.isShow = false;
		this.app.stage.removeChild(this.container);
	}
}
