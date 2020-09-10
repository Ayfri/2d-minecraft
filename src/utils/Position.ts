import { StringPosition } from '../types';
import IPosition from './IPosition';

export default class Position implements IPosition {
	constructor(public x: number = 0, public y: number = 0) {}

	public static fromPosition(position: Position): Position {
		return new Position(position.x, position.y);
	}

	public set(x: number, y: number): this {
		this.x = x;
		this.y = y;

		return this;
	}

	public addPosition(position: Position): Position {
		return this.add(position.x, position.y);
	}

	public add(x: number, y: number): Position {
		return new Position(this.x + x, this.y + y);
	}

	public multiply(ratio: number): Position;
	public multiply(x: number, y?: number): Position {
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

	public stringify(): StringPosition {
		return JSON.stringify(this);
	}

	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}]`;
	}
}
