/// <reference path="Iterator" />
/// <reference path="IteratorStream" />

/** Stream, which is built on top of an empty iterator. */
class EmptyIteratorStream<T> extends IteratorStream<T> {
	/** The singleton instance. */
	private static INSTANCE: EmptyIteratorStream<any> = new EmptyIteratorStream<any>();
	
	/** Accessor for the singleton instance. */
	public static instance<T>(): Stream<T> {
		return EmptyIteratorStream.INSTANCE;
	}
	
	/** Empty constructor. */
	constructor() {
		super(EmptyIterator.instance<T>(), false);
	}
	
	/** 
	 * The invalidate method should mark Streams consumed, meaning that any attempt to iterate them should throw an error.
	 * In this implementation, the invalidation does nothing.
	 */
	protected invalidate(): void {
		// empty
	}
}