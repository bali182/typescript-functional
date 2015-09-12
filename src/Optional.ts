/// <reference path="Sequence" />
/// <reference path="SingletonIterator" />
/// <reference path="EmptyIterator" />

module tsf {
	const none: Optional<any> = {
		isPresent() { return false; },
		isAbsent() { return true; },
		get() { throw new Error('The element is absent'); },
		getOr(fallback: any) { return fallback; },
		getOrUndefined() { return undefined; },
		getOrNull() { return null; },
		getOrThrow(error: Error) { throw error; },
		toString() { return 'Empty()'; },
		all(predicate: (input: any) => boolean) { return true; },
		any(predicate: (input: any) => boolean) { return false; },
		at() { return this; },
		append(other: Sequence<any>): Sequence<any> { throw new Error('Not implemented'); /* TODO */ },
		average(mapper: (input: any) => number) { return 0; },
		contains(item: any, equality: (a: any, b: any) => boolean) { return false; },
		count() { return 0; },
		filter(predicate: (input: any) => boolean) { return this; },
		findFirst(predicate: (input: any) => boolean) { return this; },
		findLast(predicate: (input: any) => boolean) { return this; },
		flatten<R>(sequencify: (input: any) => Sequence<R>) { return this; },
		fold<R>(reducer: (left: R, right: any) => R, initial: R) { return initial; },
		forEach(consumer: (input: any) => void): void { /* no operation */; },
		head() { return this; },
		indexOf(item: any, equality?: (a: any, b: any) => boolean) { return -1; },
		iterator() { return EmptyIterator.instance<any>(); },
		join(separator?: string, prefix?: string, suffix?: string) { return (prefix || '') + (suffix || ''); },
		last() { return this; },
		limit(limit: number) { return this; },
		map<R>(mapper: (input: any) => R) { return this; },
		max(comparator: (first: any, second: any) => number) { return this; },
		min(comparator: (first: any, second: any) => number) { return this; },
		peek(consumer: (input: any) => void): Optional<any> { throw new Error('Not implemented'); /* TODO */ },
		reduce(reducer: (left: any, right: any) => any): any { throw new Error(this.toString()); },
		skip(amount: number) { return this; },
		skipWhile(predicate: (input: any) => boolean) { return this; },
		sum(mapper: (input: any) => number) { return 0; },
		tail() { return this; },
		takeWhile(predicate: (input: any) => boolean) { return this; },
		toArray() { return []; },
		zip<R, E>(other: Sequence<R>, combiner: (first: any, second: R) => E) { return this; }
	};

	/**
	 * Container object, which may or may not contain a value.
	 */
	export class Optional<T> implements Sequence<T> {

