import * as PIXIFilters from '@pixi/filter-outline';
import * as PIXI from 'pixi.js';
import { game } from '../../main';
import Position from '../../utils/Position';
import Color from '../renderer/Color';

export default class Button {
	public readonly text: PIXI.Text;
	public borderColor: Color = new Color(0, 0, 1);
	public borderPadding: number = 2;
	public container: PIXI.Container;
	public color: Color = new Color(1, 1, 1);
	public sprite: PIXI.Graphics;
	private border = new PIXIFilters.OutlineFilter(2, this.borderColor.toNumber(), 4);

	public constructor(public rawText: string = '', public width: number, public height: number, x: number = 0, y: number = 0) {
		this.container = new PIXI.Container();
		this.sprite = new PIXI.Graphics();
		this.container.interactive = true;
		this.container.buttonMode = true;
		this.container.position.set(x, y);

		this.border.padding = this.borderPadding;
		this.border.color = this.borderColor.toNumber();

		this.text = new PIXI.Text(this.rawText, {
			fontSize: 24,
			fontFamily: 'Arial',
			align: 'right',
		});
		this.text.anchor.set(0.5);
		this.text.scale.set(3);
		this.text.position.set(width * 0.5, height * 0.5);
		this.text.width = width;
		this.text.height = height;

		this.drawButton();
		this.container.addChild(this.sprite);
		this.container.addChild(this.text);

		this.container.on('mousedown', () => {
			this.color = new Color(0.8, 0.8, 0.8);
			this.drawButton();
		});

		this.container.on('mouseup', () => {
			this.color = new Color(1, 1, 1);
			this.drawButton();
		});

		this.container.on('mouseover', () => {
			game.tilePlacementGui.hide();
		});

		this.container.on('mouseout', () => {
			this.color = new Color(1, 1, 1);
			this.drawButton();
			game.tilePlacementGui.show();
		});
	}

	public get position(): Position {
		return new Position(this.container.position.x, this.container.position.y);
	}

	public set position(position: Position) {
		this.container.position.set(position.x, position.y);
	}

	public showBorder() {
		this.border.color = this.borderColor.toNumber();
		this.border.enabled = true;
		this.container.filters = [this.border];
	}

	private drawButton(): void {
		this.sprite.clear().beginFill(this.color.toNumber()).drawRect(0, 0, this.width, this.height).endFill();
	}
}
