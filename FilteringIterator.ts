/// <reference path="DelegateIterator" />

/**
 * Iterator, which filters the elements of a delegate iterator using a predicate function.
 */
class FilteringIterator<T> extends DelegateIterator<T> {
	
	/** The predicate to use for filtering. */
	private mPredicate: (input: T) => boolean;
	/** Flag indicating if the current element was already consumed or not. */
	private mConsumed: boolean = true;
	/** The current element. */
	private mCurrent: T;
	
	/**
	 * Constructor.
	 * @param delegate The delegate iterator.
	 * @param predicate The predicate used for filtering.
	 */
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
					return true;
				}
			}
			return false;
		}
		return true;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element");
		}
		this.mConsumed = true;
		return this.mCurrent;
	}
}