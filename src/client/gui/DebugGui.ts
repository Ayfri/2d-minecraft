import { game } from '../../main';
import PIXI from '../../PIXI';
import TilePosition from '../../utils/TilePosition';
import Gui from './Gui';

export default class DebugGui extends Gui {
	public mouseCoordsText: PIXI.Text;
	public mouseBlockText: PIXI.Text;
	public fpsCounter: PIXI.Text;
	public debugText: PIXI.Text;

	public constructor(public app: PIXI.Application) {
		super(app);
		this.mouseCoordsText = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.fpsCounter = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.mouseBlockText = new PIXI.Text('', new PIXI.TextStyle({ fill: '#ffffff' }));
		this.debugText = new PIXI.Text(
			'',
			new PIXI.TextStyle({
				fill: '#ffffff',
				fontSize: 16,
			})
		);

		this.fpsCounter.position.set(window.innerWidth - 200, 20);
		this.mouseCoordsText.position.set(window.innerWidth - 200, 50);
		this.mouseBlockText.position.set(window.innerWidth - 200, 80);
		this.debugText.position.set(10, 50);
		this.addSprite('mouseCoordsText', this.mouseCoordsText);
		this.addSprite('mouseBlockText', this.mouseBlockText);
		this.addSprite('fpsCounter', this.fpsCounter);
		this.addSprite('debugText', this.debugText);
	}

	public update(): void {
		const mousePosition = TilePosition.fromPositionToTilePosition(game.mouseManager.getMousePosition());
		this.mouseCoordsText.text = `x: ${mousePosition.x}, y: ${mousePosition.y}`;
		this.fpsCounter.text = `FPS: ${game.app.ticker.FPS.toFixed()}`;
		this.mouseBlockText.text = `Block : ${game.world.getTileAtOrUndefined(game.player.tileOn)?.block.name ?? 'air'}`;
		this.debugText.text = game.world.tiles.size.toString();
	}
}
