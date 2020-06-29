import {SCALE_MODES} from 'pixi.js';
import {app} from '../main';
import {blocks} from '../ressources/GameData';
import {Path} from '../types';
import Block from './Block';
import SimpleBlock from './SimpleBlock';
import VoidBlock from './VoidBlock';

export default class Blocks {
	public static setTexturesOfBlocks(resources: Partial<Record<string, PIXI.LoaderResource>>) {
		for (let [name, block] of blocks) {
			const texture: PIXI.Texture = resources[name].texture;
			texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
			block.setTexture(texture);
		}
	}
	
	public static registerBlocks() {
		Blocks.register('void', new VoidBlock());
		Blocks.register('dirt', new SimpleBlock('dirt'));
	}
	
	public static register<T extends Block>(name: string, block: T): Block | T {
		const path: Path = `http://localhost:3000/assets/sprites/${name}.png`;
		app.loader.add(name, path);
		blocks.register(name, block);
		
		return blocks.get(name);
	}
}
