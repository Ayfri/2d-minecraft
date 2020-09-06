import * as PIXI from 'pixi.js';
import {blocks} from '../ressources/GameData';
import {BlockType} from '../types';

export default abstract class AbstractBlock {
	public texture: PIXI.Texture = null;
	
	protected constructor(
		public name: string,
		public type: BlockType = BlockType.PLAIN
	) {
	}
	
	public setTexture(texture: PIXI.Texture): void {
		if (texture) {
			if (texture.height !== 16 || texture.width !== 16) {
				return console.error(`Texture for ${this.name} block has not the right size (16 x 16).\nSize : ${texture.height} x ${texture.width}`);
			}
			
			this.texture = texture;
		} else {
			this.texture = this.type === BlockType.AIR ? blocks.get('air').texture : blocks.get('void').texture;
		}
		
		this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	}
}