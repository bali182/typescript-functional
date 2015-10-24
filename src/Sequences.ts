/// <reference path="Sequence" />
/// <reference path="IterableSequence" />
/// <reference path="ArrayIterator" />
/// <reference path="EndlessIterator" />
/// <reference path="EndlessRepeatingIterator" />
/// <reference path="RangeIterator" />
/// <reference path="SingletonIterator" />
/// <reference path="EmptySequence" />

module tsf {
	/** Collection of static utility methods to work with Sequences. */
	export class Sequences {
		/**
		 * Constructs a sequence from the given iterator generator (iterable)
		 * @param iterable The iterator generator function.
		 */
		public static ofIterable<T>(iterable: () => Iterator<T>): Sequence<T> {
			return new IterableSequence(iterable);
		}
		
		/**
		 * Constructs a Sequence from the given array.
		 * @param array The array.
		 */
		public static ofArray<T>(array: Array<T>): Sequence<T> {
			if (array.length === 0) {
				return Sequences.empty<T>();
			}
			return Sequences.ofIterable(() => new ArrayIterator(array));
		}
		
		/**
		 * Constructs a Sequence from a single value.
		 * @param value The value.
		 */
		public static ofValue<T>(value: T): Sequence<T> {
			return Sequences.ofIterable<T>(() => new SingletonIterator(value));
		}
	
		/**
		 * Constructs a Sequence from variadic arguments.
		 * @param values The values.
		 */
		public static ofValues<T>(...values: Array<T>): Sequence<T> {
			switch (values.length) {
				case 0: return this.empty<T>();
				case 1: return this.ofValue(values[0]);
				default: return this.ofArray(values);
			}
		}
		
		/**
		 * Constructs a Sequence, which emits endlessly the value supplied by the given supplier.
		 * @param supplier The supplier.
		 */
		public static generate<T>(supplier: () => T): Sequence<T> {
			return Sequences.ofIterable(() => new EndlessIterator(supplier));
		}
		
		/**
		 * Constructs a Sequence, which repeats the given value endlessly.
		 * @param value The repeated value.
		 */
		public static repeat<T>(value: T): Sequence<T> {
			return Sequences.ofIterable(() => new EndlessRepeatingIterator(value));
		}
		
		/**
		 * Constructs a Sequence, which emits the numeric values in a given range.
		 * @param from The starting point of the iteration.
		 * @param end The end point of the iteration.
		 * @param (optional) The delta.
		 */
		public static range(from: number, to: number, delta?: number): Sequence<number> {
			return Sequences.ofIterable(() => new RangeIterator(from, to, delta));
		}
		
		/**
		 * Constructs a Sequence, which emits the same elements, as the given array of Sequences in order.
		 * @param Sequences The Sequences to concatenate.
		 */
		public static concatenate<T>(...sequences: Array<Sequence<T>>): Sequence<T> {
			if (sequences.length === 0) {
				return Sequences.empty<T>();
			} else if (Sequences.length === 1) {
				return sequences[0];
			} else {
				return Sequences.ofIterable(
					() => new ConcatenatingIterator(
						new MappingIterator(
							new ArrayIterator(sequences), s => s.iterator()
							)
						)
					);
			}
		}
		
		/**
		 * Constructs an empty Sequence.
		 */
		public static empty<T>(): Sequence<T> {
			return EmptySequence.instance<T>();
		}
	}
}
