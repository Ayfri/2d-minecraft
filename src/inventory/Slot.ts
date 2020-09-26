import { game } from '../main';
import PIXI from '../PIXI';
import { SlotEvents } from '../types';
import EventEmitter from '../utils/EventEmitter';
import ItemStack from './ItemStack';

export default class Slot {
	public get itemStack(): ItemStack | null {
		return this._itemStack;
	}

	public set itemStack(value: ItemStack | null) {
		this.itemSprite.texture = value.item?.texture;
		this._itemStack = value;
	}

	public eventHandler: EventEmitter<SlotEvents>;
	private _itemStack: ItemStack | null = null;
	public text: PIXI.Text;
	public container: PIXI.Container;
	public itemSprite: PIXI.Sprite;

	public constructor() {
		this.eventHandler = new EventEmitter();
		this.container = new PIXI.Container();
		this.text = new PIXI.Text(
			'',
			new PIXI.TextStyle({
				dropShadow: true,
				fill: 0xffffff,
				fontSize: 20,
				fontFamily: '"Lucida Console", Monaco, monospace',
				fontWeight: 'bold',
			})
		);
		this.text.anchor.set(0.5, 0.5);
		this.text.position.set(game.renderer.resolution * 1.1, game.renderer.resolution * 1.1);
		this.text.scale.set(0.8, 0.8);

		this.itemSprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
		this.itemSprite.width = game.renderer.resolution * 1.1;
		this.itemSprite.height = game.renderer.resolution * 1.1;
		this.itemSprite.position.set(5, 5);

		this.container.addChild(this.itemSprite);
		this.container.addChild(this.text);
		this.eventHandler.on('countChange', (itemStack) => {
			if (itemStack) this.text.text = itemStack.count.toString();
		});
	}

	public isEmpty(): boolean {
		return this._itemStack === null;
	}
}
