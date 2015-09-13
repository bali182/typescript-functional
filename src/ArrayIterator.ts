/// <reference path="Iterator" />

module tsf {
	/**
	 * Iterator, which iterates on an array of any type.
	 */
	export class ArrayIterator<T> implements Iterator<T> {
		/** The iterated array. */
		private mArray: Array<T>;
		/** The current index of the iteration. */
		private mIndex: number;
		/** The index to start the iteration from. */
		private mFrom: number;
		/** The index to end the iteration at. */
		private mTo: number;
		/** The step to modify the mCurrent each step. */
		private mStep: number;
		
		/**
		 * Constructor.
		 * @param array The iterated array.
		 */
		constructor(array: Array<T>, from?: number, to?: number, step?: number) {
			this.mArray = array;
			this.mFrom = from || 0;
			this.mTo = to || array.length;
			this.mStep = step || 1;
			this.mIndex = this.mFrom;
		}

		next(): T {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			var currentIndex = this.mIndex;
			this.mIndex = this.mIndex + this.mStep;
			return this.mArray[currentIndex];
		}

		hasNext(): boolean {
			return this.mStep > 0 ? this.mIndex < this.mTo : this.mIndex >= this.mTo;
		}

		isFinite() {
			return true;
		}

		toString() {
			return `ArrayIterator(${this.mArray.join(', ') })`;
		}
	}
}
