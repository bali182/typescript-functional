/// <reference path="Iterator" />
/// <reference path="Sequence" />
/// <reference path="Optional" />
/// <reference path="ArrayIterator" />
/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />
/// <reference path="PeekingIterator" />
/// <reference path="SkipWhileIterator" />
/// <reference path="TakeWhileIterator" />
/// <reference path="ZipIterator" />
/// <reference path="ChainableIterator" />
/// <reference path="Iterators" />

module tsf {
	/** Sequence, which operates on an iterator. */
	export class IterableSequence<T> implements Sequence<T> {
		/** The delegeate iterator */
		private mIterable: () => Iterator<T>;
		
		/**
		 * Constructor.
		 * @param iterator The delegeate iterator
		 * @param iterated Flag indicating if the Sequence was already iterated or not.
		 */
		constructor(iterable: () => Iterator<T>) {
			this.mIterable = iterable;
		}

		all(predicate: (input: T) => boolean): boolean {
			return Iterators.all(this.iterator(), predicate);
		}

		any(predicate: (input: T) => boolean): boolean {
			return Iterators.any(this.iterator(), predicate);
		}

		at(index: number): Optional<T> {
			return Iterators.at(this.iterator(), index);
		}

		append(other: Sequence<T>): Sequence<T> {
			return new IterableSequence(() => Iterators.append(this.iterator(), other.iterator()));
		}

		average(mapper: (input: T) => number): number {
			return Iterators.average(this.map(mapper).iterator());
		}

		contains(item: T, equality?: (a: T, b: T) => boolean): boolean {
			return this.indexOf(item, equality).isPresent();
		}

		count(): number {
			return Iterators.count(this.iterator());
		}

		filter(predicate: (input: T) => boolean): Sequence<T> {
			return new IterableSequence(() => new FilteringIterator(this.iterator(), predicate));
		}

		findFirst(predicate: (input: T) => boolean): Optional<T> {
			return this.filter(predicate).head();
		}

		findLast(predicate: (input: T) => boolean): Optional<T> {
			return this.filter(predicate).last();
		}

		flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
			return new IterableSequence<R>(() =>
				new ConcatenatingIterator<R>(
					this.map(sequencify).map(seq => seq.iterator()).iterator()
				)
			);
		}

		fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
			return Iterators.fold(this.iterator(), reducer, initial);
		}

		forEach(consumer: (input: T) => void): void {
			return Iterators.forEach(this.iterator(), consumer);
		}

		head(): Optional<T> {
			return Iterators.head(this.iterator());
		}

		indexOf(item: T, equality?: (a: T, b: T) => boolean): Optional<number> {
			return Iterators.indexOf(this.iterator(), item, equality);
		}

		iterator(): Iterator<T> {
			return this.mIterable();
		}

		join(separator?: string, prefix?: string, suffix?: string): string {
			return Iterators.join(this.map(e => "" + e).iterator(), separator, prefix, suffix);
		}

		last(): Optional<T> {
			return Iterators.last(this.iterator());
		}

		limit(limit: number): Sequence<T> {
			return new IterableSequence(() => Iterators.limit(this.iterator(), limit));
		}

		map<R>(mapper: (input: T) => R): Sequence<R> {
			return new IterableSequence(() => Iterators.map(this.iterator(), mapper));
		}

		max(comparator: (first: T, second: T) => number): Optional<T> {
			return Iterators.max(this.iterator(), comparator);
		}

		min(comparator: (first: T, second: T) => number): Optional<T> {
			return Iterators.min(this.iterator(), comparator);
		}

		peek(consumer: (input: T) => void): Sequence<T> {
			return new IterableSequence(() => Iterators.peek(this.iterator(), consumer));
		}

		reduce(reducer: (left: T, right: T) => T): Optional<T> {
			return Iterators.reduce(this.iterator(), reducer);
		}

		skip(amount: number): Sequence<T> {
			return new IterableSequence(() => Iterators.skip(this.iterator(), amount));
		}

		skipWhile(predicate: (input: T) => boolean): Sequence<T> {
			return new IterableSequence(() => Iterators.skipWhile(this.iterator(), predicate));
		}

		sum(mapper: (input: T) => number): number {
			return Iterators.sum(this.map(mapper).iterator());
		}

		tail(): Sequence<T> {
			return new IterableSequence(() => Iterators.tail(this.iterator()));
		}

		takeWhile(predicate: (input: T) => boolean): Sequence<T> {
			return new IterableSequence(() => Iterators.takeWhile(this.iterator(), predicate));
		}

		toArray(): Array<T> {
			return Iterators.toArray(this.iterator());
		}

		zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
			return new IterableSequence(() => Iterators.zip(this.iterator(), other.iterator(), combiner));
		}

		toString() {
			return `sequence(${this.join(', ') })`;
		}
	}
}
