/// <reference path="Sequence" />
/// <reference path="IteratorSequence" />
/// <reference path="ArrayIterator" />
/// <reference path="EndlessIterator" />
/// <reference path="EndlessRepeatingIterator" />
/// <reference path="RangeIterator" />
/// <reference path="EmptySequence" />

/** Collection of static utility methods to work with streams. */
class Sequences {
	
	/** 
	 * Constructs a Stream from the given iterator.
	 * @param iterator The iterator.
	 */
	public static ofIterator<T>(iterator: Iterator<T>): Sequence<T> {
		return new IteratorSequence(iterator);
	}
	
	/**
	 * Constructs a Stream from the given array.
	 * @param array The array.
	 */
	public static ofArray<T>(array: Array<T>): Sequence<T> {
		if (array.length == 0) {
			return Sequences.empty<T>();
		}
		return Sequences.ofIterator(new ArrayIterator(array));
	}
	
	/**
	 * Constructs a Stream from a single value.
	 * @param value The value.
	 */
	public static ofValue<T>(value: T): Sequence<T> {
		return Sequences.ofArray([value]);
	}

	/**
	 * Constructs a Stream from variadic arguments.
	 * @param values The values.
	 */
	public static ofValues<T>(...values: Array<T>): Sequence<T> {
		return Sequences.ofArray(values);
	}
	
	/**
	 * Constructs a Stream, which emits endlessly the value supplied by the given supplier.
	 * @param supplier The supplier.
	 */
	public static generate<T>(supplier: () => T): Sequence<T> {
		return Sequences.ofIterator(new EndlessIterator(supplier));
	}
	
	/**
	 * Constructs a Stream, which repeats the given value endlessly.
	 * @param value The repeated value.
	 */
	public static repeat<T>(value: T): Sequence<T> {
		return Sequences.ofIterator(new EndlessRepeatingIterator(value));
	}
	
	/**
	 * Constructs a Stream, which emits the numeric values in a given range.
	 * @param from The starting point of the iteration.
	 * @param end The end point of the iteration.
	 * @param (optional) The delta.
	 */
	public static range(from: number, to: number, delta?: number): Sequence<number> {
		return Sequences.ofIterator(new RangeIterator(from, to, delta));
	}
	
	/**
	 * Constructs a Stream, which emits the same elements, as the given array of Streams in order.
	 * @param streams The Streams to concatenate.
	 */
	public static concatenate<T>(...streams: Array<Sequence<T>>): Sequence<T> {
		if (streams.length === 0) {
			return Sequences.empty<T>();
		} else if (streams.length === 1) {
			return streams[0];
		} else {
			return Sequences.ofIterator(
				new ConcatenatingIterator(
					new MappingIterator(
						new ArrayIterator(streams), s => s.iterator()
					)
				)
			);
		}
	}
	
	/**
	 * Constructs an empty Stream.
	 */
	public static empty<T>(): Sequence<T> {
		return EmptySequence.instance<T>();
	}
}
