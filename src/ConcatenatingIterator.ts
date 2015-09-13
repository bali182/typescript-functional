/// <reference path="Iterator" />
/// <reference path="EmptyIterator" />
module tsf {
	/**
	 * Iterator, which concatenates more iterators.
	 */
	export class ConcatenatingIterator<T> implements Iterator<T> {
		
		/** The iterators to concatenate. */
		private mIterators: Iterator<Iterator<T>>;
		/** The currently iterated iterator. */
		private mCurrent: Iterator<T> = EmptyIterator.instance<T>();
		
		/**
		 * Constructor.
		 * @param iterators The iterators to concatenate.
		 */
		constructor(iterators: Iterator<Iterator<T>>) {
			this.mIterators = iterators;
		}
	
		next(): T {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			return this.mCurrent.next();
		}
	
		hasNext(): boolean {
			var currentHasNext: boolean = false;
			var guard = true;
			while (guard) {
				guard = !(currentHasNext = this.mCurrent.hasNext()) && this.mIterators.hasNext();
				if (!guard) {
					break;
				}
				this.mCurrent = this.mIterators.next();
			}
			return currentHasNext;
		}
	
		isFinite() {
			return this.mIterators.isFinite();
		}
		
		toString() {
			return `concatenate(${this.mIterators.toString()})`;
		}
	}
}
