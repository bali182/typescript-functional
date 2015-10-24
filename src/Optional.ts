/// <reference path="Sequence" />
/// <reference path="Iterator" />
/// <reference path="EmptyIterator" />
/// <reference path="PeekingIterator" />
/// <reference path="IterableSequence" />
/// <reference path="Iterators" />

module tsf {
	/** Absent singleton optional. Shouldn't be used/changed from outside of this context directly. */
	const absent: Optional<any> = {
		isPresent(): boolean { return false; },
		isAbsent(): boolean { return true; },
		get(): any { throw new Error(this.toString()); },
		getOr(fallback: any): any { return fallback; },
		getOrUndefined(): any { return undefined; },
		getOrNull(): any { return null; },
		getOrThrow(error: Error): any { throw error; },
		toString(): string { return 'absent()'; },
		all(predicate: (input: any) => boolean): boolean { return true; },
		any(predicate: (input: any) => boolean): boolean { return false; },
		at(): any { return this; },
		append(other: Sequence<any>): Sequence<any> { return other; },
		average(mapper: (input: any) => number): number { return 0; },
		contains(item: any, equality?: (a: any, b: any) => boolean): boolean { return false; },
		count(): number { return 0; },
		filter(predicate: (input: any) => boolean): Optional<any> { return this; },
		findFirst(predicate: (input: any) => boolean): Optional<any> { return this; },
		findLast(predicate: (input: any) => boolean): Optional<any> { return this; },
		flatten<R>(sequencify: (input: any) => Sequence<R>): Sequence<R> { return this; },
		fold<R>(reducer: (left: R, right: any) => R, initial: R): R { return initial; },
		forEach(consumer: (input: any) => void): void { /* no operation */; },
		head(): Optional<any> { return this; },
		indexOf(item: any, equality?: (a: any, b: any) => boolean): Optional<number> { return this; },
		iterator(): Iterator<any> { return EmptyIterator.instance<any>(); },
		join(separator?: string, prefix?: string, suffix?: string): string { return (prefix || '') + (suffix || ''); },
		last(): Optional<any> { return this; },
		limit(limit: number): Optional<any> { return this; },
		map<R>(mapper: (input: any) => R): Optional<R> { return this; },
		max(comparator: (first: any, second: any) => number): Optional<any> { return this; },
		min(comparator: (first: any, second: any) => number): Optional<any> { return this; },
		peek(consumer: (input: any) => void): Optional<any> { return this; },
		reduce(reducer: (left: any, right: any) => any): Optional<any> { return this; },
		skip(amount: number): Optional<any> { return this; },
		skipWhile(predicate: (input: any) => boolean): Optional<any> { return this; },
		sum(mapper: (input: any) => number): number { return 0; },
		tail(): Optional<any> { return this; },
		takeWhile(predicate: (input: any) => boolean): Optional<any> { return this; },
		toArray(): Array<any> { return []; },
		zip<R, E>(other: Sequence<R>, combiner: (first: any, second: R) => E): Optional<E> { return this; }
	};
	
	export abstract class Optional<T> implements Sequence<T>  {
		
		/** Returns true, if there is a non-null and non-undefined reference present, false otherwise. */
		abstract isPresent(): boolean;
		
		/** Returns true, if there is no non-null and non-undefined reference present, false otherwise. */
		abstract isAbsent(): boolean;
	
		/** Returns the referenced value, if present, otherwise throws an error. */
		abstract get(): T;
		
		
		/** Returns the referenced value if present, undefined otherwise. */
		abstract getOrUndefined(): T;
		
		/** Returns the referenced value if present, null otherwise. */
		abstract getOrNull(): T;
		
		/** Returns the referenced value if present, throws the given Error otherwise. */
		abstract getOrThrow(error: Error): T;
		
		/**
		 * Returns the referenced value if present, otherwise returns the fallback value.
		 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
		 * @param fallback The fallback value to use, if the value is absent.
		 */
		abstract getOr(fallback: T): T;
		
		/**
		 * Constructs an optional with a non-null and non-undefined value. If null or undefined is supplied, an error will be thrown.
		 * @param input The referenced value. May not be null or undefined.
		 */
		public static of<T>(input: T): Optional<T> {
			return new Present(input);
		}
		
		/**
		 * Constructs an optional from the given value, which may be null.
		 * @param input The referenced value. Can be null.
		 */
		public static ofNullable<T>(input: T): Optional<T> {
			if (input === undefined || input === null) {
				return absent;
			}
			return new Present(input);
		}
		
		/** Returns an empty optional (absent), which contains no reference. */
		public static empty<T>(): Optional<T> {
			return absent;
		}
		
		// These work for any Optional<T>, since value presence doesn't matter.
		max(comparator: (first: T, second: T) => number): Optional<T> { return this; }
		min(comparator: (first: T, second: T) => number): Optional<T> { return this; }
		head(): Optional<T> { return this; }
		last(): Optional<T> { return this; }
		tail(): Sequence<T> { return absent; }
		
