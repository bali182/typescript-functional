/// <reference path="Iterator" />

class ArrayIterator<T> implements Iterator<T> {
	
	private mIndex: number;
	private mArray: Array<T>;

	constructor(array: Array<T>) {
		this.mArray = array;
		this.mIndex = 0;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("no such element");
		}
		return this.mArray[this.mIndex++];
	}

	hasNext(): boolean {
		return this.mIndex < this.mArray.length;
	}
}