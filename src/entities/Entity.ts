import PIXI from '../PIXI';
import Position from '../utils/Position';

export default abstract class Entity {
	public velocity: Position;
	public position: Position;
	public sprite: PIXI.Sprite;

	protected constructor() {
		this.sprite = new PIXI.Sprite();
		this.velocity = new Position();
	}

	public update(): void {
		this.updatePosition();
	}

	public move(x: number, y: number): void {
		this.velocity.x = x;
		this.velocity.y = y;
	}

	protected updatePosition(): void {
		this.position.add(this.velocity.x, this.velocity.y);
	}
}
