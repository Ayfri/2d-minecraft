export default class Color {
	constructor(public red: number = 0, public green: number = 0, public blue: number = 0, public alpha: number = 1) {}

	public static invert(color: Color): Color {
		return new Color(-color.red + 1, -color.green + 1, -color.blue + 1, color.alpha);
	}

	public static toNumber(color: Color): number {
		return color.red * 256 * color.green * 256 * color.blue * 256 - 1;
	}

	public toNumber(): number {
		return Color.toNumber(this);
	}

	public invert(): Color {
		return Color.invert(this);
	}
}
