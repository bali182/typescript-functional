/// <reference path="Iterator" />

module tsf {
	/**
	 * Iterator, which maps each element from a delegate iterator to the return value of a mapper function.
	 */
	export class MappingIterator<T, R> implements Iterator<R> {
		/** The mapper function. */
		private mMapper: (input: T) => R;
		/** The delegate iterator. */
		private mDelegate: Iterator<T>;
		
		/**
		 * Constructor.
		 * @param delegate The delegate iterator.
		 * @param mapper The mapper function.
		 */
		constructor(delegate: Iterator<T>, mapper: (input: T) => R) {
			this.mMapper = mapper;
			this.mDelegate = delegate;
		}

		next(): R {
			return this.mMapper(this.mDelegate.next());
		}

		hasNext(): boolean {
			return this.mDelegate.hasNext();
		}

		isFinite() {
			return this.mDelegate.isFinite();
		}

		toString() {
			return `map(${this.mDelegate.toString() })`;
		}
	}
}
