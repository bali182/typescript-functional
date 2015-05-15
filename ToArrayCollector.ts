/// <reference path="Collector" />

/**
 * Collector for collecting all the values into an array.
 */
class ToArrayCollector<T> implements Collector<Array<T>, T, Array<T>> {

	initial(): Array<T> {
		return [];
	}

	accumulate(array: Array<T>, input: T): Array<T> {
		array.push(input);
		return array;
	}

	finish(array: Array<T>): Array<T> {
		return array;
	}
}
