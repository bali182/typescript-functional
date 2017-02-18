import { Itr } from './index'
import { EmptyItr } from './EmptyItr'

/**
 * Iterator, which concatenates more iterators.
 */
export class ConcatenatingItr<T> implements Itr<T> {

	/** The iterators to concatenate. */
	private mItrs: Itr<Itr<T>>
	/** The currently iterated iterator. */
	private mCurrent: Itr<T> = EmptyItr.instance<T>()

	/**
	 * Constructor.
	 * @param itrs The iterators to concatenate.
	 */
	constructor(itrs: Itr<Itr<T>>) {
		this.mItrs = itrs
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		return this.mCurrent.next()
	}

	hasNext(): boolean {
		var currentHasNext: boolean = false
		var guard = true
		while (guard) {
			guard = !(currentHasNext = this.mCurrent.hasNext()) && this.mItrs.hasNext()
			if (!guard) {
				break
			}
			this.mCurrent = this.mItrs.next()
		}
		return currentHasNext
	}

	isFinite() {
		return this.mItrs.isFinite()
	}

	toString() {
		return `concatenate(${this.mItrs.toString()})`
	}
}
