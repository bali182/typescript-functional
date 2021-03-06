import { Itr, ofArray as itrOfArray, repeat as itrRepeat, range as itrRange, map, endless, singleton } from '../itr'
import { ConcatenatingItr } from '../itr/ConcatenatingItr'

import { Option } from '../option'
import { IterableSeq } from './IterableSeq'
import { EmptySeq } from './EmptySeq'

/**
 * A Sequence is a (possibly endless) sequence of elements, providing a comfortable interface to manipulate it's elements.
 * Just like an Itr, a Sequence can be consumed (elements iterated) only once.
 */
export interface Seq<T> {
	/**
	 * Returns whether all elements of this Sequence match the provided predicate.
	 * @param predicate The predicate, that all elements supposed to match, for this function to return true.
	 */
	all(predicate: (input: T) => boolean): boolean

	/**
	 * Returns whether any elements of this Sequence match the provided predicate.
	 * @param predicate The predicate, that at least one elements supposed to match, for this function to return true.
	 */
	any(predicate: (input: T) => boolean): boolean

	/**
	 * Returns the element of the underlying Itr at the specified index, wrapped in an Optional, or Optional#empty() if the index doesn't exist.
	 * @param index The index of the element to return to.
	 */
	at(index: number): Option<T>

	/**
	 * Creates a lazily concatenated Sequence whose elements are all the elements of this Sequence followed by all the elements of the other Sequence.
	 * @param other The other Sequence.
	 */
	append(other: Seq<T>): Seq<T>

	/**
	 * Finds the average of this Sequence, by first transforming the elements to their numeric representation, using the given mapper function,
	 * then calculating the sum of the numeric values, finally dividing them by the count of elements in the Sequence.
	 */
	average(mapper: (input: T) => number): number

	/**
	 * Returns true, if this sequence contains the given item, false otherwise.
	 * @param The item you are looking for.
	 * @param The equality comparer function. Uses === by default.
	 */
	contains(item: T, equality?: (a: T, b: T) => boolean): boolean

	/**
	 * Returns the amount of elements matching the given predicate in this Sequence.
	 */
	count(predicate?: (item: T) => boolean): number

	/** 
	 * Returns a Sequence, that contains only the elements of this Sequence, for which the parameter predicate returns true.
	 * @param predicate The predicate, which is applied to all elements, and for which it returns true, will be included in the returned Sequence
	 */
	filter(predicate: (input: T) => boolean): Seq<T>

	/**
	 * Returns the first element of this Sequence, that matches the given predicate, wrapped in an Optional. If there is no such element,
	 * Optional#empty() will be returned.
	 * @param predicate The predicate.
	 */
	findFirst(predicate: (input: T) => boolean): Option<T>

	/**
	 * Returns the last element of this Sequence, that matches the given predicate, wrapped in an Optional. If there is no such element,
	 * Optional#empty() will be returned.
	 * @param predicate The predicate.
	 */
	findLast(predicate: (input: T) => boolean): Option<T>

	/**
	 * Returns a Sequence consisting of the concatenated elements of the results of applying the Sequenceify function to each element.
	 * @param Sequenceify The function, that transforms each element to a Sequence.
	 */
	flatten<R>(sequencify: (input: T) => Seq<R>): Seq<R>

	/**
	 * Reduces the Sequence, using the binary function, and the initial value.
	 * @param reducer The binary function.
	 * @param initial The initial value.
	 */
	fold<R>(reducer: (left: R, right: T) => R, initial: R): R

	/**
	 * Consumes all the elements of this Sequence using the parameter consumer function.
	 * @param consumer The consumer function.
	 */
	forEach(consumer: (input: T) => void): void

	/**
	 * Returns the first element in this Sequence, wrapped in an Optional. If the Sequence is empty, Optional#empty() is returned.
	 */
	head(): Option<T>

	/**
	 * Returns the index of the given elements, if present in the sequence, -1 if not.
	 * @param The item you are looking for.
	 * @param The equality comparer function. Uses === by default.
	 */
	indexOf(item: T, equality?: (a: T, b: T) => boolean): Option<number>

	/**
	 * Returns the iterator, of this Sequence.
	 */
	iterator(): Itr<T>

	/**
	 * Joins the Sequences contents to a single string.
	 * @param separator The separator between the elements. Empty string ("") by default.
	 * @param prefix The prefix of the generated string. Empty string ("") by default.
	 * @param postfix The postfix of the generated string. Empty string ("") by default.
	 */
	join(separator?: string, prefix?: string, suffix?: string): string

	/**
	 * Returns the last element of this Sequence wrapped in an Optional. If the Sequence is empty, Optional#empty() is returned.
	 */
	last(): Option<T>

	/**
	 * Returns a Sequence consisting of the elements of this Sequence, truncated to be no longer than limit in length.
	 * @param limit The maximum amount of elements.
	 */
	limit(limit: number): Seq<T>

	/**
	 * Returns a Sequence, that contains the results of applying the given mapper function to the elements of this Sequence.
	 * @param mapper The function that is called to transform each element of the Sequence.
	 */
	map<R>(mapper: (input: T) => R): Seq<R>

