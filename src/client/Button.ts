import * as PIXI from 'pixi.js';
import Color from './renderer/Color';

export default class Button extends PIXI.Sprite {
	public readonly color: Color;
	public readonly text: PIXI.Text;

	constructor(public rawText: string = '', public width: number, public height: number) {
		super();
		this.color = new Color(1, 1, 1, 1);
		this.texture = PIXI.Texture.WHITE;
		this.interactive = true;
		this.buttonMode = true;
		this.position.set(this.position.x, this.position.y);

		const text: PIXI.Text = new PIXI.Text(this.rawText);
		text.style = { fontSize: text.width };
		text.scale.set(this.width / text.width / Math.PI, this.height / text.height / (Math.PI / 1.5));
		this.text = text;
		this.addChild(text);

		this.color.on('change', (red, green, blue, alpha) => {
			this.tint = new Color(red, green, blue).toNumber();
			this.alpha = alpha;
		});
	}
}
