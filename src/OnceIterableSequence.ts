/// <reference path="IteratorSequence" />

class OnceIterableSequence<T> extends IteratorSequence<T> {

	private mConsumed: boolean = false;

	constructor(iterator: Iterator<T>) {
		super(() => iterator);
	}

	protected invalidate() {
		if (this.mConsumed) {
			throw new Error('This sequence was already iterated');
		}
		this.mConsumed = true;
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

	average(mapper: (input: T) => number): number {
		this.invalidate();
		return super.average(mapper);
	}

	collect<I, R>(collector: Collector<I, T, R>): R {
		this.invalidate();
		return super.collect(collector);
	}

	count(): number {
		this.invalidate();
		return super.count();
	}

	findFirst(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return super.findFirst(predicate);
	}

	findLast(predicate: (input: T) => boolean): Optional<T> {
		this.invalidate();
		return super.findLast(predicate);
	}

	forEach(consumer: (input: T) => void): void {
		this.invalidate();
		super.forEach(consumer);
	}

	head(): Optional<T> {
		this.invalidate()
		return super.head();
	}

	last(): Optional<T> {
		this.invalidate();
		return super.last();
	}

	max(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return super.max(comparator);
	}

	min(comparator: (first: T, second: T) => number): Optional<T> {
		this.invalidate();
		return super.min(comparator);
	}

	reduce(reducer: (left: T, right: T) => T): T {
		this.invalidate();
		return super.reduce(reducer);
	}

	sum(mapper: (input: T) => number): number {
		this.invalidate();
		return super.sum(mapper);
	}

	toArray(): Array<T> {
		this.invalidate();
		return super.toArray();
	}
}