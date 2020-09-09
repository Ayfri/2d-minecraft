import { BlockType } from '../types';
import AbstractBlock from './AbstractBlock';

export default class FallingBlock extends AbstractBlock {
	constructor(props) {
		super(props, BlockType.FALLING);
	}
}
