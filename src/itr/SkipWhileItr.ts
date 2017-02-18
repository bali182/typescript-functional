import { Itr } from './index'
import { DelegateItr } from './DelegateItr'

/**
 * Itr which skips a given amount of elements from the delegate Itr.
 */
export class SkipWhileItr<T> extends DelegateItr<T> {

	/** The amount of elements to skip. */
	private mPredicate: (input: T) => boolean
	/** true, if the elements are already skiped, false otherwise. */
	private mSkipped: boolean = false
	private mConsumed: boolean = true
	private mHead: T

	/**
	 * Constructor.
	 * @param delegate The delegate Itr.
	 * @param skip The number of skiped elements.
	 */
	constructor(delegate: Itr<T>, predicate: (input: T) => boolean) {
		super(delegate)
		this.mPredicate = predicate
	}

	hasNext(): boolean {
		if (!this.mSkipped) {
			var delegate = this.mDelegate
			var predicate = this.mPredicate
			while (delegate.hasNext()) {
				var next = delegate.next()
				if (!predicate(next)) {
					this.mHead = next
					this.mConsumed = false
					break
				}
			}
			this.mSkipped = true
		}
		return !this.mConsumed || this.mDelegate.hasNext()
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		if (!this.mConsumed) {
			this.mConsumed = true
			return this.mHead
		}
		return this.mDelegate.next()
	}

	toString() {
		return `skipWhile(${this.mDelegate.toString()})`
	}
}