		// Sadly abstract classes still won't allow to implement an interface, 
		// without redeclaring all the methods the interface has.
		abstract all(predicate: (input: T) => boolean): boolean;
		abstract any(predicate: (input: T) => boolean): boolean;
		abstract at(index: number): Optional<T>;
		abstract append(other: Sequence<T>): Sequence<T>;
		abstract average(mapper: (input: T) => number): number;
		abstract contains(item: T, equality?: (a: T, b: T) => boolean): boolean;
		abstract count(): number;
		abstract filter(predicate: (input: T) => boolean): Sequence<T>;
		abstract findFirst(predicate: (input: T) => boolean): Optional<T>;
		abstract findLast(predicate: (input: T) => boolean): Optional<T>;
		abstract flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R>;
		abstract fold<R>(reducer: (left: R, right: T) => R, initial: R): R;
		abstract forEach(consumer: (input: T) => void): void;
		abstract indexOf(item: T, equality?: (a: T, b: T) => boolean): Optional<number>;
		abstract iterator(): Iterator<T>;
		abstract join(separator?: string, prefix?: string, suffix?: string): string;
		abstract limit(limit: number): Sequence<T>;
		abstract map<R>(mapper: (input: T) => R): Sequence<R>;
		abstract peek(consumer: (input: T) => void): Sequence<T>;
		abstract reduce(reducer: (left: T, right: T) => T): Optional<T>;
		abstract skip(amount: number): Sequence<T>;
		abstract skipWhile(predicate: (input: T) => boolean): Sequence<T>;
		abstract sum(mapper: (input: T) => number): number;
		abstract takeWhile(predicate: (input: T) => boolean): Sequence<T>;
		abstract toArray(): Array<T>;
		abstract zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E>;
	}
	
	/** This class is supposed to be package private. Helps iterating a Present value. */
	class PresentIterator<T> implements Iterator<T> {
		private mItem: Present<T>;
		private mConsumed: boolean = false;

		constructor(item: Present<T>) {
			this.mItem = item;
		}

		next(): T {
			if (!this.hasNext()) {
				throw new Error('Already iterated');
			}
			this.mConsumed = true;
			return this.mItem.get();
		}

		hasNext(): boolean { return !this.mConsumed; }
		isFinite(): boolean { return true; }
	}
	
	/** Optional with a present value. */
	class Present<T> extends Optional<T> {
		/** The reference to the value. */
		private mReferenced: T;
		
		/** The iterator factory. */
		private mIteratorFactory: () => Iterator<T>;
		
		/** 
		 * Constructor.
		 * @param reference The referenced object.
		 */
		constructor(reference: T, iteratorFactory?: () => Iterator<T>) {
			super();
			if (reference === undefined || reference === null) {
				throw new Error('' + reference);
			}
			this.mReferenced = reference;
			this.mIteratorFactory = iteratorFactory ? iteratorFactory : () => new PresentIterator(this);
		}

		isPresent(): boolean { return true; }
		isAbsent(): boolean { return false; }
		get(): T { return this.mReferenced; }
		getOr(fallback: T): T { return this.get(); }
		getOrUndefined(): T { return this.get(); }
		getOrNull(): T { return this.get(); }
		getOrThrow(error: Error): T { return this.get(); }
		toString(): String { return `present("${ this.get().toString() }`; }
		all(predicate: (input: T) => boolean): boolean { return predicate(this.get()); }
		any(predicate: (input: T) => boolean): boolean { return this.all(predicate); }
		at(index: number): Optional<T> { return (index === 0) ? this : absent; }
		average(mapper: (input: T) => number): number { return mapper(this.get()); }
		contains(item: T, equality: (a: T, b: T) => boolean): boolean { return this.indexOf(item, equality).isPresent(); }
		count(): number { return 1; }
		filter(predicate: (input: T) => boolean): Optional<T> { return predicate(this.get()) ? this : absent; }
		findFirst(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		findLast(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> { return sequencify(this.get()); }
		fold<R>(reducer: (left: R, right: T) => R, initial: R): R { return reducer(initial, this.get()); }
		forEach(consumer: (input: T) => void): void { consumer(this.get()); }
		indexOf(item: T, equality?: (a: T, b: T) => boolean): Optional<number> { return (equality || ((a: T, b: T): boolean => a === b)(item, this.get()) ? new Present(0) : absent); }
		iterator(): Iterator<T> { return this.mIteratorFactory(); }
		join(separator?: string, prefix?: string, suffix?: string): string { return (prefix || '') + this.get().toString() + (suffix || ''); }
		limit(limit: number): Optional<T> { return limit > 0 ? this : absent; }
		map<R>(mapper: (input: T) => R): Optional<R> { return Optional.ofNullable(mapper(this.get())); }
		peek(consumer: (input: T) => void): Optional<T> { return new Present(this.get(), () => new PeekingIterator(this.iterator(), consumer)); }
		reduce(reducer: (left: T, right: T) => T): Optional<T> { return this; }
		skip(amount: number): Optional<T> { return amount === 0 ? this : absent; }
		skipWhile(predicate: (input: T) => boolean): Optional<T> { return predicate(this.get()) ? absent : this; }
		sum(mapper: (input: T) => number): number { return mapper(this.get()); }
		takeWhile(predicate: (input: T) => boolean): Optional<T> { return this.filter(predicate); }
		toArray(): Array<T> { return [this.get()]; }
		append(other: Sequence<T>): Sequence<T> { return new IterableSequence(() => Iterators.append(this.iterator(), other.iterator())); }
		zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Optional<E> {
			var otherIt = other.iterator();
			return otherIt.hasNext() ? Optional.ofNullable(combiner(this.get(), otherIt.next())) : absent;
		}
	}
}
