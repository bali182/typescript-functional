/// <reference path="Iterator" />

class MappingIterator<T, R> implements Iterator<R> {
	private mMapper: (T) => R;
	private mDelegate: Iterator<T>;

	constructor(delegate: Iterator<T>, mapper: (input: T) => R) {
		this.mMapper = mapper;
		this.mDelegate = delegate;
	}

	next(): R {
		return this.mMapper(this.mDelegate.next());
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext();
	}
}
