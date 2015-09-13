/// <reference path="Iterator" />

module tsf {
	/** Iterator, that repeats one element endlessly. */
	export class EndlessRepeatingIterator<T> implements Iterator<T> {
		/** The repeated element. */
		private mElement: T;
		
		/** 
		 * Constructor.
		 * @param repeated The endlessly repeated element.
		 */
		constructor(element: T) {
			this.mElement = element;
		}

		next(): T {
			return this.mElement;
		}

		hasNext(): boolean {
			return true;
		}

		isFinite() {
			return false;
		}

		toString() {
			return `repeating(${this.mElement})`;
		}
	}
}
