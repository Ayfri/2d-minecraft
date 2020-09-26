import { game } from '../main';
import PIXI from '../PIXI';
import { InventoryType } from '../types';
import Collection from '../utils/Collection';
import ItemStack from './ItemStack';
import Slot from './Slot';

export default class Inventory {
	public get selectedSlot(): number {
		return this._selectedSlot;
	}

	public set selectedSlot(value: number) {
		this.selectedSlotGraphics.position.set(-6 + value * 48, -6);
		this._selectedSlot = value;
	}

	public slots: Collection<number, Slot>;
	public container: PIXI.Container;
	private readonly selectedSlotGraphics: PIXI.Graphics;
	private _selectedSlot: number;

	public constructor(public width: number, public height: number, public type: InventoryType) {
		this.container = new PIXI.Container();
		this.selectedSlotGraphics = new PIXI.Graphics();
		this.slots = new Collection<number, Slot>();
		this._selectedSlot = 0;

		const slotTexture: PIXI.Texture = game.textureManager.getTexture('hotBarSlot');
		const selectedSlotTexture: PIXI.Texture = game.textureManager.getTexture('hotBarSelectedSlot');
		const graphics: PIXI.Graphics = new PIXI.Graphics();
		const resolution: number = game.renderer.resolution * 1.5;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.slots.set(this.slots.size, new Slot());
			}
		}

		slotTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
		selectedSlotTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

		graphics.beginTextureFill({
			texture: slotTexture,
		});
		graphics.drawRect(0, 0, width * 16, height * 16);
		graphics.endFill();
		graphics.scale.set((resolution / game.renderer.resolution) * 2, (resolution / game.renderer.resolution) * 2);

		this.selectedSlotGraphics.beginTextureFill({
			texture: selectedSlotTexture,
		});
		this.selectedSlotGraphics.drawRect(0, 0, 20, 20);
		this.selectedSlotGraphics.endFill();
		this.selectedSlotGraphics.position.set(-6 + this.selectedSlot * 20, -6);
		this.selectedSlotGraphics.scale.set(graphics.scale.x, graphics.scale.y);
		this.container.addChild(graphics);
		this.container.addChild(this.selectedSlotGraphics);
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

	public getSlotIndex(slot: Slot) {
		return this.slots.toValuesArray().indexOf(slot) ?? 0;
	}

	public [Symbol.iterator]() {
		return this.slots.values();
	}
}
