/// <reference path="Iterator" />
/// <reference path="DelegateSequence" />
/// <reference path="Optional" />

class IteratorSequence<T> extends DelegateSequence<T> {
	private mConsumed: boolean = false;

	constructor(delegate: Sequence<T>, consumed: boolean) {
		super(delegate);
	}

	protected invalidate() {
		if (this.mConsumed) {
			throw new Error('Iterator already consumed');
		}
		this.mConsumed = false;
	}

	protected isConsumed() {
		return this.mConsumed;
	}

	protected status(sequence: Sequence<T>) {
		if (sequence instanceof IteratorSequence) {
			return (<IteratorSequence<any>> sequence).isConsumed();
		}
		return false;
	}

	all(predicate: (input: T) => boolean): boolean {
		this.invalidate();
		return super.all(predicate);
	}

	any(predicate: (input: T) => boolean): boolean {
		this.invalidate();
		return super.any(predicate);
	}

	at(index: number): Optional<T> {
		this.invalidate();
		return super.at(index);
	}

	append(other: Sequence<T>): Sequence<T> {
		return new IteratorSequence(super.append(other), this.isConsumed() || this.status(other));
	}

	average(mapper: (input: T) => number): number {
		this.invalidate();
		return super.average(mapper);
	}

	count(): number {
		this.invalidate();
		return super.count();
	}

	filter(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(super.filter(predicate), this.isConsumed());
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return super.findFirst(predicate);
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return super.findLast(predicate);
	}

	flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
		return new IteratorSequence(super.flatten(sequencify), this.isConsumed());
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		this.invalidate();
		return super.fold(reducer, initial);
	}

	forEach(consumer: (input: T) => void): void {
		this.invalidate();
		return super.forEach(consumer);
	}

	head(): Optional<T> {
		this.invalidate();
		return super.head();
	}

	iterator(): Iterator<T> {
		return super.iterator();
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		this.invalidate();
		return super.join(separator, prefix, suffix);
	}

	last(): Optional<T> {
		this.invalidate();
		return super.last();
	}

	limit(limit: number): Sequence<T> {
		return new IteratorSequence(super.limit(limit), this.isConsumed());
	}

	map<R>(mapper: (input: T) => R): Sequence<R> {
		return new IteratorSequence(super.map(mapper), this.isConsumed());
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return super.max(comparator);
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return super.min(comparator);
	}

	partition(partitionSize: number): Sequence<Sequence<T>> {
		return new IteratorSequence(super.partition(partitionSize), this.isConsumed());
	}

	peek(consumer: (input: T) => void): Sequence<T> {
		return new IteratorSequence(super.peek(consumer), this.isConsumed());
	}

	reduce(reducer: (left: T, right: T) => T): T {
		this.invalidate();
		return super.reduce(reducer);
	}

	skip(amount: number): Sequence<T> {
		return new IteratorSequence(super.skip(amount), this.isConsumed());
	}

	skipWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(super.skipWhile(predicate), this.isConsumed());
	}

	sum(mapper: (input: T) => number): number {
		this.invalidate();
		return super.sum(mapper);
	}

	tail(): Sequence<T> {
		return new IteratorSequence(super.tail(), this.isConsumed());
	}

	takeWhile(predicate: (input: T) => boolean): Sequence<T> {
		return new IteratorSequence(super.takeWhile(predicate), this.isConsumed());
	}

	toArray(): Array<T> {
		this.invalidate();
		return super.toArray();
	}

	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
		return new IteratorSequence(super.zip(other, combiner), this.isConsumed());
	}
}