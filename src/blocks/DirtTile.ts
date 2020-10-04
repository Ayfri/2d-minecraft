import { game } from '../main';
import { BlockType } from '../types';
import TilePosition from '../utils/TilePosition';
import { sleep } from '../utils/Utils';
import Block from './Block';
import Blocks from './Blocks';
import Tile from './Tile';

export default class DirtBlock extends Tile {
	public constructor(block: Block, position: TilePosition) {
		super(block, position);

		this.on('tick', async () => {
			await this.updateState();
		});
	}

	public async updateState() {
		if (this.canTransformToGrass()) {
			await sleep(5000 + Math.random() * 100 * 1000);
			game.world.replaceBlock(Blocks.GRASS, this.position);
		}
	}

	public canTransformToGrass(): boolean {
		const potentialGrassBlocks = this.getNeighbors()
			.toValuesArray()
			.filter((t) => t && t.position.y === this.position.y);
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(1, 1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(1, -1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(-1, -1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(-1, 1)));

		return potentialGrassBlocks.filter((t) => t.block.type === BlockType.GRASS).length > 0 && this.isExposedToSky();
	}
}
