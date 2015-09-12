/// <reference path="Iterator" />
/// <reference path="EmptyIterator" />
/// <reference path="IteratorChain" />
module tsf {
	/**
	 * Iterator, which chains together multiple iterators.
	 */
	export class ChainableIterator<T> implements Iterator<T> {
		
		/** The iterator chain. */
		private mChain: IteratorChain<T>;
		/** The currently iterated iterator. */
		private mCurrent: Iterator<T> = EmptyIterator.instance<T>();
		
		/**
		 * Constructor.
		 * @param chain The iterator chain.
		 */
		constructor(chain?: IteratorChain<T>) {
			this.mChain = chain || IteratorChain.empty<T>();
		}
		
		/**
		 * Adds the given iterator to this chain. Does not modify this instance.
		 * @param other The iterator to append to the chain.
		 */
		chain(other: Iterator<T>): ChainableIterator<T> {
			return new ChainableIterator(this.mChain.append(other));
		}

		next(): T {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			return this.mCurrent.next();
		}

		hasNext(): boolean {
			while (true) {
				if (this.mCurrent.hasNext()) {
					return true;
				} else if (!this.mCurrent.hasNext() && this.mChain.hasNext()) {
					this.mCurrent = this.mChain.next();
					this.mChain = this.mChain.tail();
				} else {
					return false;
				}
			}
			return false;
		}

		isFinite() {
			return this.mChain.isFinite();
		}
	}
}
