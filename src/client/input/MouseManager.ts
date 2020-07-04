import * as PIXI from 'pixi.js';
import Position from '../../utils/Position';

export default class MouseManager {
	public mouse: PIXI.InteractionData;
	
	constructor(public readonly app: PIXI.Application) {
		this.mouse = app.renderer.plugins.interaction.mouse;
	}
	
	public getMousePosition(): Position {
		return new Position(this.mouse.global.x, this.mouse.global.y);
	}
}