/// <reference path="Collector" />
/// <reference path="AveragingCollector" />
/// <reference path="MinCollector" />
/// <reference path="MaxCollector" />
/// <reference path="CounterCollector" />
/// <reference path="SumCollector" />
/// <reference path="ToArrayCollector" />

/**
 * Collection of static factory methods for creating collectors.
 */
class Collectors {
	
	/** Returns a collector, which accumulates the average of numeric values. */
	public static average(): Collector<number, number, number> {
		return new AveragingCollector();
	}
	
	/** Returns a collector, which accumulates the sum of numeric values. */
	public static sum(): Collector<number, number, number> {
		return new SumCollector();
	}
	
	/**
	 * Returns a collector, which finds the minimum of values, using the given comparator function.
	 * @param comparator The comparator function to compare the values. ret < 0 - first is smaller, == 0 - equals, > 0 - bigger, than the second.
	 */
	public static min<T>(comparator: (first: T, second: T) => number): Collector<T, T, Optional<T>> {
		return new MinCollector(comparator);
	}

	/**
	 * Returns a collector, which finds the maximum of values, using the given comparator function.
	 * @param comparator The comparator function to compare the values. ret < 0 - first is smaller, == 0 - equals, > 0 - bigger, than the second.
	 */
	public static max<T>(comparator: (first: T, second: T) => number): Collector<T, T, Optional<T>> {
		return new MaxCollector(comparator);
	}
	
	/** Returns a collector, which counts the values. */
	public static count<T>(): Collector<number, T, number> {
		return new CounterCollector();
	}
	
	/** Returns a collector, which puts all the elements passed through into an array, and finally returns this array. */
	public static toArray<T>(): Collector<Array<T>, T, Array<T>> {
		return new ToArrayCollector<T>();
	}
}
