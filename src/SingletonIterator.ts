/// <reference path="Iterator" />

module tsf {
	/**
	 * Iterator, which iterates on an array of any type.
	 */
	export class SingletonIterator<T> implements Iterator<T> {
		/** The iterated element. */
		private mItem: T;
		/** Flag marking, if the iterator has a next element or not. */
		private mHasNext: boolean = true;
	
		/**
		 * Constructor.
		 * @param array The iterated array.
		 */
		constructor(item: T) {
			this.mItem = item;
		}
	
		next(): T {
			if (!this.hasNext()) {
				throw new Error("Already iterated");
			}
			this.mHasNext = false;
			return this.mItem;
		}
	
		hasNext(): boolean {
			return this.mHasNext;
		}
		
		isFinite() {
			return true;
		}
	}
}
