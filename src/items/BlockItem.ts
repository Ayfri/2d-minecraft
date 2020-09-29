import Block from '../blocks/Block';
import { ItemType } from '../types';
import AbstractItem from './AbstractItem';

export default class BlockItem extends AbstractItem {
	public constructor(name: string, public block: Block) {
		super(name, ItemType.BLOCK);
	}

	public static from(block: Block): BlockItem {
		return new BlockItem(block.name, block);
	}
}
