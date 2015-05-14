/// <reference path="IteratorStream" />
/// <reference path="Iterators" />
/// <reference path="ArrayIterator" />
/// <reference path="EndlessIterator" />
/// <reference path="RangeIterator" />

/**
 * Collection of static utility methods to work with streams.
 */
class Streams {
	
	/** 
	 * Constructs a Stream from the given iterator.
	 * @param iterator The iterator.
	 */
	public static ofIterator<T>(iterator: Iterator<T>): Stream<T> {
		return new IteratorStream(iterator);
	}
	
	/**
	 * Constructs a Stream from the given array.
	 * @param array The array.
	 */
	public static ofArray<T>(array: Array<T>): Stream<T> {
		return Streams.ofIterator(new ArrayIterator(array));
	}
	
	/**
	 * Constructs a Stream from a single value.
	 * @param value The value.
	 */
	public static ofValue<T>(value: T): Stream<T> {
		return Streams.ofArray([value]);
	}

	/**
	 * Constructs a Stream from variadic arguments.
	 * @param values The values.
	 */
	public static ofValues<T>(...values: Array<T>): Stream<T> {
		return Streams.ofArray(values);
	}
	
	/**
	 * Constructs a Stream, which emits endlessly the value supplied by the given supplier.
	 * @param supplier The supplier.
	 */
	public static generate<T>(supplier: () => T): Stream<T> {
		return Streams.ofIterator(new EndlessIterator(supplier));
	}
	
	/**
	 * Constructs a Stream, which repeats the given value endlessly.
	 * @param value The repeated value.
	 */
	public static repeat<T>(value: T): Stream<T> {
		return Streams.generate(() => value);
	}
	
	/**
	 * Constructs a Stream, which emits the numeric values in a given range.
	 * @param from The starting point of the iteration.
	 * @param end The end point of the iteration.
	 * @param (optional) The delta.
	 */
	public static range(from: number, to: number, delta?: number): Stream<number> {
		return Streams.ofIterator(new RangeIterator(from, to, delta));
	}
	
	/**
	 * Constructs a Stream, which emits the same elements, as the given array of Streams in order.
	 * @param streams The Streams to concatenate.
	 */
	public static concatenate<T>(...streams: Array<Stream<T>>): Stream<T> {
		if (streams.length == 0) {
			return Streams.empty<T>();
		} else if (streams.length == 1) {
			return streams[0];
		} else {
			return Streams.ofIterator(
				Iterators.concatenate(
					Iterators.map(
						new ArrayIterator(streams), s => s.iterator()
					)
				)
			);
		}
	}
	
	/**
	 * Constructs an empty Stream.
	 */
	public static empty<T>(): Stream<T> {
		return Streams.ofIterator(Iterators.empty<T>());
	}
}
