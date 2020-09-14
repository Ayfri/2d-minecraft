import * as PIXI from 'pixi.js';
import Color from './renderer/Color';

export default class ColorableSprite extends PIXI.Sprite {
	public color: Color = new Color(1, 1, 1, 1);

	public constructor() {
		super();

		this.color.on('change', (red, green, blue, alpha) => {
			this.tint = new Color(red, green, blue).toNumber();
			this.alpha = alpha;
		});
	}
}
