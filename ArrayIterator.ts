/// <reference path="Iterator" />

/**
 * Iterator, which iterates on an array of any type.
 */
class ArrayIterator<T> implements Iterator<T> {
	/** The current index of the iteration. */
	private mIndex: number;
	/** The iterated array. */
	private mArray: Array<T>;
	
	/**
	 * Constructor.
	 * @param array The iterated array.
	 */
	constructor(array: Array<T>) {
		this.mArray = array;
		this.mIndex = 0;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		return this.mArray[this.mIndex++];
	}

	hasNext(): boolean {
		return this.mIndex < this.mArray.length;
	}
}