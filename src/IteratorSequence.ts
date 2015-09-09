/// <reference path="Iterator" />
/// <reference path="DelegateSequence" />
/// <reference path="Optional" />
/// <reference path="Iterators" />

class IteratorSequence<T> implements Sequence<T> {
	private mConsumed: boolean = false;
	private mIterator: Iterator<T>;

	constructor(it: Iterator<T>, consumed: boolean) {
		this.mIterator = it;
		this.mConsumed = consumed;
	}

	protected invalidate() {
		if (this.isConsumed()) {
			throw new Error('Iterator already consumed');
		}
		this.mConsumed = false;
	}

	protected isConsumed() {
		return this.mConsumed;
	}

	protected status(sequence: Sequence<any>) {
		if (sequence instanceof IteratorSequence) {
			return (<IteratorSequence<any>> sequence).isConsumed();
		}
		return false;
	}

	all(predicate: (input: T) => boolean): boolean {
		this.invalidate();
		return Iterators.all(this.iterator(), predicate);
	}

	any(predicate: (input: T) => boolean): boolean {
		this.invalidate();
		return Iterators.any(this.iterator(), predicate);
	}

	at(index: number): Optional<T> {
		this.invalidate();
		return Iterators.at(this.iterator(), index);
	}

	append(other: Sequence<T>): Sequence<T> {
		return new IteratorSequence(Iterators.append(this.iterator(), other.iterator()), this.isConsumed() || this.status(other));
	}

	average(mapper: (input: T) => number): number {
		this.invalidate();
		return Iterators.average(this.map(mapper).iterator());
	}

	contains(item: T, equality: (a: T, b: T) => boolean): boolean {
		return this.indexOf(item, equality) >= 0;
	}

	count(): number {
		this.invalidate();
		return Iterators.count(this.iterator());
	}

	filter(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(Iterators.filter(this.iterator(), predicate), this.isConsumed());
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return Iterators.findFirst(this.iterator(), predicate);
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return Iterators.findLast(this.iterator(), predicate);
	}

	flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
		var flat = new ConcatenatingIterator<R>(this.map(sequencify).map(seq => seq.iterator()).iterator());
		return new IteratorSequence(flat, this.isConsumed());
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		this.invalidate();
		return Iterators.fold(this.iterator(), reducer, initial);
	}

	forEach(consumer: (input: T) => void): void {
		this.invalidate();
		Iterators.forEach(this.iterator(), consumer);
	}

	head(): Optional<T> {
		this.invalidate();
		return Iterators.head(this.iterator());
	}
	
	indexOf(item: T, equality?: (a: T, b: T) => boolean): number {
		this.invalidate();
		return Iterators.indexOf(this.iterator(), item, equality);
	}
	
	iterator(): Iterator<T> {
		return this.mIterator;
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		this.invalidate();
		return Iterators.join(this.map(e => "" + e).iterator(), separator, prefix, suffix);
	}

	last(): Optional<T> {
		this.invalidate();
		return Iterators.last(this.iterator());
	}

	limit(limit: number): Sequence<T> {
		return new IteratorSequence(Iterators.limit(this.iterator(), limit), this.isConsumed());
	}

	map<R>(mapper: (input: T) => R): Sequence<R> {
		return new IteratorSequence(Iterators.map(this.iterator(), mapper), this.isConsumed());
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return Iterators.max(this.iterator(), comparator);
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return Iterators.min(this.iterator(), comparator);
	}

	peek(consumer: (input: T) => void): Sequence<T> {
		return new IteratorSequence(Iterators.peek(this.iterator(), consumer), this.isConsumed());
	}

	reduce(reducer: (left: T, right: T) => T): T {
		this.invalidate();
		return Iterators.reduce(this.iterator(), reducer);
	}

	skip(amount: number): Sequence<T> {
		return new IteratorSequence(Iterators.skip(this.iterator(), amount), this.isConsumed());
	}

	skipWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(Iterators.skipWhile(this.iterator(), predicate), this.isConsumed());
	}

	sum(mapper: (input: T) => number): number {
		this.invalidate();
		return Iterators.sum(this.map(mapper).iterator());
	}

	tail(): Sequence<T> {
		return new IteratorSequence(Iterators.tail(this.iterator()), this.isConsumed());
	}

	takeWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(Iterators.takeWhile(this.iterator(), predicate), this.isConsumed());
	}

	toArray(): Array<T> {
		this.invalidate();
		return Iterators.toArray(this.iterator());
	}

	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
		return new IteratorSequence(Iterators.zip(this.iterator(), other.iterator(), combiner), this.isConsumed() || this.status(other));
	}
}