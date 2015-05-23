/// <reference path="Iterator" />

/** Iterator, that repeats one element endlessly. */
class EndlessRepeatingIterator<T> implements Iterator<T> {
	
	/** The repeated element. */
	private mRepeated: T;
	
	/** 
	 * Constructor.
	 * @param repeated The endlessly repeated element.
	 */
	constructor(repeated: T) {
		this.mRepeated = repeated;
	}

	next(): T {
		return this.mRepeated;
	}

	hasNext(): boolean {
		return true;
	}
}