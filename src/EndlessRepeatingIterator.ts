/// <reference path="Iterator" />

/** Iterator, that repeats one element endlessly. */
class EndlessRepeatingIterator<T> implements Iterator<T> {
	/** The repeated element. */
	private mElement: T;
	
	/** 
	 * Constructor.
	 * @param repeated The endlessly repeated element.
	 */
	constructor(element: T) {
		this.mElement = element;
	}

	next(): T {
		return this.mElement;
	}

	hasNext(): boolean {
		return true;
	}
}