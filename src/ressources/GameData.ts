import AbstractBlock from '../blocks/AbstractBlock';
import SimpleRegistry from './SimpleRegistry';

export const blocks: SimpleRegistry<AbstractBlock> = new SimpleRegistry<AbstractBlock>();
