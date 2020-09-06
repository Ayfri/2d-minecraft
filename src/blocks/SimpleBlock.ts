import {BlockType} from '../types';
import AbstractBlock from './AbstractBlock';

export default class SimpleBlock extends AbstractBlock {
	constructor(name: string) {
		super(name);
	}
}