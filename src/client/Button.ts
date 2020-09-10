import * as PIXIFilters from 'pixi-filters';
import * as PIXI from 'pixi.js';
import { game } from '../main';
import ColorableSprite from './ColorableSprite';
import Color from './renderer/Color';

export default class Button extends ColorableSprite {
	public get showBorder(): boolean {
		return this._showBorder;
	}

	public set showBorder(value: boolean) {
		this._showBorder = value;
		this.border.enabled = true;
		this.filters = value ? [this.border] : [];
	}

	public readonly text: PIXI.Text;
	private _showBorder: boolean = false;
	public borderColor: Color = new Color(0, 0, 1);
	private border = new PIXIFilters.OutlineFilter(10, this.borderColor.toNumber(), 2);

	constructor(public rawText: string = '', public width: number, public height: number) {
		super();
		this.texture = PIXI.Texture.WHITE;
		this.interactive = true;
		this.buttonMode = true;
		this.position.set(this.position.x, this.position.y);
		// fixme: fix borders
		this.border.color = this.borderColor.toNumber();

		const text: PIXI.Text = new PIXI.Text(this.rawText);
		text.style = { fontSize: text.width };
		text.scale.set(this.width / text.width / Math.PI, this.height / text.height / (Math.PI / 1.5));
		this.text = text;
		this.addChild(text);

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
