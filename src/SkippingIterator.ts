/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />

module tsf {
	/**
	 * Iterator which skips a given amount of elements from the delegate iterator.
	 */
	export class SkippingIterator<T> extends DelegateIterator<T> {
		
		/** The amount of elements to skip. */
		private mSkip: number;
		/** true, if the elements are already skiped, false otherwise. */
		private mSkipped: boolean = false;
		
		/**
		 * Constructor.
		 * @param delegate The delegate iterator.
		 * @param skip The number of skiped elements.
		 */
		constructor(delegate: Iterator<T>, skip: number) {
			super(delegate);
			this.mSkip = skip;
		}

		hasNext(): boolean {
			if (!this.mSkipped) {
				var skippedAmount = 0;
				var delegate = this.mDelegate;
				var skip = this.mSkip;

				while (delegate.hasNext() && skippedAmount < skip) {
					delegate.next();
					skippedAmount++;
				}
				this.mSkipped = true;
			}
			return this.mDelegate.hasNext();
		}

		next(): T {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			return this.mDelegate.next();
		}

		toString() {
			return `SkippingIterator(${this.mDelegate.toString() })`;
		}
	}
}
