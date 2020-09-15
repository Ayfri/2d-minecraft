import * as PIXI from 'pixi.js';
import { Path } from '../types';

export default class TextureManager {
	public constructor(public app: PIXI.Application) {
		this.preLoadTexture('./assets/sprites/background.png', 'background');
	}

	public preLoadTexture(path: Path, name: string): void {
		this.app.loader.add(name, path);
	}

	public getTexture(name: string): PIXI.Texture {
		return this.app.loader.resources[name]?.texture;
	}
}
