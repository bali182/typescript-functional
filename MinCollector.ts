/// <reference path="Collector" />

/**
 * Collector for finding the minimum using the given comparator.
 */
class MinCollector<T> implements Collector<T, T, Optional<T>> {

	private mStared: boolean = false;
	private mComparator: (first: T, second: T) => number;

	constructor(comparator: (first: T, second: T) => number) {
		this.mComparator = comparator;
	}

	initial(): T {
		return undefined;
	}

	accumulate(first: T, second: T): T {
		if (!this.mStared) {
			return second;
		}
		return this.mComparator(first, second) > 0 ? first : second;
	}

	finish(accumulated: T): Optional<T> {
		return Optional.ofNullable(accumulated);
	}
}