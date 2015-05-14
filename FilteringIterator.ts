/// <reference path="DelegateIterator" />

class FilteringIterator<T> extends DelegateIterator<T> {

	private mPredicate: (input: T) => boolean;
	private mConsumed: boolean = true;
	private mCurrent: T;

	public constructor(delegate: Iterator<T>, predicate: (input: T) => boolean) {
		super(delegate);
		this.mPredicate = predicate;
	}

	hasNext(): boolean {
		if (this.mConsumed) {
			while (this.mDelegate.hasNext()) {
				var next: T = this.mDelegate.next();
				if (this.mPredicate(next)) {
					this.mCurrent = next;
					this.mConsumed = false;
					break;
				}
			}
		}
		return false;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		this.mConsumed = true;
		return this.mCurrent;
	}
}