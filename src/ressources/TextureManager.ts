import PIXI from '../PIXI';
import { Path } from '../types';
import Collection from '../utils/Collection';

export default class TextureManager {
	private readonly savedTextures: Collection<string, PIXI.Texture>;

	public constructor(public app: PIXI.Application) {
		this.savedTextures = new Collection();
		this.preLoadTexture('./assets/sprites/background.png', 'background');
	}

	public preLoadTexture(path: Path, name: string): void {
		this.app.loader.add(name, path);
	}

	public getTexture(name: string): PIXI.Texture | undefined {
		const texture: PIXI.Texture | undefined = this.app.loader.resources[name]?.texture;
		if (texture && !this.savedTextures.has(name)) this.savedTextures.set(name, texture);
		return texture;
	}

	public getTextures(): Collection<string, PIXI.Texture> {
		return this.savedTextures;
	}
}
