import { blocks } from '../ressources/GameData';
import AbstractBlock from './AbstractBlock';
import AirBlock from './AirBlock';
import FallingBlock from './FallingBlock';
import SimpleBlock from './SimpleBlock';

export default class Blocks {
	public static readonly VOID: SimpleBlock = Blocks.register('void', new SimpleBlock('void'));
	public static readonly AIR: AirBlock = Blocks.register('air', new AirBlock('air'));
	public static readonly DIRT: SimpleBlock = Blocks.register('dirt', new SimpleBlock('dirt'));
	public static readonly GRASS: SimpleBlock = Blocks.register('grass', new SimpleBlock('grass'));
	public static readonly STONE: SimpleBlock = Blocks.register('stone', new SimpleBlock('stone'));
	public static readonly SAND: FallingBlock = Blocks.register('sand', new FallingBlock('sand'));
	public static readonly OAK_LOG: FallingBlock = Blocks.register('oak_log', new SimpleBlock('oak_log'));
	public static readonly OAK_LEAVE: FallingBlock = Blocks.register('oak_leave', new SimpleBlock('oak_leave'));

	public static register<T extends AbstractBlock>(name: string, block: T): AbstractBlock | T {
		blocks.register(name, block);
		return blocks.get(name);
	}
}
