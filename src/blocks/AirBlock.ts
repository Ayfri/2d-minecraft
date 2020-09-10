import { BlockType } from '../types';
import AbstractBlock from './AbstractBlock';

export default class AirBlock extends AbstractBlock {
	constructor(name: string) {
		super(name, BlockType.AIR);
	}
}
