/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

class SkippingIterator<T> extends DelegateIterator<T> {
	
	private mSkip: number;
	private mSkiped: boolean;

	constructor(delegate: Iterator<T>, skip: number) {
		super(delegate);
		this.mSkip = skip;
		this.mSkiped = false;
	}

	hasNext(): boolean {
		if (!this.mSkiped) {
			var skipedCt = 0;
			while (this.mDelegate.hasNext() && skipedCt < this.mSkip) {
				this.mDelegate.next();
				skipedCt++;
			}
			this.mSkiped = true;
		}
		return this.mDelegate.hasNext();
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		return this.mDelegate.next();
	}
}