	/**
	 * Returns the maximum element of this Sequence, wrapped in an Optional, using the given comparator. If the Sequence is empty, Optional#empty() is returned.
	 * @param comparator The comparator used to compare elements in the Sequence.
	 */
	max(comparator: (first: T, second: T) => number): Option<T>

	/**
	 * Returns the minimum element of this Sequence, wrapped in an Optional, using the given comparator. If the Sequence is empty, Optional#empty() is returned.
	 * @param comparator The comparator used to compare elements in the Sequence.
	 */
	min(comparator: (first: T, second: T) => number): Option<T>

	/**
	 * Returns a Sequence, which will perform the parameter side effect (consumer) for each element, when the Sequence is consumed.
	 * @param consumer The consumer function, to perform on each element.
	 */
	peek(consumer: (input: T) => void): Seq<T>

	/**
	 * Performs a reduction on this Sequence using the parameter binary function. If the collection is empty, this method throws an error.
	 * @param reducer The binary function to calculate the accumulated value.
	 */
	reduce(reducer: (left: T, right: T) => T): Option<T>

	/**
	 * Returns a Sequence consisting of the remaining elements of this Sequence after discarding the first n elements of the Sequence.
	 * @param amount the amount of elements to discard.
	 */
	skip(amount: number): Seq<T>

	/**
	 * Skips the contents of this Sequence, while the given predicate returns true.
	 * @param predicate The predicate.
	 */
	skipWhile(predicate: (input: T) => boolean): Seq<T>

	/**
	 * Returns the sum of the elements in this Sequence, by first calling the mapper function on each element, then 
	 * accumulating every element using the + operator.
	 * @param mapper The function, which maps each element to it's numeric representation.
	 */
	sum(mapper: (input: T) => number): number

	/** 
	 * Returns a Sequence containing the elements of this Sequence, except the very first one. Returns an empty Sequence, if this 
	 * Sequence has one or zero elements. 
	 */
	tail(): Seq<T>

	/**
	 * Takes the contents of this Sequence, while the given predicate returns true.
	 * @param predicate The predicate.
	 */
	takeWhile(predicate: (input: T) => boolean): Seq<T>

	/**
	 * Returns an array containing the elements of this Sequence.
	 */
	toArray(): Array<T>

	/**
	 * Returns a new Sequence, which contains the combined result (calculated by the combiner function) of this Sequence and the parameter Sequence.
	 * @param combiner The combiner function.
	 */
	zip<R, E>(other: Seq<R>, combiner: (first: T, second: R) => E): Seq<E>
}


/**
 * Constructs a sequence from the given Itr generator (iterable)
 * @param iterable The Itr generator function.
 */
export function ofIterable<T>(iterable: () => Itr<T>): Seq<T> {
	return new IterableSeq(iterable)
}

/**
 * Constructs a Sequence from the given array.
 * @param array The array.
 */
export function ofArray<T>(array: Array<T>): Seq<T> {
	if (array.length === 0) {
		return EmptySeq.instance<T>()
	}
	return ofIterable(() => itrOfArray(array))
}

/**
 * Constructs a Sequence from a single value.
 * @param value The value.
 */
export function ofValue<T>(value: T): Seq<T> {
	return ofIterable<T>(() => singleton(value))
}

/**
 * Constructs a Sequence from variadic arguments.
 * @param values The values.
 */
export function ofValues<T>(...values: Array<T>): Seq<T> {
	switch (values.length) {
		case 0: return EmptySeq.instance<T>()
		case 1: return ofValue(values[0])
		default: return ofArray(values)
	}
}

/**
 * Constructs a Sequence, which emits endlessly the value supplied by the given supplier.
 * @param supplier The supplier.
 */
export function generate<T>(supplier: () => T): Seq<T> {
	return ofIterable(() => endless(supplier))
}

/**
 * Constructs a Sequence, which repeats the given value endlessly.
 * @param value The repeated value.
 */
export function repeat<T>(value: T): Seq<T> {
	return ofIterable(() => itrRepeat(value))
}

/**
 * Constructs a Sequence, which emits the numeric values in a given range.
 * @param from The starting point of the iteration.
 * @param end The end point of the iteration.
 * @param (optional) The delta.
 */
export function range(from: number, to: number, delta?: number): Seq<number> {
	return ofIterable(() => itrRange(from, to, delta))
}

/**
 * Constructs a Sequence, which emits the same elements, as the given array of Sequences in order.
 * @param Sequences The Sequences to concatenate.
 */
export function concatenate<T>(...sequences: Array<Seq<T>>): Seq<T> {
	if (sequences.length === 0) {
		return EmptySeq.instance<T>()
	} else if (length === 1) {
		return sequences[0]
	} else {
		return ofIterable(
			() => new ConcatenatingItr(
				map(itrOfArray(sequences), s => s.iterator())
			)
		)
	}
}

export function empty<T>(): Seq<T> {
	return EmptySeq.instance<T>()
}
