/// <reference path="Collector" />

/** 
 * Very basic implementation of a collector, that collects distinct values.
 * In the future this should use some kind of hash data structure for filtering duplicates.
 */
class DistinctCollector<T> implements Collector<Array<T>, T, Array<T>> {
	
	/** Default (identity) equals function. */
	private static IDENTITY_EQUALITY = (first: any, second: any) => first === second
	/** The equality function. */
	private mEquality: (first: T, second: T) => boolean;
	
	/** 
	 * Constructor.
	 * @param equality The equality function.
	 */
	constructor(equality?: (first: T, second: T) => boolean) {
		this.mEquality = equality || DistinctCollector.IDENTITY_EQUALITY;
	}
	
	/** Returns an empty array. */
	initial(): Array<T> {
		return [];
	}
	
	/** Adds the new element to the accumulated array, if it doesn't already contains, it according to the equality function. */
	accumulate(values: Array<T>, input: T): Array<T> {
		if (!DistinctCollector.contains(values, input, this.mEquality)) {
			values.push(input);
		}
		return values;
	}
	
	/** Returns the accumulated array. */
	finish(accumulated: Array<T>): Array<T> {
		return accumulated;
	}
	
	/**
	 * Checks if a given array contains the given element according to the given equality function.
	 * @param array The array
	 * @param value The value.
	 * @param equality The equality function.
	 */
	private static contains<T>(array: Array<T>, value: T, equality: (first: T, second: T) => boolean) {
		var i = array.length - 1;
		for (; i >= 0; i--) {
			if (equality(array[i], value)) {
				return true;
			}
		}
		return false;
	}
}

