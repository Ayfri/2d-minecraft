export default class ChunkPosition {
	constructor(public x: number, public y: number) {
	}
	
	public toString(): string {
		return `[x: ${this.x}, y: ${this.y}]`;
	}
}