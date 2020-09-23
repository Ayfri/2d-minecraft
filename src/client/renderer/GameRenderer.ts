import { game } from '../../main';

export default class GameRenderer {
	constructor() {}

	private _resolution: number = 32;

	public get resolution(): number {
		return this._resolution;
	}

	public set resolution(value: number) {
		this._resolution = value;
		game.world.update();
	}
}
