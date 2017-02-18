import { Itr } from './index'
import { ItrChain } from './ItrChain'
import { EmptyItr } from './EmptyItr'

/**
 * Iterator, which chains together multiple iterators.
 */
export class ChainableItr<T> implements Itr<T> {

	/** The iterator chain. */
	private mChain: ItrChain<T>
	/** The currently iterated iterator. */
	private mCurrent: Itr<T> = EmptyItr.instance<T>()

	/**
	 * Constructor.
	 * @param chain The iterator chain.
	 */
	constructor(chain?: ItrChain<T>) {
		this.mChain = chain || ItrChain.empty<T>()
	}

	/**
	 * Adds the given iterator to this chain. Does not modify this instance.
	 * @param other The iterator to append to the chain.
	 */
	chain(other: Itr<T>): ChainableItr<T> {
		return new ChainableItr(this.mChain.append(other))
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		return this.mCurrent.next()
	}

	hasNext(): boolean {
		while (true) {
			if (this.mCurrent.hasNext()) {
				return true
			} else if (!this.mCurrent.hasNext() && this.mChain.hasNext()) {
				this.mCurrent = this.mChain.next()
				this.mChain = this.mChain.tail()
			} else {
				return false
			}
		}
	}

	isFinite() {
		return this.mChain.isFinite()
	}

	toString() {
		return `chainable(${this.mChain.toString()})`
	}
}
