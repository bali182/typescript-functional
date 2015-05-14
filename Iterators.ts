/// <reference path="Iterator" />
/// <reference path="Optional" />

/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />

/**
 * Collection of static methods, which operate on iterators.
 */
class Iterators {
	
	/**
	 * Returns an iterator, which will only contains the elements of the input iterator, for wich the parameter predicate returns true.
	 * @param iterator The delegate iterator.
	 * @param predicate The predicate used for filtering.
	 */
	public static filter<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): Iterator<T> {
		return new FilteringIterator(iterator, predicate);
	}
	
	/**
	 * Returns an iterator, which maps each element of the input iterator to the value returned by the mapper function.
	 * @param iterator The delegate iterator.
	 * @param mapper The mapper function.
	 */
	public static map<T, R>(iterator: Iterator<T>, mapper: (item: T) => R): Iterator<R> {
		return new MappingIterator(iterator, mapper);
	}
	
	/**
	 * Returns a concatenated version of the given iterators.
	 * @param iterators The iterators to concatenate.
	 */
	public static concatenate<T>(iterators: Iterator<Iterator<T>>): Iterator<T> {
		return new ConcatenatingIterator(iterators);
	}
	
	/**
	 * Returns true, if, and only if every element in the parameter iterator matches the given predicate, false otherwise.
	 * @param iterator The iterator.
	 * @param predicate The predicate.
	 */
	public static all<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): boolean {
		while (iterator.hasNext()) {
			if (!predicate(iterator.next())) {
				return false;
			}
		}
		return true;
	}
	
	/**
	 * Returns true, if any of the elements of the given iterator matches the parameter predicate.
	 * @param iterator The iterator.
	 * @param predicate The predicate.
	 */
	public static any<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): boolean {
		while (iterator.hasNext()) {
			if (predicate(iterator.next())) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * Converts the given iterator into a single value.
	 * @param reducer The function, which takes 2 elements from the iterator, and converts the reducing logic on them.
	 * @param initial The initial value. This will be passed as left in the first round.
	 */
	public static reduce<T>(iterator: Iterator<T>, reducer: (left: T, right: T) => T, initial?: T): T {
		var current = initial;
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
	}
	
	/**
	 * Returns the first element of the iterator (if there is any)
	 * @param iterator The iterator.
	 */
	public static head<T>(iterator: Iterator<T>): Optional<T> {
		if (iterator.hasNext()) {
			return Optional.of(iterator.next());
		}
		return Optional.empty<T>();
	}
	
	/**
	 * Returns an iterator, with all the elements of the original iterator, except the head.
	 * @param iterator The iterator.
	 */
	public static tail<T>(iterator: Iterator<T>): Iterator<T> {
		if (iterator.hasNext()) {
			return Iterators.skip(iterator, 1);
		}
		return Iterators.empty<T>();
	}
	
	/**
	 * Returns the last element of the iterator.
	 * @param iterator The iterator.
	 */
	public static last<T>(iterator: Iterator<T>): Optional<T> {
		var tail = undefined;
		while (iterator.hasNext()) {
			tail = iterator.next();
		}
		return Optional.ofNullable(tail);
	}
	
	/**
	 * Returns the count of the items in the iterator.
	 * @param iterator The iterator.
	 */
	public static count<T>(iterator: Iterator<T>): number {
		var count = 0;
		while (iterator.hasNext()) {
			iterator.next();
			count++;
		}
		return count;
	}
	
	/**
	 * Limits the iterator, to contain maximum so many elements as the limit.
	 * @param iterator The iterator. 
	 * @param limit The limit.
	 */
	public static limit<T>(iterator: Iterator<T>, limit: number): Iterator<T> {
		return new LimitingIterator(iterator, limit);
	}
	
	/**
	 * Skips the given amount of elements from the iterator.
	 * @param iterator The iterator.
	 * @param skipped The amount of skipped elements.
	 */
	public static skip<T>(iterator: Iterator<T>, skipped: number): Iterator<T> {
		return new SkippingIterator<T>(iterator, skipped);
	}
	
	/**
	 * Converts the given iterator to an array.
	 * @param iterator The iterator.
	 */
	public static toArray<T>(iterator: Iterator<T>): Array<T> {
		var array: Array<T> = [];
		while (iterator.hasNext()) {
			array.push(iterator.next());
		}
		return array;
	}
	
	/**
	 * Iterates on the iterator, and passes each element to the given consumer.
	 * @param iterator The iterator.
	 * @param consumer The consumer.
	 */
	public static forEach<T>(iterator: Iterator<T>, consumer: (input: T) => void): void {
		while (iterator.hasNext()) {
			consumer(iterator.next());
		}
	}
	
	/**
	 * Returns an empty iterator, which emits no elements.
	 */
	public static empty<T>(): Iterator<T> {
		return Iterators.EMPTY;
	}
	
	/** Static instance of an empty iterator, which emits no elements. */
	private static EMPTY: Iterator<any> = {
		next(): any {
			throw new Error("no such element");
		},
		hasNext(): boolean {
			return false;
		}
	}
}