/// <reference path="Collector" />

/** Collector for summing numeric values. */
class SumCollector implements Collector<number, number, number> {
	
	/** Returns 0. */
	initial(): number {
		return 0;
	}
	
	/** Adds the 2 numbers. */
	accumulate(first: number, second: number): number {
		return first + second;
	}

	/** Returns the accumulated sum. */
	finish(accumulated: number): number {
		return accumulated;
	}
}