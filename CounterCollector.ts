/// <reference path="Collector" />

/**
 * Collector for counting the values.
 */
class CounterCollector<T> implements Collector<number, T, number> {

	initial(): number {
		return 0;
	}

	accumulate(countSoFar: number, input: T): number {
		return countSoFar + 1;
	}

	finish(accumulated: number): number {
		return accumulated;
	}
}
