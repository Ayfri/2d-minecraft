import { ColorEvents } from '../../types';
import EventHandler from '../../utils/EventHandler';

export default class Color extends EventHandler<ColorEvents> {
	constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
		super();
		this._alpha = alpha;
		this._blue = blue;
		this._green = green;
		this._red = red;
	}

	private _red: number = 0;

	public get red(): number {
		return this._red;
	}

	public set red(value: number) {
		this._red = value;
		this.emit('redChange', value);
		this.emit('change', this._red, this._blue, this._green, this._alpha);
	}

	private _green: number = 0;

	public get green(): number {
		return this._green;
	}

	public set green(value: number) {
		this._green = value;
		this.emit('greenChange', value);
		this.emit('change', this._red, this._blue, this._green, this._alpha);
	}

	private _blue: number = 0;

	public get blue(): number {
		return this._blue;
	}

	public set blue(value: number) {
		this._blue = value;
		this.emit('blueChange', value);
		this.emit('change', this._red, this._blue, this._green, this._alpha);
	}

	private _alpha: number = 1;

	public get alpha(): number {
		return this._alpha;
	}

	public set alpha(value: number) {
		this._alpha = value;
		this.emit('alphaChange', value);
		this.emit('change', this._red, this._blue, this._green, this._alpha);
	}

	public static invert(color: Color): Color {
		return new Color(-color._red + 1, -color._green + 1, -color._blue + 1, color._alpha);
	}

	public static toNumber(color: Color): number {
		return color._red * 256 * color._green * 256 * color._blue * 256 - 1;
	}

	public toNumber(): number {
		return Color.toNumber(this);
	}

	public invert(): Color {
		return Color.invert(this);
	}
}
