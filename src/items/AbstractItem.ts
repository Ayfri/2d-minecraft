import AbstractBlock from '../blocks/AbstractBlock';
import Blocks from '../blocks/Blocks';
import PIXI from '../PIXI';
import { ItemType } from '../types';
import ITexturable from '../utils/ITexturable';

export default abstract class AbstractItem implements ITexturable {
	public texture: PIXI.Texture = null;
	public block: AbstractBlock | undefined;

	public setTexture(texture: PIXI.Texture): void {
		if (texture) {
			if (texture.height !== 16 || texture.width !== 16) {
				return console.error(`Texture for ${this.name} block has not the right size (16 x 16).\nSize : ${texture.height} x ${texture.width}`);
			}

			this.texture = texture;
		} else {
			this.texture = Blocks.VOID.texture;
		}

		this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	}

	protected constructor(public name: string, public type: ItemType) {}
}
