/// <reference path="Iterator" />
/// <reference path="Sequence" />
/// <reference path="Sequences" />
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
/// <reference path="SkipWhileIterator" />
/// <reference path="TakeWhileIterator" />
/// <reference path="ZipIterator" />

/** Sequence, which operates on an iterator. */
class IteratorSequence<T> implements Sequence<T>{
	/** The delegeate iterator */
	private mIterator: Iterator<T>
	/** Flag indicating if the Sequence was already iterated or not. */
	private mConsumed: boolean;
	
	/**
	 * Constructor.
	 * @param iterator The delegeate iterator
	 * @param iterated Flag indicating if the Sequence was already iterated or not.
	 */
	constructor(iterator: Iterator<T>, iterated?: boolean) {
		this.mIterator = iterator;
		this.mConsumed = !!iterated;
	}
	
	/** Throws an exception if the Sequence is already iterated, then sets the consumed flag to true. */
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

	at(index: number): Optional<T> {
		this.invalidate();
		var iterator = this.iterator();
		var idx = 0;
		while (iterator.hasNext() && idx < index) {
			iterator.next();
			idx++;
		}
		if (iterator.hasNext()) {
			return Optional.ofNullable(iterator.next());
		}
		return Optional.empty<T>();
	}

	append(other: Sequence<T>): Sequence<T> {
		return new IteratorSequence(
				new ConcatenatingIterator(new ArrayIterator([
					this.iterator(), other.iterator()
				])
			), this.isConsumed() || other.isConsumed()
		);
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
	
	filter(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(
			new FilteringIterator(this.iterator(), predicate), this.isConsumed()
		);
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).head();
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).last();
	}

	flatten<R>(Sequenceify: (input: T) => Sequence<R>): Sequence<R> {
		return new IteratorSequence<R>(
			new ConcatenatingIterator<R>(
				this.map(Sequenceify).map(Sequence => Sequence.iterator()).iterator()
			), 
			this.isConsumed()
		);
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
	
	join(separator?: string, prefix?: string, suffix?: string): string {
		return this.collect(Collectors.join(separator, prefix, suffix));
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

	limit(limit: number): Sequence<T> {
		return new IteratorSequence(
			new LimitingIterator(this.iterator(), limit), this.isConsumed()
		);
	}

	map<R>(mapper: (input: T) => R): Sequence<R> {
		return new IteratorSequence(
			new MappingIterator(this.iterator(), mapper), this.isConsumed()
		);
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.max(comparator));
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.min(comparator));
	}

	partition(partitionSize: number): Sequence<Sequence<T>> {
		return new IteratorSequence(
			new MappingIterator(
				new PartitioningIterator(this.iterator(), partitionSize),
				partition => Sequences.ofArray(partition)
			)
		);
	}

	peek(consumer: (input: T) => void): Sequence<T> {
		return new IteratorSequence(
			new PeekingIterator(this.iterator(), consumer), this.isConsumed()
		);
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

	skip(amount: number): Sequence<T> {
		return new IteratorSequence(
			new SkippingIterator(this.iterator(), amount), this.isConsumed()
		);
	}
	
	skipWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(
			new SkipWhileIterator(this.iterator(), predicate)
		);
	}

	sum(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.sum());
	}

	tail(): Sequence<T> {
		return new IteratorSequence(
			new SkippingIterator(this.iterator(), 1), this.isConsumed()
		);
	}

	takeWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(
			new TakeWhileIterator(this.iterator(), predicate)
		);
	}

	toArray(): Array<T> {
		return this.collect(Collectors.toArray<T>());
	}

	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
		return new IteratorSequence(
			new MappingIterator(
				new ZipIterator(this.iterator(), other.iterator()),
				tuple => combiner(tuple.first, tuple.second)
				),
			this.isConsumed() || other.isConsumed()
		);
	}
}
