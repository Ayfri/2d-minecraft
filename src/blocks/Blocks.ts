import {app} from '../main';
import {blocks} from '../ressources/GameData';
import {BlockType, Path} from '../types';
import AirBlock from './AirBlock';
import Block from './Block';
import SimpleBlock from './SimpleBlock';
import VoidBlock from './VoidBlock';

export default class Blocks {
	public static registerBlocks() {
		Blocks.register('void', new VoidBlock());
		Blocks.register('air', new AirBlock());
		Blocks.register('dirt', new SimpleBlock('dirt'));
		Blocks.register('stone', new SimpleBlock('stone'));
	}
	
	public static register<T extends Block>(name: string, block: T): Block | T {
		const path: Path = `http://localhost:3000/assets/sprites/${name}.png`;
		
		app.loader.add(name, path);
		blocks.register(name, block);
		
		return blocks.get(name);
	}
}
