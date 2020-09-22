import PIXI from '../../PIXI';
import Collection from '../../utils/Collection';
import IShowable from '../IShowable';
import Sprite from '../renderer/Sprite';

export default class Gui implements IShowable {
	public isShow: boolean;
	private readonly container: PIXI.Container;
	private sprites: Collection<string, PIXI.DisplayObject> = new Collection();
	private guiObjects: Collection<string, PIXI.Container> = new Collection();

	constructor(public readonly app: PIXI.Application) {
		this.container = new PIXI.Container();
	}

	public addPIXISprite(name: string, sprite: PIXI.DisplayObject) {
		this.sprites.set(name, sprite);
		this.container.addChild(sprite);
	}

	public addObject(name: string, object: PIXI.Container) {
		this.guiObjects.set(name, object);
		this.container.addChild(object);
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
