/// <reference path="Iterator" />
/// <reference path="IteratorSequence" />

/** Sequence, which is built on top of an empty iterator. */
class EmptySequence<T> extends IteratorSequence<T> {
	/** The singleton instance. */
	private static INSTANCE: EmptySequence<any> = new EmptySequence<any>();
	
	/** Accessor for the singleton instance. */
	public static instance<T>(): Sequence<T> {
		return EmptySequence.INSTANCE;
	}
	
	/** Empty constructor. */
	constructor() {
		super(EmptyIterator.instance<T>(), false);
	}
	
	/** 
	 * The invalidate method should mark Sequences consumed, meaning that any attempt to iterate them should throw an error.
	 * In this implementation, the invalidation does nothing.
	 */
	protected invalidate(): void {
		// empty
	}
}