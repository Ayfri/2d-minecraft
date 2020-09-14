import { ColorEvents } from '../../types';
import EventEmitter from '../../utils/EventEmitter';

export default class Color extends EventEmitter<ColorEvents> {
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
		return ((color.red * 255) << 16) + ((color.green * 255) << 8) + ((color.blue * 255) | 0);
	}

	public static toHexString(color: Color): string {
		return `#${color.toNumber().toString(16)}`;
	}

	public toHexString(): string {
		return Color.toHexString(this);
	}

	public set(red?: number, green?: number, blue?: number, alpha?: number) {
		if (red) this.red = red;
		if (green) this.green = green;
		if (blue) this.blue = blue;
		if (alpha) this.alpha = alpha;
	}

	public toNumber(): number {
		return Color.toNumber(this);
	}

	public invert(): Color {
		return Color.invert(this);
	}
}
