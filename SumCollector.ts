/// <reference path="Collector" />

/**
 * Collector for summing numeric values.
 */
class SumCollector implements Collector<number, number, number> {

	initial(): number {
		return 0;
	}

	accumulate(first: number, second: number): number {
		return first + second;
	}

	finish(accumulated: number): number {
		return accumulated;
	}
}