/// <reference path="Iterator" />

module tsf {
	/** Iterator, that combines the elements of two Iterators. */
	export class ZipIterator<T, R> implements Iterator<{ first: T, second: R }> {
		/** The first iterator. */
		private mFirst: Iterator<T>;
		/** The second iterator. */
		private mSecond: Iterator<R>;
		
		/**
		 * Constructor.
		 * @param first The first iterator.
		 * @param second The second iterator.
		 */
		constructor(first: Iterator<T>, second: Iterator<R>) {
			this.mFirst = first;
			this.mSecond = second;
		}

		public hasNext(): boolean {
			return this.mFirst.hasNext() && this.mSecond.hasNext();
		}

		public next(): { first: T, second: R } {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			return { first: this.mFirst.next(), second: this.mSecond.next() };
		}

		isFinite() {
			return this.mFirst.isFinite() || this.mSecond.isFinite();
		}

		toString() {
			return `zip(first=${this.mFirst.toString() }, second=${this.mSecond.toString() })`;
		}
	}
}
