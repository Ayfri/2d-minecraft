export default abstract class Registry<K> extends Map<string, K> {
	public static register<T>(registry: Registry<T>, key: string, value: T): Registry<T> {
		return registry.set(key, value);
	}
	
	public abstract isEmpty(): boolean;
	
	public abstract register<J extends K>(key: string, value: K | J): Registry<K>;
	
	public get<J extends K>(key: string): K | J {
		return super.get(key);
	};
}

// especially a subclass type