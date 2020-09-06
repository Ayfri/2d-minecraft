import { blocks } from '../ressources/GameData';
import AbstractBlock from './AbstractBlock';
import AirBlock from './AirBlock';
import SimpleBlock from './SimpleBlock';
import VoidBlock from './VoidBlock';

export default class Blocks {
	public static registerBlocks() {
		Blocks.register('void', new VoidBlock());
		Blocks.register('air', new AirBlock());
		Blocks.register('dirt', new SimpleBlock('dirt'));
		Blocks.register('stone', new SimpleBlock('stone'));
	}

	public static register<T extends AbstractBlock>(name: string, block: T): AbstractBlock | T {
		blocks.register(name, block);
		return blocks.get(name);
	}
}
