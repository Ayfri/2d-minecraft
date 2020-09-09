import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import TilePosition from '../../utils/TilePosition';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;

	public constructor(public block: AbstractBlock, public position: TilePosition) {
		super(block, position);
	}

	public fall(): void {
		this.position.y--;
		this.updateState();
	}

	public update(): void {
		this.updateState();
		if (this.canFall) this.fall();
	}

	public updateState(): void {
		this.canFall = !game.world.getTileAt(this.position.subtract(0, 1)) || game.world.getTileAt(this.position.subtract(0, 1))?.isAir;
	}
}
