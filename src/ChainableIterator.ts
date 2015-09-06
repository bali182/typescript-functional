/// <reference path="Iterator" />
/// <reference path="EmptyIterator" />
/// <reference path="IteratorChain" />

/**
 * Iterator, which concatenates more iterators.
 */
class ChainableIterator<T> implements Iterator<T> {
	
	/** The iterators to concatenate. */
	private mChain: IteratorChain<T>;
	/** The currently iterated iterator. */
	private mCurrent: Iterator<T> = EmptyIterator.instance<T>()
	
	/**
	 * Constructor.
	 * @param iterators The iterators to concatenate.
	 */
	constructor(chain: IteratorChain<T>) {
		this.mChain = chain;
	}

	chain(): IteratorChain<T> {
		return this.mChain;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		return this.mCurrent.next();
	}

	hasNext(): boolean {
		while (true) {
			if (this.mCurrent.hasNext()) {
				return true;
			} else if (!this.mCurrent.hasNext() && this.mChain.hasNext()) {
				this.mCurrent = this.mChain.next();
				this.mChain = this.mChain.tail();
			} else {
				return false;
			}
		}
		return false;
	}
}