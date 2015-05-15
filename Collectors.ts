/// <reference path="Collector" />
/// <reference path="Iterator" />

// Base collect method:

function collect<I, T, R>(iterator: Iterator<T>, collector: Collector<I, T, R>): R {
	var supplier = collector.supplier();
	var accumulator = collector.accumulator();
	var finisher = collector.finisher();

	var accumulated: I = supplier();
	while (iterator.hasNext()) {
		accumulated = accumulator(accumulated, iterator.next());
	}
	return finisher(accumulated);
}

class Collectors {
	public averaging(): Collector<number, number, number> {
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
}

class BaseCollector<I, T, R> implements Collector<I, T, R> {

	private mSupplier: () => I;
	private mAccumulator: (state: I, element: T) => I;
	private mFinisher: (state: I) => R;

	constructor(supplier: () => I, accumulator: (s: I, e: T) => I, finisher: (s: I) => R) {
		this.mSupplier = supplier;
		this.mAccumulator = accumulator;
		this.mFinisher;
	}

	supplier(): () => I {
		return this.mSupplier;
	}
	accumulator(): (state: I, element: T) => I {
		return this.mAccumulator;
	}
	finisher(): (state: I) => R {
		return this.mFinisher;
	}
}

class MinCollector<T> extends BaseCollector<T, T, T> {
	constructor(comparator: (first: T, second: T) => number) {
		super(
			() => null,
			(a, b) => comparator(a, b) < 0 ? a : b,
			(min) => min
		);
	}
}

class MaxCollector<T> extends BaseCollector<T, T, T> {
	constructor(comparator: (first: T, second: T) => number) {
		super(
			() => null,
			(a, b) => comparator(a, b) > 0 ? a : b,
			(min) => min
		);
	}
}

class SumCollector extends BaseCollector<number, number, number>{
	constructor() {
		super(
			() => 0,
			(a, b) => a + b,
			(sum) => sum
		);
	}
}

class AveragingCollector extends BaseCollector<number, number, number>{
	private mCount: number;

	constructor() {
		super(
			() => 0,
			(a, b) => this.addAndIncrement(a, b),
			(sum) => (sum / this.count())
		);
	}

	private count(): number {
		return this.mCount;
	}

	private addAndIncrement(a: number, b: number): number {
		this.mCount++;
		return a + b;
	}
}

