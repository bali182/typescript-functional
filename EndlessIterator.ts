/// <reference path="Iterator" />

class EndlessIterator<T> implements Iterator<T> {
	
	private mSupplier: () => T;

	constructor(supplier: () => T) {
		this.mSupplier = supplier;
	}

	next(): T {
		return this.mSupplier();
	}

	hasNext(): boolean {
		return true;
	}
}