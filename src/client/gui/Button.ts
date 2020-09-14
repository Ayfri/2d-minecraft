import * as PIXIFilters from '@pixi/filter-outline';
import * as PIXI from 'pixi.js';
import { game } from '../../main';
import ColorableSprite from '../ColorableSprite';
import Color from '../renderer/Color';

export default class Button extends ColorableSprite {
	public readonly text: PIXI.Text;
	public borderColor: Color = new Color(0, 0, 1);
	public borderPadding: number = 2;
	private _showBorder: boolean = false;
	private border = new PIXIFilters.OutlineFilter(10, this.borderColor.toNumber(), 2);

	constructor(public rawText: string = '', public width: number, public height: number) {
		super();
		this.texture = PIXI.Texture.WHITE;
		this.interactive = true;
		this.buttonMode = true;
		this.position.set(this.position.x, this.position.y);
		this.border.padding = this.borderPadding;
		this.border.color = this.borderColor.toNumber();

		const text: PIXI.Text = new PIXI.Text(this.rawText);
		text.style = { fontSize: text.width };
		text.scale.set(this.width / text.width / Math.PI, this.height / text.height / (Math.PI / 1.5));
		this.text = text;
		this.addChild(text);

		this.on('pointerdown', () => {
			this.tint = new Color(0.8, 0.8, 0.8).toNumber();
		});
		this.on('pointerup', () => {
			this.tint = new Color(1, 1, 1).toNumber();
		});
		this.on('mouseover', () => {
			game.tilePlacementGui.hide();
		});
		this.on('mouseout', () => {
			game.tilePlacementGui.show();
		});
	}

	public showBorder() {
		this._showBorder = true;
		this.border.color = this.borderColor.toNumber();
		this.border.enabled = true;
		this.filters = [this.border];
	}
}
