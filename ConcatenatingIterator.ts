/// <reference path="Iterator" />
/// <reference path="Iterators" />

class ConcatenatingIterator<T> implements Iterator<T> {
	
	private mIterators: Iterator<Iterator<T>>;
	private mCurrent: Iterator<T> = Iterators.empty<T>();

	constructor(iterators: Iterator<Iterator<T>>) {
		this.mIterators = iterators;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
        }
        return this.mCurrent.next();
	}

	hasNext(): boolean {
		var currentHasNext: boolean = false;
        while (!(currentHasNext = this.mCurrent.hasNext()) && this.mIterators.hasNext()) {
			this.mCurrent = this.mIterators.next();
        }
        return currentHasNext;
	}
}