/// <reference path="SumCollector" />

/** Collector for calculating the average (sum / count) of numeric values. */
class AveragingCollector extends SumCollector {
	/** The count of elements flown through accumulate(). */
	private mCount: number = 0;
	
	/** 
	 * As a side-effect, increments the counter, and returns the first value 
	 * incremented by the second (as in SumCollector). 
	 */
	accumulate(first: number, second: number): number {
		this.mCount++;
		return super.accumulate(first, second);
	}
	
	/** Returns 0 if the accumulated value is 0, accumulated value divided by the count of elements otherwise. */
	finish(accumulated: number): number {
		return accumulated == 0 ? 0 : accumulated / this.mCount;
	}
}