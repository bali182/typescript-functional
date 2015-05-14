/// <reference path="Iterator" />

class DelegateIterator<T> implements Iterator<T> {

	protected mDelegate: Iterator<T>

	public constructor(delegate: Iterator<T>) {
		this.mDelegate = delegate;
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext();
	}

	next(): T {
		return this.mDelegate.next();
	}
}