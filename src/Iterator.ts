/**
 * Base interface for iterators
 */
interface Iterator<T> {
	/** Returns the next element of the iteration, or throws an error. */
	next(): T;
	/** Returns, if the iterator has more elements. */
	hasNext(): boolean;
	/** Returns, wether the iterator would ever terminate on subsequent next calls. */
	isFinite() : boolean;
}
