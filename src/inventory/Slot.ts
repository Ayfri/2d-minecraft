import ItemStack from './ItemStack';

export default class Slot {
	public itemStack: ItemStack | null = null;
	public constructor() {}

	public isEmpty(): boolean {
		return this.itemStack === null;
	}
}
