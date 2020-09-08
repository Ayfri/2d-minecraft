import { game } from '../../main';

export default class GameRenderer {
	public get resolution(): number {
		return this._resolution;
	}

	public set resolution(value: number) {
		this._resolution = value;
		game.world.update();
	}
	private _resolution: number = 32;

	constructor() {}
}
