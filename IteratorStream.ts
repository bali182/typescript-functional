/// <reference path="Iterator" />
/// <reference path="Stream" />
/// <reference path="Collector" />
/// <reference path="Collectors" />
/// <reference path="Optional" />
/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />
/// <reference path="PeekingIterator" />
/// <reference path="PartitioningIterator" />

/**
 * Stream, which operates on an iterator.
 */
class IteratorStream<T> implements Stream<T>{
	/** The delegeate iterator */
	private mIterator: Iterator<T>
	/** Flag indicating if the Stream was already iterated or not. */
	private mConsumed: boolean;
	
	/**
	 * Constructor.
	 * @param iterator The delegeate iterator
	 * @param iterated Flag indicating if the Stream was already iterated or not.
	 */
	constructor(iterator: Iterator<T>, iterated?: boolean) {
		this.mIterator = iterator;
		this.mConsumed = !!iterated;
	}
	
	/** Throws an exception if the Stream is already iterated. */
	protected invalidate(): void {
		if (this.isConsumed()) {
			throw new Error("Already iterated");
		}
		this.mConsumed = true;
	}
	
	all(predicate: (input: T) => boolean): boolean {
		this.invalidate();

		var iterator = this.iterator();
		while (iterator.hasNext()) {
			if (!predicate(iterator.next())) {
				return false;
			}
		}
		return true;
	}
	
	any(predicate: (input: T) => boolean): boolean {
		this.invalidate();

		var iterator = this.iterator();
		while (iterator.hasNext()) {
			if (predicate(iterator.next())) {
				return true;
			}
		}
		return false;
	}
	
	append(other: Stream<T>): Stream<T> {
		return new IteratorStream(
			new ConcatenatingIterator(new ArrayIterator([
				this.iterator(), other.iterator()
			])
		), this.isConsumed() || other.isConsumed());
	}
	
	average(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.average());
	}

	collect<I, R>(collector: Collector<I, T, R>): R {
		this.invalidate();

		var accumulated: I = collector.initial();
		var iterator = this.iterator();
		while (iterator.hasNext()) {
			accumulated = collector.accumulate(accumulated, iterator.next());
		}
		return collector.finish(accumulated);
	}
	
	count(): number {
		return this.collect(Collectors.count());
	}
	
	filter(predicate: (input: T) => boolean): Stream<T> {
		return new IteratorStream(new FilteringIterator(this.iterator(), predicate), this.isConsumed());
	}
	
	findFirst(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).head();
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).last();
	}
	
	flatten<R>(streamify: (input: T) => Stream<R>): Stream<R> {
		return new IteratorStream<R>(new ConcatenatingIterator<R>(
			this.map(streamify).map(stream => stream.iterator()).iterator()
		), this.isConsumed());
	}
	
	forEach(consumer: (input: T) => void): void {
		this.invalidate();

		var iterator = this.iterator();
		while (iterator.hasNext()) {
			consumer(iterator.next());
		}
	}
	
	head(): Optional<T> {
		this.invalidate();

		var iterator = this.iterator();
		if (iterator.hasNext()) {
			return Optional.of(iterator.next());
		}
		return Optional.empty<T>();
	}
	
	isConsumed(): boolean {
		return this.mConsumed;
	}
	
	iterator(): Iterator<T> {
		return this.mIterator;
	}
	
	last(): Optional<T> {
		this.invalidate();

		var last: T = undefined;
		var iterator = this.iterator();

		while (iterator.hasNext()) {
			last = iterator.next();
		}
		return Optional.ofNullable(last);
	}
	
	limit(limit: number): Stream<T> {
		return new IteratorStream(new LimitingIterator(this.iterator(), limit), this.isConsumed());
	}

	map<R>(mapper: (input: T) => R): Stream<R> {
		return new IteratorStream(new MappingIterator(this.iterator(), mapper), this.isConsumed());
	}
	
	max(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.max(comparator));
	}
	
	min(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.min(comparator));
	}
	
	partition(partitionSize: number): Stream<Stream<T>> {
		return new IteratorStream(
			new MappingIterator(
				new PartitioningIterator(this.iterator(), partitionSize),
				partition => Streams.ofArray(partition)
			)
		);
	}

	peek(consumer: (input: T) => void): Stream<T> {
		return new IteratorStream(new PeekingIterator(this.iterator(), consumer), this.isConsumed());
	}
	
	reduce(reducer: (left: T, right: T) => T, initial?: T): T {
		this.invalidate();

		var iterator = this.iterator();
		var current = initial;
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
	}

	skip(amount: number): Stream<T> {
		return new IteratorStream(new SkippingIterator(this.iterator(), amount), this.isConsumed());
	}
	
	sum(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.sum());
	}

	tail(): Stream<T> {
		return new IteratorStream(new SkippingIterator(this.iterator(), 1), this.isConsumed());
	}
	
	toArray(): Array<T> {
		return this.collect(Collectors.toArray<T>());
	}

	zip<R, E>(other: Stream<R>, combiner: (first: T, second: R) => E): Stream<E> {
		return new IteratorStream(
			new MappingIterator(
				new ZipIterator(this.iterator(), other.iterator()),
				tuple => combiner(tuple.first, tuple.second)
			),
			this.isConsumed() || other.isConsumed()
		);
	}

}
