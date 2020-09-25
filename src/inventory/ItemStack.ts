import AbstractItem from '../items/AbstractItem';
import Slot from './Slot';

export default class ItemStack {
	public slot: Slot | null;

	public constructor(public item: AbstractItem, count: number, slot?: Slot) {
		this._count = count;
		this.slot = slot;
	}

	public static from(item: AbstractItem): ItemStack {
		return new ItemStack(item, 0, null);
	}

	private _count: number;

	public get count(): number {
		return this._count;
	}

	public set count(value: number) {
		this._count = value;
		this.slot?.eventHandler.emit('countChange', this);
	}
}
