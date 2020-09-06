import Sprite from '../client/renderer/Sprite';
import Position from '../utils/Position';

export default abstract class Entity extends Sprite {
	public velocity: Position;

	protected constructor() {
		super();
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
