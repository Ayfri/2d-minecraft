import PIXI from '../PIXI';

export default interface ITexturable {
	texture: PIXI.Texture | null;

	setTexture(texture: PIXI.Texture): void;
}
