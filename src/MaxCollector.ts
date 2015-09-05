/// <reference path="Collector" />
/// <reference path="Optional" />

/**
 * Collector for finding the maximum using the given comparator.
 */
class MaxCollector<T> implements Collector<T, T, Optional<T>> {
	/** Flag marking, if accumulate() was called or not. */
	private mStared: boolean = false;
	/** The comparator method for comparing the values in accumulate() */
	private mComparator: (first: T, second: T) => number;
	
	/**
	 * Constructor.
	 * @param comparator The comparator function to compare 2 values of type T.
	 */
	constructor(comparator: (first: T, second: T) => number) {
		this.mComparator = comparator;
	}
	
	/** Returns undefined. */
	initial(): T {
		return undefined;
	}
	
	/** 
	 * If the iteration hasn't started, returns the second value, otherwise compares the 
	 * 2 values and returns the bigger according to the comparator function. 
	 */
	accumulate(first: T, second: T): T {
		if (!this.mStared) {
			this.mStared = true;
			return second;
		}
		return this.mComparator(first, second) > 0 ? first : second;
	}
	
	/** 
	 * If the iteration hasn't started, meaning the dataset, this was run on was empty, then returns 
	 * Optional#empty() otherwise the maximum value wrapped in an Optional. 
	 */
	finish(accumulated: T): Optional<T> {
		if (!this.mStared) {
			return Optional.empty<T>();
		}
		return Optional.ofNullable(accumulated);
	}
}