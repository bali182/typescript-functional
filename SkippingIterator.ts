/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

/**
 * Iterator which skips a given amount of elements from the delegate iterator.
 */
class SkippingIterator<T> extends DelegateIterator<T> {
	
	/** The amount of elements to skip. */
	private mSkip: number;
	/** true, if the elements are already skiped, false otherwise. */
	private mSkiped: boolean;
	
	/**
	 * Constructor.
	 * @param delegate The delegate iterator.
	 * @param skip The number of skiped elements.
	 */
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