import { game } from '../main';
import TilePosition from '../utils/TilePosition';
import { sleep } from '../utils/Utils';
import Block from './Block';
import Blocks from './Blocks';
import Tile from './Tile';

export default class GrassTile extends Tile {
	public constructor(public block: Block, position: TilePosition) {
		super(block, position);

		this.on('place', async () => {
			await this.updateState();
		});

		this.on('tick', async () => {
			await this.updateState();
		});
	}

	public async updateState(): Promise<void> {
		if (!this.isExposedToSky()) {
			await sleep(5000 + Math.random() * 50000);
			game.world.removeTile(this.position);
			game.world.placeBlock(Blocks.DIRT, this.position);
		}
	}

	public isExposedToSky(): boolean {
		return game.world.tiles
			.toValuesArray()
			.filter((t) => t.position.x === this.position.x && t.position.y < this.position.y)
			.every((t) => t.isAir);
	}
}
