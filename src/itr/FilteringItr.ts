import { Itr } from './index'
import { DelegateItr } from './DelegateItr'

/**
 * Itr, which filters the elements of a delegate Itr using a predicate function.
 */
export class FilteringItr<T> extends DelegateItr<T> {

	/** The predicate to use for filtering. */
	private mPredicate: (input: T) => boolean
	/** Flag indicating if the current element was already consumed or not. */
	private mConsumed: boolean = true
	/** The current element. */
	private mCurrent: T

	/**
	 * Constructor.
	 * @param delegate The delegate Itr.
	 * @param predicate The predicate used for filtering.
	 */
	public constructor(delegate: Itr<T>, predicate: (input: T) => boolean) {
		super(delegate)
		this.mPredicate = predicate
	}

	hasNext(): boolean {
		var predicate = this.mPredicate
		var delegate = this.mDelegate
		if (this.mConsumed) {
			while (delegate.hasNext()) {
				var next: T = delegate.next()
				if (predicate(next)) {
					this.mCurrent = next
					this.mConsumed = false
					return true
				}
			}
			return false
		}
		return true
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		this.mConsumed = true
		return this.mCurrent
	}

	toString() {
		return `filter(${this.mDelegate.toString()})`
	}
}
