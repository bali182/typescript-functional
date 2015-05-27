/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

/** Iterator, that "peeks" into another iterator, that is, before consuming each elements, performs a side-effect on them. */
class PeekingIterator<T> extends DelegateIterator<T> {
	
	/** The consumer function, that is performed on each element. */
	private mConsumer: (input: T) => void;
	
	/** 
	 * Constructor.
	 * @param delegate The delegate iterator.
	 * @param consumer The consumer.
	 */
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