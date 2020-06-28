import * as PIXI from 'pixi.js';
import {BlockType} from '../types';

export default abstract class Block {
	public texture: PIXI.Texture = null;
	
	protected constructor(
		public name: string,
		public type: BlockType = BlockType.PLAIN
	) {
	}
	
	public setTexture(texture: PIXI.Texture): void {
		this.texture = texture;
	}
}