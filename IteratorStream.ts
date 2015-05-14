/// <reference path="Iterator" />
/// <reference path="Iterators" />
/// <reference path="Stream" />

class IteratorStream<T> implements Stream<T>{

	private mIterator: Iterator<T>
	private mIterated: boolean;

	constructor(iterator: Iterator<T>, iterated?: boolean) {
		this.mIterator = iterator;
		this.mIterated = !!(iterated);
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

	}

	skip(amount: number): Stream<T> {

	}

	any(predicate: (input: T) => boolean): boolean {

	}

	all(predicate: (input: T) => boolean): boolean {

	}

	reduce(reducer: (left: T, right: T) => T, initial?: T): T {

	}

	head(): Optional<T> {

	}

	tail(): Stream<T> {

	}

	last(): Optional<T> {

	}

	count(): number {

	}

	forEach(consumer: (input: T) => void): void {

	}

	toArray(): Array<T> {

	}
}