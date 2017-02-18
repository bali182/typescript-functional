import { Itr } from './index'
import { DelegateItr } from './DelegateItr'

/**
 * Itr which skips a given amount of elements from the delegate Itr.
 */
export class SkippingItr<T> extends DelegateItr<T> {

	/** The amount of elements to skip. */
	private mSkip: number
	/** true, if the elements are already skiped, false otherwise. */
	private mSkipped: boolean = false

	/**
	 * Constructor.
	 * @param delegate The delegate Itr.
	 * @param skip The number of skiped elements.
	 */
	constructor(delegate: Itr<T>, skip: number) {
		super(delegate)
		this.mSkip = skip
	}

	hasNext(): boolean {
		if (!this.mSkipped) {
			var skippedAmount = 0
			var delegate = this.mDelegate
			var skip = this.mSkip

			while (delegate.hasNext() && skippedAmount < skip) {
				delegate.next()
				skippedAmount++
			}
			this.mSkipped = true
		}
		return this.mDelegate.hasNext()
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		return this.mDelegate.next()
	}

	toString() {
		return `skip(${this.mDelegate.toString()})`
	}
}
