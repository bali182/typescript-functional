/// <reference path="Iterator" />

module tsf {
	/**
	 * Iterator, which delegates next() and hasNext() to another iterator.
	 */
	export class DelegateIterator<T> implements Iterator<T> {
		
		/** The delegate. */
		protected mDelegate: Iterator<T>;
		
		/**
		 * Constructor.
		 * @param delegate The delegate.
		 */
		public constructor(delegate: Iterator<T>) {
			this.mDelegate = delegate;
		}
	
		hasNext(): boolean {
			return this.mDelegate.hasNext();
		}
	
		next(): T {
			return this.mDelegate.next();
		}
		
		isFinite() {
			return this.mDelegate.isFinite();
		}
	}
}
