export default abstract class AbstractRegistry<K> extends Map<string, K> {
	public static register<T>(registry: AbstractRegistry<T>, key: string, value: T): AbstractRegistry<T> {
		return registry.set(key, value);
	}

	public abstract isEmpty(): boolean;

	public abstract register<J extends K>(key: string, value: K | J): AbstractRegistry<K>;

	public get<J extends K>(key: string): K | J {
		return super.get(key);
	}
}
