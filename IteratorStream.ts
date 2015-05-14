/// <reference path="Iterator" />
/// <reference path="Iterators" />
/// <reference path="Stream" />

/**
 * Stream, which operates on an iterator.
 */
class IteratorStream<T> implements Stream<T>{
	private mIterator: Iterator<T>
	private mIterated: boolean;

	constructor(iterator: Iterator<T>, iterated?: boolean) {
		this.mIterator = iterator;
		this.mIterated = !!iterated;
	}

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
	
	iterator() : Iterator<T> {
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
		this.checkIterated();
		this.mIterated = true;
		return Iterators.count(this.mIterator);
	}

	forEach(consumer: (input: T) => void): void {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.forEach(this.mIterator, consumer);
	}

	toArray(): Array<T> {
		this.checkIterated();
		this.mIterated = true;
		return Iterators.toArray(this.mIterator);
	}
}
