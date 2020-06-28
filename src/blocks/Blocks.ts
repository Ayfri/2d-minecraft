import {app} from '../main';
import {blocks} from '../ressources/GameData';
import {Path} from '../types';
import Block from './Block';
import VoidBlock from './VoidBlock';

export default class Blocks {
	public static VOID: VoidBlock;
	
	public static setTexturesOfBlocks(resources: Partial<Record<string, PIXI.LoaderResource>>) {
		for (let [name, block] of blocks) {
			block.setTexture(resources[name].texture);
		}
	}
	
	public static registerBlocks() {
		Blocks.VOID = Blocks.register('void', new VoidBlock());
	}
	
	public static register<T extends Block>(name: string, block: T): Block | T {
		const path: Path = `http://localhost:3000/assets/sprites/${name}.png`;
		app.loader.add(name, path);
		blocks.register(name, block);
		
		return blocks.get(name);
	}
}
