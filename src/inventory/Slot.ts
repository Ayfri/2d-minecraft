import PIXI from '../PIXI';
import { SlotEvents } from '../types';
import EventEmitter from '../utils/EventEmitter';
import ItemStack from './ItemStack';

export default class Slot {
	public eventHandler: EventEmitter<SlotEvents>;
	public itemStack: ItemStack | null = null;
	public text: PIXI.Text;

	public constructor() {
		this.eventHandler = new EventEmitter();
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

		this.eventHandler.on('countChange', (itemStack) => {
			if (itemStack) this.text.text = itemStack.count.toString();
		});
	}

	public isEmpty(): boolean {
		return this.itemStack === null;
	}
}
