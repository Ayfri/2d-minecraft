import PIXI from '../PIXI';
import { BlockType } from '../types';
import ITexturable from '../utils/ITexturable';

export default class Block implements ITexturable {
	public texture: PIXI.Texture = null;

	public setTexture(texture: PIXI.Texture): void {
		if (texture) {
			if (texture.height !== 16 || texture.width !== 16) {
				return console.error(`Texture for ${this.name} block don't have the right size (16 x 16).\nSize : ${texture.height} x ${texture.width}`);
			}

			this.texture = texture;
		} else {
			this.texture = PIXI.Texture.EMPTY;
		}

		this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	}

	public constructor(public name: string, public type: BlockType = BlockType.PLAIN) {}
}
