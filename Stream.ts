/// <reference path="Optional" />

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

	count(): number

	forEach(consumer: (input: T) => void): void

	toArray(): Array<T>

	iterator(): Iterator<T>
}
