import { game } from '../main';
import { BlockType } from '../types';
import TilePosition from '../utils/TilePosition';
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
		if (this.canTransformToGrass() && Math.random() < 0.0005) {
			this.replaceTo(Blocks.GRASS);
		}
	}

	public canTransformToGrass(): boolean {
		const potentialGrassBlocks = [];
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(1, 0)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(-1, 0)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(1, 1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(1, -1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(-1, -1)));
		potentialGrassBlocks.push(game.world.getTileAt(this.position.add(-1, 1)));

		return potentialGrassBlocks.filter((t) => t.block.type === BlockType.GRASS).length > 0 && this.isExposedToSky();
	}
}
