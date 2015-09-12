/// <reference path="Sequence" />
/// <reference path="SingletonIterator" />
/// <reference path="EmptyIterator" />

/**
 * Container object, which may or may not contain a value.
 */
class Optional<T> implements Sequence<T> {
	
	/** Empty optional, which contains no value. */
	private static EMPTY: Optional<any> = new Optional(undefined);
	/** The reference to the value. */
	private mReference: T = undefined;
	
	/** 
	 * Constructor.
	 * @param reference The referenced object.
	 */
	constructor(reference: T) {
		this.mReference = reference;
	}
	
	/**
	 * Returns true, if there is a non-null and non-undefined reference present, false otherwise.
	 */
	public isPresent(): boolean {
		return !this.isAbsent();
	}
	
	/**
	 * Returns true, if there is no non-null and non-undefined reference present, false otherwise.
	 */
	public isAbsent(): boolean {
		return this.mReference === undefined;
	}

	/**
	 * Returns the referenced value, if present, otherwise throws an error.
	 */
	public get(): T {
		if (this.isAbsent()) {
			throw new Error('The element is absent');
		}
		return this.mReference;
	}
	
	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
	 * @param fallback The fallback value to use, if the value is absent.
	 */
	public getOr(fallback: T): T {
		if (fallback === null || fallback === undefined) {
			throw new Error('use orUndefined() or orNull() instead');
		}
		if (this.isPresent()) {
			return this.mReference;
		}
		return fallback;
	}
	
	/**
	 * Returns the referenced value if present, undefined otherwise.
	 */
	public getOrUndefined(): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return undefined;
	}
	
	/**
	 * Returns the referenced value if present, null otherwise.
	 */
	public getOrNull(): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return null;
	}
	
	/**
	 * Returns the referenced value if present, throws the given Error otherwise.
	 */
	public getOrThrow(error: Error): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		throw error;
	}
	
	/**
	 * Constructs an optional with a non-null and non-undefined value. If null or undefined is supplied, an error will be thrown.
	 * @param input The referenced value. May not be null or undefined.
	 */
	public static of<T>(input: T): Optional<T> {
		if (input === undefined || input === null) {
			throw new Error('undefined or null');
		}
		return new Optional<T>(input);
	}
	
	/**
	 * Constructs an optional from the given value, which may be null.
	 * @param input The referenced value. Can be null.
	 */
	public static ofNullable<T>(input: T): Optional<T> {
		if (input === undefined || input === null) {
			return Optional.EMPTY;
		}
		return new Optional<T>(input);
	}
	
	/**
	 * Returns an empty optional (absent), which contains no reference.
	 */
	public static empty<T>(): Optional<T> {
		return Optional.EMPTY;
	}

	toString(): String {
		if (this.isPresent()) {
			return `Present("${ this.mReference.toString() }`;
		}
		return 'Absent()';
	}

	all(predicate: (input: T) => boolean): boolean {
		return this.isPresent() ? predicate(this.get()) : true;
	}

	any(predicate: (input: T) => boolean): boolean {
		return this.isPresent() ? predicate(this.get()) : false;
	}

	at(index: number): Optional<T> {
		return (this.isPresent() && index === 0) ? this : Optional.empty<T>();
	}

	append(other: Sequence<T>): Sequence<T> {
		throw new Error('Not implemented'); // TODO
	}

	average(mapper: (input: T) => number): number {
		return this.isPresent() ? mapper(this.get()) : 0;
	}
	
	contains(item: T, equality: (a: T, b: T) => boolean): boolean {
		return this.indexOf(item, equality) >= 0;
	}

	count(): number {
		return this.isPresent() ? 1 : 0;
	}

	filter(predicate: (input: T) => boolean): Optional<T> {
		return this.isPresent() && predicate(this.get()) ? this : Optional.empty<T>();
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate);
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate);
	}

	flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
		return this.isPresent() ? sequencify(this.get()) : Optional.empty<R>();
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		return this.isPresent() ? reducer(initial, this.get()) : initial;
	}

	forEach(consumer: (input: T) => void): void {
		if (this.isPresent) {
			consumer(this.get());
		}
	}

	head(): Optional<T> {
		return this;
	}
	
	indexOf(item: T, equality?: (a: T, b: T) => boolean): number {
		var eq = equality || ((a, b) => a === b);
		return this.isPresent() ? (eq(item, this.get()) ? 0 : -1) : -1;
	}

	isConsumed(): boolean {
		return false;
	}

	iterator(): Iterator<T> {
		return this.isPresent() ? new SingletonIterator(this.get()) : EmptyIterator.instance<T>();
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		return (prefix || '') + this.isPresent() ? this.get().toString() : '' + (suffix || '');
	}

	last(): Optional<T> {
		return this;
	}

	limit(limit: number): Optional<T> {
		return this.isPresent() && limit > 0 ? this : Optional.empty<T>();
	}

	map<R>(mapper: (input: T) => R): Optional<R> {
		return this.isPresent() ? Optional.ofNullable(mapper(this.get())) : Optional.empty<R>();
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		return this;
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		return this;
	}

	peek(consumer: (input: T) => void): Optional<T> {
		throw new Error('Not implemented'); // TODO
	}

	reduce(reducer: (left: T, right: T) => T): T {
		if (!this.isPresent()) {
			throw new Error('Empty');
		}
		return this.get();
	}

	skip(amount: number): Optional<T> {
		return amount === 0 ? this : Optional.empty<T>();
	}

	skipWhile(predicate: (input: T) => boolean): Optional<T> {
		return this.isPresent() && predicate(this.get()) ? Optional.empty<T>() : this;
	}

	sum(mapper: (input: T) => number): number {
		return this.isPresent() ? mapper(this.get()) : 0;
	}

	tail(): Optional<T> {
		return Optional.empty<T>();
	}

	takeWhile(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate);
	}

	toArray(): Array<T> {
		return this.isPresent() ? [this.get()] : [];
	}

	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Optional<E> {
		throw new Error('Not implemented'); // TODO
	}
}
