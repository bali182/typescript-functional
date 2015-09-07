/// <reference path="Iterator" />
/// <reference path="Sequence" />
/// <reference path="Sequences" />
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
		var iterator = this.iterator();
		var otherIterator = other.iterator();
		var chained: ChainableIterator<T> = iterator instanceof ChainableIterator
			? (<ChainableIterator<T>>iterator).chain(otherIterator)
			: new ChainableIterator<T>().chain(iterator).chain(otherIterator);
		return new IteratorSequence(chained, this.isConsumed() || other.isConsumed());
	}

	average(mapper: (input: T) => number): number {
		var length = 0;
		var sum = this.map(mapper).fold((x, y) => {
			length++;
			return x + y;
		}, 0);
		return sum > 0 ? sum / length : sum;
	}

	count(): number {
		return this.fold((length, item) => length + 1, 0);
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

	flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
		return new IteratorSequence<R>(
			new ConcatenatingIterator<R>(
				this.map(sequencify).map(Sequence => Sequence.iterator()).iterator()
			),
			this.isConsumed()
		);
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		this.invalidate();
		var iterator = this.iterator();
		var current = initial;
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
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
		separator = separator || '';
		var started = false;
		var accumulator = (joined, s) => {
			if (!started) {
				started = true;
				return s;
			}
			return joined + separator + s
		};
		var elementsJoined = this.map(e => '' + e)
			.fold(accumulator, null);
		return (prefix || '') + started ? elementsJoined : '' + (suffix || '');
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
		var started = false;
		var maxValue = this.fold((f, s) => {
			if (!started) {
				started = true;
				return s;
			}
			return comparator(f, s) > 0 ? f : s
		}, null);
		return started ? Optional.ofNullable(maxValue) : Optional.empty<T>();
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		var started = false;
		var minValue = this.fold((f, s) => {
			if (!started) {
				started = true;
				return s;
			}
			return comparator(f, s) < 0 ? f : s
		}, null);
		return started ? Optional.ofNullable(minValue) : Optional.empty<T>();
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

	reduce(reducer: (left: T, right: T) => T): T {
		var iterator = this.iterator();
		if (!iterator.hasNext()) {
			throw new Error("Can't reduce an empty sequence");
		}
		this.invalidate();
		var current = iterator.next();
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
		return this.map(mapper).fold((a, b) => a + b, 0)
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
		return this.fold((array, e) => { array.push(e); return array; }, []);
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
