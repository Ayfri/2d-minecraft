import { blocks } from '../ressources/GameData';
import AbstractBlock from './AbstractBlock';
import AirBlock from './AirBlock';
import FallingBlock from './FallingBlock';
import SimpleBlock from './SimpleBlock';

export default class Blocks {
	public static registerBlocks() {
		Blocks.register('void', new SimpleBlock('void'));
		Blocks.register('air', new AirBlock('air'));
		Blocks.register('dirt', new SimpleBlock('dirt'));
		Blocks.register('grass', new SimpleBlock('grass'));
		Blocks.register('stone', new SimpleBlock('stone'));
		Blocks.register('sand', new FallingBlock('sand'));
	}

	public static register<T extends AbstractBlock>(name: string, block: T): AbstractBlock | T {
		blocks.register(name, block);
		return blocks.get(name);
	}
}
