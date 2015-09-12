/// <reference path="Iterator" />

/**
 * Iterator, which iterates endlessly on the elements returned by the input supplier.
 */
class EndlessIterator<T> implements Iterator<T> {
	
	/** The supplier of elements. */
	private mSupplier: () => T;
	
	/**
	 * Constructor.
	 * @param supplier The supplier of elements.
	 */
	constructor(supplier: () => T) {
		this.mSupplier = supplier;
	}

	next(): T {
		return this.mSupplier();
	}

	hasNext(): boolean {
		return true;
	}
	
	isFinite() {
		return false;
	}
}
