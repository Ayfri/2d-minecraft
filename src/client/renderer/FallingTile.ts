import AbstractBlock from '../../blocks/AbstractBlock';
import { game } from '../../main';
import TilePosition from '../../utils/TilePosition';
import Tile from './Tile';

export default class FallingTile extends Tile {
	public canFall: boolean = false;
	private belowTile: Tile;

	public constructor(public block: AbstractBlock, public position: TilePosition) {
		super(block, position);
	}

	public fall(): void {
		this.updateState();
		game.world.removeBlock(this.position);
		this.position.y++;
		game.world.placeTile(this);
	}

	public update(): void {
		this.belowTile = game.world.getTileAt(this.position.add(0, 1));
		this.updateState();
		if (this.canFall) this.fall();
	}

	public updateState(): void {
		this.canFall = this.belowTile.isAir && this.position.y < 100;
	}
}
