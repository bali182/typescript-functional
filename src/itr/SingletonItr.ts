import { Itr } from './index'

/**
 * Itr, which iterates on an array of any type.
 */
export class SingletonItr<T> implements Itr<T> {
	/** The iterated element. */
	private mItem: T
	/** Flag marking, if the Itr has a next element or not. */
	private mHasNext: boolean = true

	/**
	 * Constructor.
	 * @param array The iterated array.
	 */
	constructor(item: T) {
		this.mItem = item
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("Already iterated")
		}
		this.mHasNext = false
		return this.mItem
	}

	hasNext(): boolean {
		return this.mHasNext
	}

	isFinite() {
		return true
	}

	toString() {
		return `singleton(${this.mItem})`
	}
}
