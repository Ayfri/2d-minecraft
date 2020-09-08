import * as PIXI from 'pixi.js';
import { game } from '../main';
import { ButtonEvents, EventReceiver } from '../types';
import Position from '../utils/Position';
import EventHandler from './input/EventHandler';
import Color from './renderer/Color';
import Sprite from './renderer/Sprite';

export default class Button extends Sprite {
	public readonly position: Position;

	public getAsSprite(): PIXI.Sprite {
		const sprite: PIXI.Sprite = super.getAsSprite();
		// todo: fix text placement.
		const text: PIXI.Text = new PIXI.Text(this.text);
		sprite.tint = this.color.toNumber();
		sprite.alpha = this.color.alpha;
		sprite.addChild(text);

		return sprite;
	}

	public width: number;
	public height: number;
	public color: Color;
	private eventEmitter: EventHandler<ButtonEvents>;

	constructor(public text: string = '') {
		super();
		this.color = new Color(1, 1, 1, 1);
		this.setTexture(PIXI.Texture.WHITE);

		game.eventHandler.on('click', (event: PIXI.InteractionEvent) => {
			let x: number = game.mouseManager.getMousePosition().x;
			let y: number = game.mouseManager.getMousePosition().y;
			if (x > this.position.x && x < this.position.x + this.width && y > this.position.y && y < this.position.y + this.height) {
				this.emit('click', event);
			}
		});

		// This is a "way" to extends EventHandler<ButtonEvents>.
		this.eventEmitter = new EventHandler<ButtonEvents>();
		this.eventEmitter.on.bind(this.on);
		this.eventEmitter.off.bind(this.off);
		this.eventEmitter.once.bind(this.once);
		this.eventEmitter.emit.bind(this.emit);
	}

	public on<K extends keyof ButtonEvents>(event: K, fn: EventReceiver<ButtonEvents[K]>) {}

	public once<K extends keyof ButtonEvents>(event: K, fn: EventReceiver<ButtonEvents[K]>) {}

	public off<K extends keyof ButtonEvents>(event: K, fn: EventReceiver<ButtonEvents[K]>) {}

	public emit<K extends keyof ButtonEvents>(event: K, ...params: ButtonEvents[K]) {
		console.log('oui');
	}
}
