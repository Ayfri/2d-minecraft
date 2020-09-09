import * as PIXI from 'pixi.js';
import * as PIXIFilters from 'pixi-filters';
import { game } from '../main';
import Color from './renderer/Color';

export default class Button extends PIXI.Sprite {
	public get showBorder(): boolean {
		return this._showBorder;
	}

	public set showBorder(value: boolean) {
		this._showBorder = value;
		this.border.enabled = true;
		this.filters = value ? [this.border] : [];
	}

	public readonly color: Color;
	public readonly text: PIXI.Text;
	private _showBorder: boolean = false;
	public borderColor: Color = new Color(0, 0, 1);
	private border = new PIXIFilters.OutlineFilter(10, this.borderColor.toNumber(), 2);

	constructor(public rawText: string = '', public width: number, public height: number) {
		super();
		this.color = new Color(1, 1, 1, 1);
		this.texture = PIXI.Texture.WHITE;
		this.interactive = true;
		this.buttonMode = true;
		this.position.set(this.position.x, this.position.y);
		this.border.color = this.borderColor.toNumber();

		const text: PIXI.Text = new PIXI.Text(this.rawText);
		text.style = { fontSize: text.width };
		text.scale.set(this.width / text.width / Math.PI, this.height / text.height / (Math.PI / 1.5));
		this.text = text;
		this.addChild(text);

		this.color.on('change', (red, green, blue, alpha) => {
			this.tint = new Color(red, green, blue).toNumber();
			this.alpha = alpha;
		});
		this.on('click', () => {
			this.showBorder = true;
		});
		this.on('mouseover', () => {
			game.tilePlacementGui.hide();
		});
		this.on('mouseout', () => {
			game.tilePlacementGui.show();
		});
	}
}
