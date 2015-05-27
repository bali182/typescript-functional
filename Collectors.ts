/// <reference path="Collector" />
/// <reference path="AveragingCollector" />
/// <reference path="MinCollector" />
/// <reference path="MaxCollector" />
/// <reference path="CounterCollector" />
/// <reference path="SumCollector" />
/// <reference path="ToArrayCollector" />
/// <reference path="JoiningCollector" />
/// <reference path="DistinctCollector" />

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
	 * @param comparator The comparator function to compare the values. ret < 0 - first is smaller, === 0 - equals, > 0 - bigger, than the second.
	 */
	public static min<T>(comparator: (first: T, second: T) => number): Collector<T, T, Optional<T>> {
		return new MinCollector(comparator);
	}

	/**
	 * Returns a collector, which finds the maximum of values, using the given comparator function.
	 * @param comparator The comparator function to compare the values. ret < 0 - first is smaller, === 0 - equals, > 0 - bigger, than the second.
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
	
	/** 
	 * Returns a collector, which joins all the elements as a single string
	 * @param separator The separator used to separate values (e.g.: ', ')
	 * @param prefix The prefix used to put before all joined values (e.g.: '[')
	 * @param suffix The suffix used to put after all joined values (e.g.: ']')
	 */
	public static join<T>(separator?: string, prefix?: string, suffix?: string): Collector<string, T, string> {
		return new JoiningCollector(separator, prefix, suffix);
	}
	
	/** 
	 * Returns a collector, which collects the distinct values
	 * @param equality The equality function.
	 */
	public static distinct<T>(equality?: (first: T, second: T) => boolean): Collector<Array<T>, T, Array<T>> {
		return new DistinctCollector<T>(equality);
	}
}