		/**
		 * Returns true, if there is a non-null and non-undefined reference present, false otherwise.
		 */
		public isPresent(): boolean {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Returns true, if there is no non-null and non-undefined reference present, false otherwise.
		 */
		public isAbsent(): boolean {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
	
		/**
		 * Returns the referenced value, if present, otherwise throws an error.
		 */
		public get(): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Returns the referenced value if present, otherwise returns the fallback value.
		 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
		 * @param fallback The fallback value to use, if the value is absent.
		 */
		public getOr(fallback: T): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Returns the referenced value if present, undefined otherwise.
		 */
		public getOrUndefined(): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Returns the referenced value if present, null otherwise.
		 */
		public getOrNull(): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Returns the referenced value if present, throws the given Error otherwise.
		 */
		public getOrThrow(error: Error): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
		
		/**
		 * Constructs an optional with a non-null and non-undefined value. If null or undefined is supplied, an error will be thrown.
		 * @param input The referenced value. May not be null or undefined.
		 */
		public static of<T>(input: T): Optional<T> {
			return new Some(input);
		}
		
		/**
		 * Constructs an optional from the given value, which may be null.
		 * @param input The referenced value. Can be null.
		 */
		public static ofNullable<T>(input: T): Optional<T> {
			if (input === undefined || input === null) {
				return none;
			}
			return new Some(input);
		}
		
		/**
		 * Returns an empty optional (absent), which contains no reference.
		 */
		public static empty<T>(): Optional<T> {
			return none;
		}

		all(predicate: (input: T) => boolean): boolean {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		any(predicate: (input: T) => boolean): boolean {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		at(index: number): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		append(other: Sequence<T>): Sequence<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		average(mapper: (input: T) => number): number {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		contains(item: T, equality: (a: T, b: T) => boolean): boolean {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		count(): number {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		filter(predicate: (input: T) => boolean): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		findFirst(predicate: (input: T) => boolean): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		findLast(predicate: (input: T) => boolean): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		forEach(consumer: (input: T) => void): void {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		head(): Optional<T> {
			return this;
		}

		indexOf(item: T, equality?: (a: T, b: T) => boolean): number {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		iterator(): Iterator<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		join(separator?: string, prefix?: string, suffix?: string): string {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		last(): Optional<T> {
			return this;
		}

		limit(limit: number): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		map<R>(mapper: (input: T) => R): Optional<R> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		max(comparator: (first: T, second: T) => number): Optional<T> {
			return this;
		}

		min(comparator: (first: T, second: T) => number): Optional<T> {
			return this;
		}

		peek(consumer: (input: T) => void): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		reduce(reducer: (left: T, right: T) => T): T {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		skip(amount: number): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		skipWhile(predicate: (input: T) => boolean): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		sum(mapper: (input: T) => number): number {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		tail(): Optional<T> {
			return Optional.empty<T>();
		}

		takeWhile(predicate: (input: T) => boolean): Optional<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		toArray(): Array<T> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}

		zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Optional<E> {
			throw new Error('Not implemented, will be removed, once abstract keyword is available.');
		}
	}

		class Some<T> extends Optional<T> {
		/** The reference to the value. */
		private mReferenced: T;
		
		/** 
		 * Constructor.
		 * @param reference The referenced object.
		 */
		constructor(reference: T) {
			super();
			if (reference === undefined || reference === null) {
				throw new Error('undefined or null');
			}
			this.mReferenced = reference;
		}

		public isPresent(): boolean { return true; }
		public isAbsent(): boolean { return false; }
		public get(): T { return this.mReferenced; }
		public getOr(fallback: T): T { return this.get(); }
		public getOrUndefined(): T { return this.get(); }
		public getOrNull(): T { return this.get(); }
		public getOrThrow(error: Error): T { return this.get(); }
		toString(): String { return `Present("${ this.get().toString() }`; }
		all(predicate: (input: T) => boolean): boolean { return predicate(this.get()); }
		any(predicate: (input: T) => boolean): boolean { return this.all(predicate); }
		at(index: number): Optional<T> { return (index === 0) ? this : none; }
		append(other: Sequence<T>): Sequence<T> { throw new Error('Not implemented'); /* TODO */ }
		average(mapper: (input: T) => number): number { return mapper(this.get()); }
		contains(item: T, equality: (a: T, b: T) => boolean): boolean { return this.indexOf(item, equality) >= 0; }
		count(): number { return 1; }
		filter(predicate: (input: T) => boolean): Optional<T> { return predicate(this.get()) ? this : none; }
		findFirst(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		findLast(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> { return sequencify(this.get()); }
		fold<R>(reducer: (left: R, right: T) => R, initial: R): R { return reducer(initial, this.get()); }
		forEach(consumer: (input: T) => void): void { consumer(this.get()); }
		indexOf(item: T, equality?: (a: T, b: T) => boolean): number { return (equality || ((a: T, b: T): boolean => a === b)(item, this.get()) ? 0 : -1); }
		iterator(): Iterator<T> { return new SingletonIterator(this.get()); }
		join(separator?: string, prefix?: string, suffix?: string): string { return (prefix || '') + this.get().toString() + (suffix || ''); }
		limit(limit: number): Optional<T> { return limit > 0 ? this : none; }
		map<R>(mapper: (input: T) => R): Optional<R> { return Optional.ofNullable(mapper(this.get())); }
		peek(consumer: (input: T) => void): Optional<T> { throw new Error('Not implemented'); /* TODO */ }
		reduce(reducer: (left: T, right: T) => T): T { return this.get(); }
		skip(amount: number): Optional<T> { return amount === 0 ? this : none; }
		skipWhile(predicate: (input: T) => boolean): Optional<T> { return predicate(this.get()) ? none : this; }
		sum(mapper: (input: T) => number): number { return mapper(this.get()); }
		takeWhile(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		toArray(): Array<T> { return [this.get()]; }
		zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Optional<E> { throw new Error('Not implemented'); /* TODO */ }
	}
}
