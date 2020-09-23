import Inventory from '../../inventory/Inventory';
import { game } from '../../main';
import PIXI from '../../PIXI';
import Color from '../renderer/Color';
import Button from './Button';
import Gui from './Gui';

export default class MainGui extends Gui {
	public resetButton: Button;
	public hotbar: Inventory;

	public constructor(public app: PIXI.Application) {
		super(app);

		this.resetButton = new Button('reset', 60, 30, 30, 20);
		this.resetButton.borderPadding = 3;
		this.resetButton.color = new Color(0.9, 0, 0.9);
		this.resetButton.borderColor = new Color(0.2, 0.2, 0.2);
		this.resetButton.showBorder();
		this.resetButton.container.on('click', (): void => {
			game.world.clear();
		});

		this.addObject('resetButton', this.resetButton.container);
	}

	public update() {
		[...this.guiObjects.entries()].forEach((c) => {
			this.removeObject(c[0]);
			this.addObject(...c);
		});
		super.update();
	}
}
