/// <reference path="Optional" />
/// <reference path="Collector" />

/**
 * A Stream is a (possibly endless) sequence of elements, providing a comfortable interface to manipulate it's elements.
 * Just like an Iterator, a Stream can be consumed (elements iterated) only once.
 */
interface Sequence<T> {
	/**
	 * Returns whether all elements of this stream match the provided predicate.
	 * @param predicate The predicate, that all elements supposed to match, for this function to return true.
	 */
	all(predicate: (input: T) => boolean): boolean
	
	/**
	 * Returns whether any elements of this stream match the provided predicate.
	 * @param predicate The predicate, that at least one elements supposed to match, for this function to return true.
	 */
	any(predicate: (input: T) => boolean): boolean
	
	/**
	 * Returns the element of the underlying Iterator at the specified index, wrapped in an Optional, or Optional#empty() if the index doesn't exist.
	 * @param index The index of the element to return to.
	 */
	at(index: number): Optional<T>;
	
	/**
	 * Creates a lazily concatenated stream whose elements are all the elements of this stream followed by all the elements of the other stream.
	 * @param other The other stream.
	 */
	append(other: Sequence<T>): Sequence<T>
	
	/**
	 * Finds the average of this Stream, by first transforming the elements to their numeric representation, using the given mapper function,
	 * then calculating the sum of the numeric values, finally dividing them by the count of elements in the Stream.
	 */
	average(mapper: (input: T) => number): number
	
	/**
	 * Performs a reduction of this Stream, using the parameter Collector.
	 * @param collector The collector used to reduce the elements of this Stream.
	 */
	collect<I, R>(collector: Collector<I, T, R>): R
	
	/**
	 * Returns the amount of elements in this Stream.
	 */
	count(): number

	/** 
	 * Returns a Stream, that contains only the elements of this stream, for which the parameter predicate returns true.
	 * @param predicate The predicate, which is applied to all elements, and for which it returns true, will be included in the returned Stream
	 */
	filter(predicate: (input: T) => boolean): Sequence<T>;

	/**
	 * Returns the first element of this Stream, that matches the given predicate, wrapped in an Optional. If there is no such element,
	 * Optional#empty() will be returned.
	 * @param predicate The predicate.
	 */
	findFirst(predicate: (input: T) => boolean): Optional<T>;
	
	/**
	 * Returns the last element of this Stream, that matches the given predicate, wrapped in an Optional. If there is no such element,
	 * Optional#empty() will be returned.
	 * @param predicate The predicate.
	 */
	findLast(predicate: (input: T) => boolean): Optional<T>;
	
	/**
	 * Returns a Stream consisting of the concatenated elements of the results of applying the streamify function to each element.
	 * @param streamify The function, that transforms each element to a Stream.
	 */
	flatten<R>(streamify: (input: T) => Sequence<R>): Sequence<R>;
	
	/**
	 * Consumes all the elements of this Stream using the parameter consumer function.
	 * @param consumer The consumer function.
	 */
	forEach(consumer: (input: T) => void): void
	
	/**
	 * Returns the first element in this Stream, wrapped in an Optional. If the Stream is empty, Optional#empty() is returned.
	 */
	head(): Optional<T>
	
	/**
	 * Returns true, if the Stream was already iterated, false otherwise.
	 */
	isConsumed(): boolean
	
	/**
	 * Returns the Iterator, of this Stream.
	 */
	iterator(): Iterator<T>
	
	/**
	 * Joins the Streams contents to a single string.
	 * @param separator The separator between the elements. Empty string ("") by default.
	 * @param prefix The prefix of the generated string. Empty string ("") by default.
	 * @param postfix The postfix of the generated string. Empty string ("") by default.
	 */
	join(separator?: string, prefix?: string, suffix?: string): string

	/**
	 * Returns the last element of this Stream wrapped in an Optional. If the Stream is empty, Optional#empty() is returned.
	 */
	last(): Optional<T>
	
	/**
	 * Returns a stream consisting of the elements of this stream, truncated to be no longer than limit in length.
	 * @param limit The maximum amount of elements.
	 */
	limit(limit: number): Sequence<T>

	/**
	 * Returns a Stream, that contains the results of applying the given mapper function to the elements of this Stream.
	 * @param mapper The function that is called to transform each element of the Stream.
	 */
	map<R>(mapper: (input: T) => R): Sequence<R>
	
	/**
	 * Returns the maximum element of this Stream, wrapped in an Optional, using the given comparator. If the Stream is empty, Optional#empty() is returned.
	 * @param comparator The comparator used to compare elements in the Stream.
	 */
	max(comparator: (first: T, second: T) => number): Optional<T>
	
	/**
	 * Returns the minimum element of this Stream, wrapped in an Optional, using the given comparator. If the Stream is empty, Optional#empty() is returned.
	 * @param comparator The comparator used to compare elements in the Stream.
	 */
	min(comparator: (first: T, second: T) => number): Optional<T>
	
	/**
	 * Returns a Stream, which consist of Streams no longer than partitionSize.
	 * @param partitionSize The maximum size of a sub-Stream (a partition).
	 */
	partition(partitionSize: number): Sequence<Sequence<T>>;
	
	/**
	 * Returns a Stream, which will perform the parameter side effect (consumer) for each element, when the Stream is consumed.
	 * @param consumer The consumer function, to perform on each element.
	 */
	peek(consumer: (input: T) => void): Sequence<T>
	
	/**
	 * Performs a reduction on this Stream using the parameter binary function.
	 * @param reducer The binary function to calculate the accumulated value.
	 * @param initial (Optional) The inital value.
	 */
	reduce(reducer: (left: T, right: T) => T, initial?: T): T
	
	/**
	 * Returns a stream consisting of the remaining elements of this stream after discarding the first n elements of the stream.
	 * @param amount the amount of elements to discard.
	 */
	skip(amount: number): Sequence<T>
	
	/**
	 * Skips the contents of this Sequence, while the given predicate returns true.
	 * @param predicate The predicate.
	 */
	skipWhile(predicate: (input: T) => boolean): Sequence<T>
	
	/**
	 * Returns the sum of the elements in this Stream, by first calling the mapper function on each element, then 
	 * accumulating every element using the + operator.
	 * @param mapper The function, which maps each element to it's numeric representation.
	 */
	sum(mapper: (input: T) => number): number
	
	/** 
	 * Returns a Stream containing the elements of this Stream, except the very first one. Returns an empty Stream, if this 
	 * Stream has one or zero elements. 
	 */
	tail(): Sequence<T>
	
	/**
	 * Takes the contents of this Sequence, while the given predicate returns true.
	 * @param predicate The predicate.
	 */
	takeWhile(predicate: (input: T) => boolean): Sequence<T>
	
	/**
	 * Returns an array containing the elements of this Stream.
	 */
	toArray(): Array<T>
	
	/**
	 * Returns a new Stream, which contains the combined result (calculated by the combiner function) of this Stream and the parameter Stream.
	 * @param combiner The combiner function.
	 */
	zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E>;
}
