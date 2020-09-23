import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import { Directions } from '../../types';
import Position from '../../utils/Position';
import TilePosition from '../../utils/TilePosition';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;
	public motion: Position;
	public renderedPosition: TilePosition;
	private isFalling: boolean = false;
	private belowTile: Tile;

	public constructor(public block: AbstractBlock, public position: TilePosition) {
		super(block, position);
		this.renderedPosition = position.copy();
		this.motion = new Position(0, 0);
	}

	public getAsSprite(): PIXI.Sprite {
		this.sprite.setTransform(this.renderedPosition.toPosition().x, this.renderedPosition.toPosition().y, game.renderer.resolution / 16, game.renderer.resolution / 16);
		return this.sprite;
	}

	public update(): void {
		this.updateState();

		if (this.isFalling) {
			this.motion.y = this.motion.y > 0.4 ? this.motion.y : this.motion.y + 0.005;
			this.renderedPosition.addPosition(this.motion);
			if (!this.renderedPosition.round().equals(this.position)) {
				game.world.removeBlock(this.position);
				this.position = this.renderedPosition.round();
				game.world.placeTile(this);
			}
		}

		if (this.canFall) {
			this.isFalling = true;
		} else {
			this.isFalling = false;
			this.motion.set(0, 0);
			this.renderedPosition = this.position;
		}
	}

	public updateState(): void {
		this.belowTile = this.getNeighbor(Directions.DOWN);
		this.canFall = this.belowTile.isAir && this.position.y < 50;
	}
}
