import PIXI from '../../PIXI';
import Collection from '../../utils/Collection';
import IShowable from '../IShowable';

export default class Gui implements IShowable {
	public isShow: boolean;

	public show(): void {
		this.isShow = this.container.visible = true;
	}

	public hide(): void {
		this.isShow = this.container.visible = false;
	}

	private readonly container: PIXI.Container;
	protected sprites: Collection<string, PIXI.DisplayObject> = new Collection();
	protected guiObjects: Collection<string, PIXI.Container> = new Collection();

	constructor(public readonly app: PIXI.Application) {
		this.container = new PIXI.Container();
		this.app.stage.addChild(this.container);
	}

	public addSprite(name: string, sprite: PIXI.DisplayObject) {
		this.sprites.set(name, sprite);
		this.container.addChild(sprite);
	}

	public addObject(name: string, object: PIXI.Container) {
		this.guiObjects.set(name, object);
		this.container.addChild(object);
	}

	public removeObject(name: string) {
		if (this.guiObjects.has(name)) {
			this.sprites.delete(name);
			this.container.removeChild(this.guiObjects.get(name));
		}
	}

	public removeSprite(name: string): void {
		if (this.sprites.has(name)) {
			this.sprites.delete(name);
			this.container.removeChild(this.sprites.get(name));
		}
	}
}
