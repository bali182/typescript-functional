/// <reference path="Iterator" />

module tsf {
	/**
	 * Iterator, which has no elements, meaning it's hasNext() is always false, and it's next() 
	 * always throws an Error.
	 */
	export class EmptyIterator<T> implements Iterator<T> {
		/** The singleton instance. */
		private static INSTANCE: EmptyIterator<any> = new EmptyIterator<any>();
		
		/** Accessor method for the singleton instance. */
		public static instance<T>(): Iterator<T> {
			return EmptyIterator.INSTANCE;
		}

		next(): T {
			throw new Error("No such element");
		}

		hasNext(): boolean {
			return false;
		}

		isFinite() {
			return true;
		}

		toString() {
			return 'EmptyIterator()';
		}
	}
}
