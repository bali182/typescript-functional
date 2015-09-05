/// <reference path="Collector" />

/** Collector for counting the values. */
class CounterCollector<T> implements Collector<number, T, number> {
	
	/** Returns 0 as the initial value. */
	initial(): number {
		return 0;
	}
	
	/** Returns the accumulated count incremented by 1 */
	accumulate(count: number, input: T): number {
		return count + 1;
	}
	
	/** Returns the accumulated count as it is. */
	finish(accumulated: number): number {
		return accumulated;
	}
}
