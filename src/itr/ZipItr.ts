import { Itr } from './index'
import { DelegateItr } from './DelegateItr'

/** Itr, that combines the elements of two Itrs. */
export class ZipItr<T, R> implements Itr<[T, R]> {
	/** The first Itr. */
	private mFirst: Itr<T>
	/** The second Itr. */
	private mSecond: Itr<R>

	/**
	 * Constructor.
	 * @param first The first Itr.
	 * @param second The second Itr.
	 */
	constructor(first: Itr<T>, second: Itr<R>) {
		this.mFirst = first
		this.mSecond = second
	}

	public hasNext(): boolean {
		return this.mFirst.hasNext() && this.mSecond.hasNext()
	}

	public next(): [T, R] {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		return [this.mFirst.next(), this.mSecond.next()]
	}

	isFinite() {
		return this.mFirst.isFinite() || this.mSecond.isFinite()
	}

	toString() {
		return `zip(first=${this.mFirst.toString()}, second=${this.mSecond.toString()})`
	}
}
