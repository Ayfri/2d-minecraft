export default interface IPosition {
	x: number;
	y: number;

	equals(position: IPosition): boolean;

	stringify(): string;

	toString(): string;
}
