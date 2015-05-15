/// <reference path="Iterator" />
/// <reference path="Iterators" />
/// <reference path="Stream" />
/// <reference path="Collector" />
/// <reference path="Collectors" />

/**
 * Stream, which operates on an iterator.
 */
class IteratorStream<T> implements Stream<T>{
	/** The delegeate iterator */
	private mIterator: Iterator<T>
	/** Flag indicating if the Stream was already iterated or not. */
	private mIterated: boolean;
	
	/**
	 * Constructor.
	 * @param iterator The delegeate iterator
	 * @param iterated Flag indicating if the Stream was already iterated or not.
	 */
	constructor(iterator: Iterator<T>, iterated?: boolean) {
		this.mIterator = iterator;
		this.mIterated = !!iterated;
	}
	
	/** Throws an exception if the Stream is already iterated. */
	private checkIterated(): void {
		if (this.mIterated) {
			throw new Error("Already iterated");
		}
	}

	filter(predicate: (input: T) => boolean): Stream<T> {
		return new IteratorStream(Iterators.filter(this.mIterator, predicate), this.mIterated);
	}

	map<R>(mapper: (input: T) => R): Stream<R> {
		return new IteratorStream(Iterators.map(this.mIterator, mapper), this.mIterated);
	}

	limit(limit: number): Stream<T> {
		return new IteratorStream(Iterators.limit(this.mIterator, limit), this.mIterated);
	}

	skip(amount: number): Stream<T> {
		return new IteratorStream(Iterators.skip(this.mIterator, amount), this.mIterated);
	}

	tail(): Stream<T> {
		return new IteratorStream(Iterators.tail(this.mIterator), this.mIterated);
	}

	iterator(): Iterator<T> {
		this.checkIterated();
		this.mIterated = true;
		return this.mIterator;
	}

	any(predicate: (input: T) => boolean): boolean {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.any(this.mIterator, predicate);
	}

	all(predicate: (input: T) => boolean): boolean {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.all(this.mIterator, predicate);
	}

	reduce(reducer: (left: T, right: T) => T, initial?: T): T {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.reduce(this.mIterator, reducer, initial);
	}

	head(): Optional<T> {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.head(this.mIterator);
	}

	last(): Optional<T> {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.last(this.mIterator);
	}

	count(): number {
		return this.collect(Collectors.count());
	}

	forEach(consumer: (input: T) => void): void {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.forEach(this.mIterator, consumer);
	}

	toArray(): Array<T> {
		return this.collect(Collectors.toArray<T>());
	}

	collect<I, R>(collector: Collector<I, T, R>): R {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.collect(this.mIterator, collector);
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.min(comparator));
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.max(comparator));
	}

	average(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.average());
	}

	sum(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.sum());
	}
}
