/// <reference path="Iterator" />

class ZipIterator<T, R> implements Iterator<{ first: T, second: R }>{
	private mFirst: Iterator<T>;
	private mSecond: Iterator<R>;

	constructor(first: Iterator<T>, second: Iterator<R>) {
		this.mFirst = first;
		this.mSecond = second;
	}

	public hasNext(): boolean {
		return this.mFirst.hasNext() && this.mSecond.hasNext();
	}

	public next(): { first: T, second: R } {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		return { first: this.mFirst.next(), second: this.mSecond.next() };
	}
}