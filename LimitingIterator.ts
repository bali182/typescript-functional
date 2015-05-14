/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

class LimitingIterator<T> extends DelegateIterator<T> {
	private mLimit: number;
	private mIteratedCount: number;

	constructor(delegate: Iterator<T>, limit: number) {
		super(delegate)
		this.mLimit = limit;
		this.mIteratedCount = 0;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("no more elements");
		}
		var next = this.mDelegate.next();
		this.mIteratedCount++;
		return next;
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext() && this.mIteratedCount < this.mLimit;
	}
}