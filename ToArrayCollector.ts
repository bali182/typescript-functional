/// <reference path="Collector" />

/** Collector for collecting all the values into an array. */
class ToArrayCollector<T> implements Collector<Array<T>, T, Array<T>> {
	
	/** Returns a mutable empty array. */
	initial(): Array<T> {
		return [];
	}
	
	/** Pushes the input element into the array, then returns the array. */
	accumulate(array: Array<T>, input: T): Array<T> {
		array.push(input);
		return array;
	}
	
	/** Returns the array. */
	finish(array: Array<T>): Array<T> {
		return array;
	}
}
