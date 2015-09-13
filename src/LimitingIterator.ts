/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

module tsf {
	/**
	 * Iterator, which limits the emited elements.
	 */
	export class LimitingIterator<T> extends DelegateIterator<T> {
		/** The limit of the emited elements */
		private mLimit: number;
		/** Internal indicator, on how many items have already been emited. */
		private mIteratedCount: number;
		
		/**
		 * Constructor.
		 * @param delegate The delegate iterator.
		 * @param limit The maximum amount of emited elements.
		 */
		constructor(delegate: Iterator<T>, limit: number) {
			super(delegate);
			this.mLimit = limit;
			this.mIteratedCount = 0;
		}

		next(): T {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			var next = this.mDelegate.next();
			this.mIteratedCount++;
			return next;
		}

		hasNext(): boolean {
			return this.mDelegate.hasNext() && this.mIteratedCount < this.mLimit;
		}

		isFinite() {
			return true;
		}

		toString() {
			return `limit(${this.mDelegate.toString() })`;
		}
	}
}
