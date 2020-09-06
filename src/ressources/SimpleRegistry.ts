import AbstractRegistry from './AbstractRegistry';

export default class SimpleRegistry<K> extends AbstractRegistry<K> {
	public isEmpty(): boolean {
		return this.size === 0;
	}
	
	public register<J extends K>(key: string, value: K | J): AbstractRegistry<K> {
		this.set(key, value);
		return this;
	}
}