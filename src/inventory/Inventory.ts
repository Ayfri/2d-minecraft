import PIXI from '../PIXI';
import { InventoryType } from '../types';
import Collection from '../utils/Collection';
import Slot from './Slot';

export default class Inventory {
	public slots: Collection<number, Slot>;
	public container: PIXI.Container;

	public constructor(public width: number, public height: number, public type: InventoryType) {
		this.container = new PIXI.Container();
		this.slots = new Collection<number, Slot>();
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				this.slots.set(this.slots.size, new Slot());
			}
		}
	}

	public [Symbol.iterator]() {
		return this.slots.values();
	}
}
