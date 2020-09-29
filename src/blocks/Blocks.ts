import SimpleRegistry from '../ressources/SimpleRegistry';
import { BlockType } from '../types';
import Block from './Block';

export default class Blocks {
	public static readonly list: SimpleRegistry<Block> = new SimpleRegistry<Block>();

	public static readonly VOID: Block = Blocks.register('void', new Block('void'));
	public static readonly AIR: Block = Blocks.register('air', new Block('air', BlockType.AIR));
	public static readonly DIRT: Block = Blocks.register('dirt', new Block('dirt'));
	public static readonly GRASS: Block = Blocks.register('grass', new Block('grass'));
	public static readonly STONE: Block = Blocks.register('stone', new Block('stone'));
	public static readonly SAND: Block = Blocks.register('sand', new Block('sand', BlockType.FALLING));
	public static readonly OAK_LOG: Block = Blocks.register('oak_log', new Block('oak_log'));
	public static readonly OAK_LEAVES: Block = Blocks.register('oak_leaves', new Block('oak_leaves'));

	public static register<T extends Block>(name: string, block: T): T {
		this.list.register(name, block);
		return block;
	}
}
