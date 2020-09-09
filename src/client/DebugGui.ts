import { game } from '../main';
import TilePosition from '../utils/TilePosition';
import { Gui } from './Gui';
import * as PIXI from 'pixi.js';

export default class DebugGui extends Gui {
	public mouseCoordsText: PIXI.Text;

	public constructor(public app: PIXI.Application) {
		super(app);
		this.mouseCoordsText = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.mouseCoordsText.position.set(window.innerWidth - 200, 50);
		this.addPIXISprite('mouseCoordsText', this.mouseCoordsText);
	}

	public update(): void {
		const mousePosition = TilePosition.fromPositionToShortTilePosition(game.mouseManager.getMousePosition());
		this.mouseCoordsText.text = `x: ${mousePosition.x}, y: ${mousePosition.y}`;
	}
}
