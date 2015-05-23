/// <reference path="Iterator" />

class PartitioningIterator<T> implements Iterator<Array<T>> {

	private mPartitionSize: number;
	private mDelegate: Iterator<T>;

	constructor(delegate: Iterator<T>, partitionSize: number) {
		this.mDelegate = delegate;
		this.mPartitionSize = partitionSize;
	}

	next(): Array<T> {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		var array: Array<T> = [];
		var counter = 0;
		while (this.mDelegate.hasNext() && counter++ < this.mPartitionSize) {
			array.push(this.mDelegate.next())
		}
		return array;
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext();
	}
}