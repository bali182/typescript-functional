/**
 * Interface for reducing.
 * supplier() - produces the initial data
 * accumulator() - accumulates each new element
 * finisher() - returns the finished data
 */
interface Collector<I, T, R> {
	/** Supplies the initial data. */
	initial(): I;
	/** Accumulates each new element. */
	accumulate(first: I, second: T): I;
	/** Returns the finished data. */
	finish(accumulated: I): R;
}
