export default class Collection<K, V> extends Map<K, V> {
	public toValuesArray(): V[] {
		return [...this.values()];
	}

	public toKeysArray(): K[] {
		return [...this.keys()];
	}

	public constructor() {
		super();
	}
}
