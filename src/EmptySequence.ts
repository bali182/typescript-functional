/// <reference path="IterableSequence" />
/// <reference path="EmptyIterator" />

module tsf {
	/** Sequence, which is built on top of an empty iterator. */
	export class EmptySequence<T> extends IterableSequence<T> {
		/** The singleton instance. */
		private static INSTANCE: EmptySequence<any> = new EmptySequence<any>();
		
		/** Accessor for the singleton instance. */
		public static instance<T>(): Sequence<T> {
			return EmptySequence.INSTANCE;
		}
		
		/** Empty constructor. */
		constructor() {
			super(() => EmptyIterator.instance<T>());
		}
	}
}
