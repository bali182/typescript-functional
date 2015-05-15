/// <reference path="SumCollector" />

/**
 * Collector for calculating the average (sum / count) of numeric values.
 */
class AveragingCollector extends SumCollector {
	private mCount: number;

	accumulate(first: number, second: number): number {
		this.mCount++;
		return super.accumulate(first, second);
	}

	finish(accumulated: number): number {
		return accumulated / this.mCount;
	}
}