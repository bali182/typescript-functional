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
/// <reference path="ChainableIterator" />

/** Sequence, which operates on an iterator. */
class IteratorSequence<T> implements Sequence<T>{
	/** The delegeate iterator */
	private mIterable: () => Iterator<T>
	
	/**
	 * Constructor.
	 * @param iterator The delegeate iterator
	 * @param iterated Flag indicating if the Sequence was already iterated or not.
	 */
	constructor(iterable: () => Iterator<T>) {
		this.mIterable = iterable;
	}

	all(predicate: (input: T) => boolean): boolean {
		var iterator = this.iterator();
		while (iterator.hasNext()) {
			if (!predicate(iterator.next())) {
				return false;
			}
		}
		return true;
	}

	any(predicate: (input: T) => boolean): boolean {
		var iterator = this.iterator();
		while (iterator.hasNext()) {
			if (predicate(iterator.next())) {
				return true;
			}
		}
		return false;
	}

	at(index: number): Optional<T> {
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
		var iterable: () => Iterator<T> = () => {
			var iterator = this.iterator();
			var otherIterator = other.iterator();
			return iterator instanceof ChainableIterator
				? (<ChainableIterator<T>>iterator).chain(otherIterator)
				: new ChainableIterator<T>().chain(iterator).chain(otherIterator);
		}
		return new IteratorSequence(iterable);
	}

	average(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.average());
	}

	collect<I, R>(collector: Collector<I, T, R>): R {
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
		return new IteratorSequence(() => new FilteringIterator(this.iterator(), predicate));
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).head();
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		return this.filter(predicate).last();
	}

	flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
		return new IteratorSequence<R>(() =>
			new ConcatenatingIterator<R>(
				this.map(sequencify).map(Sequence => Sequence.iterator()).iterator()
			)
		);
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		var iterator = this.iterator();
		var current = initial;
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
	}

	forEach(consumer: (input: T) => void): void {
		var iterator = this.iterator();
		while (iterator.hasNext()) {
			consumer(iterator.next());
		}
	}

	head(): Optional<T> {
		var iterator = this.iterator();
		if (iterator.hasNext()) {
			return Optional.of(iterator.next());
		}
		return Optional.empty<T>();
	}

	iterator(): Iterator<T> {
		return this.mIterable();
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		return this.collect(Collectors.join(separator, prefix, suffix));
	}

	last(): Optional<T> {
		var last: T = undefined;
		var iterator = this.iterator();
		while (iterator.hasNext()) {
			last = iterator.next();
		}
		return Optional.ofNullable(last);
	}

	limit(limit: number): Sequence<T> {
		return new IteratorSequence(
			() => new LimitingIterator(this.iterator(), limit)
		);
	}

	map<R>(mapper: (input: T) => R): Sequence<R> {
		return new IteratorSequence(
			() => new MappingIterator(this.iterator(), mapper)
		);
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.max(comparator));
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		return this.collect(Collectors.min(comparator));
	}

	partition(partitionSize: number): Sequence<Sequence<T>> {
		return new IteratorSequence(() =>
			new MappingIterator(
				new PartitioningIterator(this.iterator(), partitionSize),
				partition => Sequences.ofArray(partition)
			)
		);
	}

	peek(consumer: (input: T) => void): Sequence<T> {
		return new IteratorSequence(
			() => new PeekingIterator(this.iterator(), consumer)
		);
	}

	reduce(reducer: (left: T, right: T) => T): T {
		var iterator = this.iterator();
		if (!iterator.hasNext()) {
			throw new Error("Can't reduce an empty sequence");
		}
		var current = iterator.next();
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
	}

	skip(amount: number): Sequence<T> {
		return new IteratorSequence(
			() => new SkippingIterator(this.iterator(), amount)
		);
	}

	skipWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(
			() => new SkipWhileIterator(this.iterator(), predicate)
		);
	}

	sum(mapper: (input: T) => number): number {
		return this.map(mapper).collect(Collectors.sum());
	}

	tail(): Sequence<T> {
		return new IteratorSequence(
			() => new SkippingIterator(this.iterator(), 1)
		);
	}

	takeWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(
			() => new TakeWhileIterator(this.iterator(), predicate)
		);
	}

	toArray(): Array<T> {
		return this.collect(Collectors.toArray<T>());
	}

	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
		return new IteratorSequence(
			() => new MappingIterator(
				new ZipIterator(this.iterator(), other.iterator()),
				tuple => combiner(tuple.first, tuple.second)
			)
		);
	}
}
