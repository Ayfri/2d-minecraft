import { game } from '../main';
import PIXI from '../PIXI';
import { InventoryType } from '../types';
import Collection from '../utils/Collection';
import ItemStack from './ItemStack';
import Slot from './Slot';

export default class Inventory {
	public slots: Collection<number, Slot>;
	public container: PIXI.Container;

	public constructor(public width: number, public height: number, public type: InventoryType) {
		this.container = new PIXI.Container();
		this.slots = new Collection<number, Slot>();
		const slotTexture: PIXI.Texture = game.textureManager.getTexture('hotBarSlot');
		const graphics: PIXI.Graphics = new PIXI.Graphics();
		const resolution: number = game.renderer.resolution * 1.5;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.slots.set(this.slots.size, new Slot());
			}
		}
		slotTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

		graphics.beginTextureFill({
			texture: slotTexture,
		});
		graphics.drawRect(0, 0, width * 16, height * 16);
		graphics.endFill();
		graphics.scale.set((resolution / game.renderer.resolution) * 2, (resolution / game.renderer.resolution) * 2);
		this.container.addChild(graphics);
	}

	public setItemStackAt(itemStack: ItemStack, slotNumber: number): void {
		const slot: Slot = this.slots.toValuesArray()[slotNumber];
		itemStack.slot = slot;
		slot.itemStack = itemStack;
		slot.eventHandler.emit('countChange', itemStack);
		slot.container.position.set(slot.container.position.x + game.renderer.resolution * 1.5 * slotNumber, slot.container.position.y);

		if (itemStack.count === 1) slot.text.visible = false;
		this.container.addChild(slot.container);
	}

	public addItemStack(itemStack: ItemStack): boolean {
		let hasAdd: boolean = false;
		for (let i = 0; i < this.slots.toValuesArray().length; i++) {
			if (this.slots.toValuesArray()[i]?.isEmpty()) {
				this.setItemStackAt(itemStack, i);
				hasAdd = true;
				break;
			}
		}

		return hasAdd;
	}

	public getSlotAt(slotNumber: number) {
		return this.slots.toValuesArray()[slotNumber];
	}

	public [Symbol.iterator]() {
		return this.slots.values();
	}
}
