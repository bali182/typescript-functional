/// <reference path="Optional" />
/// <reference path="Collector" />

/**
 * Stream is a wrapper interface for iteratos, to perform operations comfortably on them.
 */
interface Stream<T> {

	filter(predicate: (input: T) => boolean): Stream<T>;

	map<R>(mapper: (input: T) => R): Stream<R>

	limit(limit: number): Stream<T>

	skip(amount: number): Stream<T>

	any(predicate: (input: T) => boolean): boolean

	all(predicate: (input: T) => boolean): boolean

	reduce(reducer: (left: T, right: T) => T, initial?: T): T

	head(): Optional<T>

	tail(): Stream<T>

	last(): Optional<T>

	min(comparator: (first: T, second: T) => number): Optional<T>

	max(comparator: (first: T, second: T) => number): Optional<T>

	average(mapper: (input: T) => number): number

	sum(mapper: (input: T) => number): number

	count(): number

	forEach(consumer: (input: T) => void): void

	toArray(): Array<T>

	collect<I, R>(collector: Collector<I, T, R>): R

	iterator(): Iterator<T>
}
