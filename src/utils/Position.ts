import { Directions, StringPosition } from '../types';
import IPosition from './IPosition';

export default class Position implements IPosition {
	constructor(public x: number = 0, public y: number = 0) {}

	public static fromPosition(position: Position): Position {
		return new Position(position.x, position.y);
	}

	public equals(position: IPosition): boolean {
		return this.x === position.x && this.y === position.y;
	}

	public stringify(): StringPosition {
		return JSON.stringify(this);
	}

	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}]`;
	}

	public set(x: number, y: number): this {
		this.x = x;
		this.y = y;

		return this;
	}

	public addPosition(position: Position): this {
		this.x += position.x;
		this.y += position.y;
		return this;
	}

	public add(x: number, y: number): Position {
		return new Position(this.x + x, this.y + y);
	}

	public addWithDirection(direction: Directions, length: number) {
		let x;
		let y;
		switch (direction) {
			case Directions.UP:
				x = 0;
				y = -length;
				break;

			case Directions.DOWN:
				x = 0;
				y = length;
				break;

			case Directions.LEFT:
				x = -length;
				y = 0;
				break;

			case Directions.RIGHT:
				x = length;
				y = 0;
				break;
		}

		return this.add(x, y).copy();
	}

	public copy(): Position {
		return new Position(this.x, this.y);
	}

	public multiply(ratio: number, y?: number): Position;

	public multiply(x: number, y: number): Position {
		return typeof y === 'undefined' ? new Position(this.x * x, this.y * x) : new Position(this.x * x, this.y * y);
	}

	public subtract(x: number = 0, y: number = 0): Position {
		return this.add(-x, -y);
	}

	public round(): Position {
		return new Position(Math.round(this.x), Math.round(this.y));
	}

	public divide(ratio: number): Position {
		return new Position(this.x / ratio, this.y / ratio);
	}

	public distanceFrom(position: Position) {
		return Math.abs(position.x - this.x) + Math.abs(position.y - this.y);
	}
}
