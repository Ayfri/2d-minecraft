import Registry from './Registry';

export default class SimpleRegistry<K> extends Registry<K> {
	public isEmpty(): boolean {
		return this.size === 0;
	}
	
	public register<J extends K>(key: string, value: K | J): Registry<K> {
		this.set(key, value);
		return this;
	}
}