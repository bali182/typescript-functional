import { Itr } from './index'

/** Itr, that repeats one element endlessly. */
export class RepeatingItr<T> implements Itr<T> {
	/** The repeated element. */
	private mElement: T

	/** 
	 * Constructor.
	 * @param repeated The endlessly repeated element.
	 */
	constructor(element: T) {
		this.mElement = element
	}

	next(): T {
		return this.mElement
	}

	hasNext(): boolean {
		return true
	}

	isFinite() {
		return false
	}

	toString() {
		return `repeating(${this.mElement})`
	}
}
