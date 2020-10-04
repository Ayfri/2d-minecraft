import TilePosition from '../utils/TilePosition';
import { sleep } from '../utils/Utils';
import Block from './Block';
import Blocks from './Blocks';
import Tile from './Tile';

export default class GrassTile extends Tile {
	public constructor(block: Block, position: TilePosition) {
		super(block, position);

		this.on('tick', async () => {
			await this.updateState();
		});
	}

	public async updateState(): Promise<void> {
		if (!this.isExposedToSky() && Math.random() < 0.001) {
			this.replaceTo(Blocks.DIRT);
		}
	}
}
