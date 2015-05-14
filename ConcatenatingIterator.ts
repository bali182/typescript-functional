/// <reference path="Iterator" />
/// <reference path="Iterators" />

/**
 * Iterator, which concatenates more iterators.
 */
class ConcatenatingIterator<T> implements Iterator<T> {
	
	/** The iterators to concatenate. */
	private mIterators: Iterator<Iterator<T>>;
	/** The currently iterated iterator. */
	private mCurrent: Iterator<T> = Iterators.empty<T>();
	
	/**
	 * Constructor.
	 * @param iterators The iterators to concatenate.
	 */
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