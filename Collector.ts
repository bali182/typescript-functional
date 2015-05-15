/**
 * Interface for reducing.
 * supplier() - produces the initial data
 * accumulator() - accumulates each new element
 * finisher() - returns the finished data
 */
interface Collector<I, T, R> {
	/** Supplies the initial data. */
	supplier(): () => I;
	/** Accumulates each new element. */
	accumulator(): (state: I, element: T) => I;
	/** Returns the finished data. */
	finisher(): (state: I) => R;
}
