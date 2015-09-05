/// <reference path="Collector" />

/**
 * Collector for finding the minimum using the given comparator.
 */
class MinCollector<T> implements Collector<T, T, Optional<T>> {
	/** Flag indicating, if accumulate have been started or not. */
	private mStared: boolean = false;
	/** The comparator. */
	private mComparator: (first: T, second: T) => number;

	/**
	 * Constructor.
	 * @param comparator The comparator function.
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
	 * 2 values and returns the smaller according to the comparator function. 
	 */
	accumulate(first: T, second: T): T {
		if (!this.mStared) {
			this.mStared = true;
			return second;
		}
		return this.mComparator(first, second) < 0 ? first : second;
	}
	
	/** 
	 * If the iteration hasn't started, meaning the dataset, this was run on was empty, then returns 
	 * Optional#empty() otherwise the minimum value wrapped in an Optional. 
	 */
	finish(accumulated: T): Optional<T> {
		if (!this.mStared) {
			return Optional.empty<T>();
		}
		return Optional.ofNullable(accumulated);
	}
}