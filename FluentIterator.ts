/// <reference path="Iterator" />
/// <reference path="Iterators" />

class FluentIterator<T> implements Iterator<T> {
	private mDelegate: Iterator<T>;

	public constructor(delegate: Iterator<T>) {
		this.mDelegate = delegate;
	}

	public static of<T>(iterator: Iterator<T>): FluentIterator<T> {
		if (iterator instanceof FluentIterator) {
			return <FluentIterator<T>>iterator;
		}
		return new FluentIterator(iterator);
	}

	public static ofArray<T>(array: Array<T>): FluentIterator<T> {
		return new FluentIterator(new ArrayIterator(array));
	}

	public static ofValues<T>(...values: T[]): FluentIterator<T> {
		return FluentIterator.ofArray(values);
	}

	public filter(predicate: (input: T) => boolean): FluentIterator<T> {
		return FluentIterator.of(Iterators.filter(this.mDelegate, predicate));
	}

	public map<R>(mapper: (input: T) => R): FluentIterator<R> {
		return FluentIterator.of(Iterators.map(this.mDelegate, mapper));
	}

	public limit(limit: number): FluentIterator<T> {
		return FluentIterator.of(Iterators.limit(this.mDelegate, limit));
	}

	public skip(amount: number): FluentIterator<T> {
		return FluentIterator.of(Iterators.skip(this.mDelegate, amount));
	}

	public any(predicate: (input: T) => boolean): boolean {
		return Iterators.any(this.mDelegate, predicate);
	}

	public all(predicate: (input: T) => boolean): boolean {
		return Iterators.all(this.mDelegate, predicate);
	}

	public reduce(reducer: (left: T, right: T) => T, initial?: T): T {
		return Iterators.reduce(this.mDelegate, reducer, initial);
	}

	public head(): Optional<T> {
		return Iterators.head(this.mDelegate);
	}

	public tail(): FluentIterator<T> {
		return FluentIterator.of(Iterators.tail(this.mDelegate));
	}

	public last(): Optional<T> {
		return Iterators.last(this.mDelegate);
	}

	public count(): number {
		return Iterators.count(this.mDelegate);
	}

	public forEach(consumer: (input: T) => void): void {
		Iterators.forEach(this.mDelegate, consumer);
	}

	public toArray(): Array<T> {
		return Iterators.toArray(this.mDelegate);
	}

	public next(): T {
		return this.mDelegate.next();
	}

	public hasNext(): boolean {
		return this.mDelegate.hasNext();
	}

	toString(): String {
		return this.toArray().toString();
	}
}