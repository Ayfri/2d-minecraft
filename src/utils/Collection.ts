export default class Collection<K, V> extends Map<K, V> {
	public constructor() {
		super();
	}

	public toValuesArray(): V[] {
		return Array.from(this.values());
	}

	public toKeysArray(): K[] {
		return Array.from(this.keys());
	}
}
