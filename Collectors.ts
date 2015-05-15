/// <reference path="Collector" />
/// <reference path="Iterator" />

// Base collect method:

class Collectors {
	public average(): Collector<number, number, number> {
		return new AveragingCollector();
	}

	public sum(): Collector<number, number, number> {
		return new SumCollector();
	}

	public min<T>(comparator: (first: T, second: T) => number): Collector<T, T, T> {
		return new MinCollector(comparator);
	}

	public max<T>(comparator: (first: T, second: T) => number): Collector<T, T, T> {
		return new MaxCollector(comparator);
	}

	public count<T>() {
		return new CounterCollector();
	}
}

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

class MinCollector<T> implements Collector<T, T, T> {

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
		return this.mComparator(first, second) < 0 ? first : second;
	}

	finish(accumulated: T): T {
		return accumulated;
	}
}

class MaxCollector<T> implements Collector<T, T, T> {

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

	finish(accumulated: T): T {
		return accumulated;
	}
}

class SumCollector implements Collector<number, number, number>{
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
