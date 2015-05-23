/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

class PeekingIterator<T> extends DelegateIterator<T> {

	private mConsumer: (input: T) => void;

	constructor(delegate: Iterator<T>, consumer: (input: T) => void) {
		super(delegate);
		this.mConsumer = consumer;
	}

	next(): T {
		var next = super.next();
		this.mConsumer(next);
		return next;
	}
}