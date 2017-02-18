import { Itr } from './index'

/**
 * Iterator, which delegates next() and hasNext() to another Iterator.
 */
export class DelegateItr<T> implements Itr<T> {

	/** The delegate. */
	protected mDelegate: Itr<T>

	/**
	 * Constructor.
	 * @param delegate The delegate.
	 */
	public constructor(delegate: Itr<T>) {
		this.mDelegate = delegate
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext()
	}

	next(): T {
		return this.mDelegate.next()
	}

	isFinite() {
		return this.mDelegate.isFinite()
	}

	toString() {
		return `delegate(${this.mDelegate.toString()})`
	}
}
