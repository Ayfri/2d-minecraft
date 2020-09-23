import AbstractItem from '../items/AbstractItem';

export default class ItemStack {
	public count: number;

	public constructor(public item: AbstractItem, count: number) {
		this.count = count;
	}
}
