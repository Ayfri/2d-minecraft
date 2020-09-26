import AbstractBlock from '../blocks/AbstractBlock';
import Blocks from '../blocks/Blocks';
import SimpleRegistry from '../ressources/SimpleRegistry';
import AbstractItem from './AbstractItem';
import BlockItem from './BlockItem';

export default class Items {
	public static readonly list: SimpleRegistry<AbstractItem> = new SimpleRegistry<AbstractItem>();

	public static readonly DIRT: BlockItem = Items.register('dirt', BlockItem.from(Blocks.DIRT));
	public static readonly STONE: BlockItem = Items.register('stone', BlockItem.from(Blocks.STONE));
	public static readonly GRASS: BlockItem = Items.register('grass', BlockItem.from(Blocks.GRASS));
	public static readonly SAND: BlockItem = Items.register('sand', BlockItem.from(Blocks.SAND));
	public static readonly OAK_LOG: BlockItem = Items.register('oak_log', BlockItem.from(Blocks.OAK_LOG));
	public static readonly OAK_LEAVES: BlockItem = Items.register(`oak_leaves`, BlockItem.from(Blocks.OAK_LEAVES));

	public static register<T extends AbstractItem>(name: string, item: T): T {
		this.list.register(name, item);
		return item;
	}
}
