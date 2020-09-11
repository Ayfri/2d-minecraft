import * as PIXI from 'pixi.js';
import IShowable from '../client/IShowable';
import Tile from '../client/renderer/Tile';
import { game } from '../main';
import { blocks } from '../ressources/GameData';
import { StringTilePosition } from '../types';
import ChunkPosition from '../utils/ChunkPosition';
import Position from '../utils/Position';
import TilePosition from '../utils/TilePosition';

export default class Chunk implements IShowable {
	public isShow: boolean;

	public show(): void {
		if (this.isShow) return;
		this.isShow = true;
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
			game.app.stage.addChild(t.getAsSprite());
		});
	}

	public hide(): void {
		if (!this.isShow) return;
		this.isShow = false;
		this.tiles.forEach((t) => {
			game.app.stage.removeChild(t.getAsSprite());
		});
	}

	public readonly tiles: Map<StringTilePosition, Tile> = new Map<StringTilePosition, Tile>();
	private container: PIXI.Container;

	public constructor(public position: ChunkPosition) {
		this.container = new PIXI.Container();
		this.fillWithAir();
	}

	public setTile(tile: Tile): Tile {
		const stringTilePosition: StringTilePosition = tile.position.stringify();
		if (this.tiles.has(stringTilePosition)) {
			game.app.stage.removeChild(this.tiles.get(stringTilePosition).sprite);
			this.tiles.delete(stringTilePosition);
		}

		this.tiles.set(stringTilePosition, tile);
		tile.addToApplication(game.app);
		return tile;
	}

	public clear(): void {
		this.tiles.forEach((t) => t.destroy());
		this.tiles.clear();
		this.fillWithAir();
	}

	public getTileAt(position: TilePosition): Tile | null {
		if (!this.tiles.has(position.stringify())) {
			return null;
		}

		return this.tiles.get(position.stringify());
	}

	public update(): void {
		const canHide = this.canHide();
		if (canHide) {
			this.hide();
		} else {
			this.show();
		}

		this.tiles.forEach((t) => {
			if (this.isShow) {
				game.app.stage.removeChild(t.getAsSprite());
				game.app.stage.addChild(t.getAsSprite());
			}

			t.update();
		});
	}

	private canHide(): boolean {
		const position: Position = this.position.toTilePosition().toPosition();
		return (
			position.x < game.player.position.x - game.renderer.resolution * 20 ||
			position.x > game.player.position.x + game.renderer.resolution * 20 ||
			position.y < game.player.position.y - game.renderer.resolution * 10 ||
			position.y > game.player.position.y + game.renderer.resolution * 10
		);
	}

	private fillWithAir(): void {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 16; j++) {
				const position = new TilePosition(i, j).addTilePosition(this.position.toTilePosition());
				this.setTile(new Tile(blocks.get('air'), position));
			}
		}
	}
}
