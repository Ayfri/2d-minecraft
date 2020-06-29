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
		if (texture.height !== 16 || texture.width !== 16) {
			return console.error(`Texture for ${this.name} block has not the right size (16 x 16).\nSize : ${texture.height} x ${texture.width}`);
		}
		
		this.texture = texture;
	}
}