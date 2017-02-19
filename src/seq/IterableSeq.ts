import { Itr } from '../itr'
import { Seq, ofIterable } from './index'
import { Option } from '../option'
import {
	all, any, at, concatenate, filter, average, count, append, fold, forEach, head, indexOf, join,
	last, limit, max, min, map, peek, reduce, skip, skipWhile, sum, tail, takeWhile, toArray, zip
} from '../itr'

/** Sequence, which operates on an Itr. */
export class IterableSeq<T> implements Seq<T> {
	/** The delegeate Itr */
	private mIterable: () => Itr<T>

	/**
	 * Constructor.
	 * @param Itr The delegeate Itr
	 * @param iterated Flag indicating if the Sequence was already iterated or not.
	 */
	constructor(iterable: () => Itr<T>) {
		this.mIterable = iterable
	}

	all(predicate: (input: T) => boolean): boolean {
		return all(this.iterator(), predicate)
	}

	any(predicate: (input: T) => boolean): boolean {
		return any(this.iterator(), predicate)
	}

	at(index: number): Option<T> {
		return at(this.iterator(), index)
	}

	append(other: Seq<T>): Seq<T> {
		return ofIterable(() => append(this.iterator(), other.iterator()))
	}

	average(mapper: (input: T) => number): number {
		return average(this.map(mapper).iterator())
	}

	contains(item: T, equality?: (a: T, b: T) => boolean): boolean {
		return this.indexOf(item, equality).isPresent()
	}

	count(predicate?: (item: T) => boolean): number {
		return count(this.iterator())
	}

	filter(predicate: (input: T) => boolean): Seq<T> {
		return ofIterable(() => filter(this.iterator(), predicate))
	}

	findFirst(predicate: (input: T) => boolean): Option<T> {
		return this.filter(predicate).head()
	}

	findLast(predicate: (input: T) => boolean): Option<T> {
		return this.filter(predicate).last()
	}

	flatten<R>(sequencify: (input: T) => Seq<R>): Seq<R> {
		return ofIterable<R>(
			() => concatenate<R>(this.map(sequencify).map(seq => seq.iterator()).iterator())
		)
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		return fold(this.iterator(), reducer, initial)
	}

	forEach(consumer: (input: T) => void): void {
		return forEach(this.iterator(), consumer)
	}

	head(): Option<T> {
		return head(this.iterator())
	}

	indexOf(item: T, equality?: (a: T, b: T) => boolean): Option<number> {
		return indexOf(this.iterator(), item, equality)
	}

	iterator(): Itr<T> {
		return this.mIterable()
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		return join(this.map(e => "" + e).iterator(), separator, prefix, suffix)
	}

	last(): Option<T> {
		return last(this.iterator())
	}

	limit(ct: number): Seq<T> {
		return ofIterable(() => limit(this.iterator(), ct))
	}

	map<R>(mapper: (input: T) => R): Seq<R> {
		return ofIterable(() => map(this.iterator(), mapper))
	}

	max(comparator: (first: T, second: T) => number): Option<T> {
		return max(this.iterator(), comparator)
	}

	min(comparator: (first: T, second: T) => number): Option<T> {
		return min(this.iterator(), comparator)
	}

	peek(consumer: (input: T) => void): Seq<T> {
		return ofIterable(() => peek(this.iterator(), consumer))
	}

	reduce(reducer: (left: T, right: T) => T): Option<T> {
		return reduce(this.iterator(), reducer)
	}

	skip(amount: number): Seq<T> {
		return ofIterable(() => skip(this.iterator(), amount))
	}

	skipWhile(predicate: (input: T) => boolean): Seq<T> {
		return ofIterable(() => skipWhile(this.iterator(), predicate))
	}

	sum(mapper: (input: T) => number): number {
		return sum(this.map(mapper).iterator())
	}

	tail(): Seq<T> {
		return ofIterable(() => tail(this.iterator()))
	}

	takeWhile(predicate: (input: T) => boolean): Seq<T> {
		return ofIterable(() => takeWhile(this.iterator(), predicate))
	}

	toArray(): Array<T> {
		return toArray(this.iterator())
	}

	zip<R, E>(other: Seq<R>, combiner: (first: T, second: R) => E): Seq<E> {
		return ofIterable(() => zip(this.iterator(), other.iterator(), combiner))
	}

	toString() {
		return `sequence(${this.join(', ')})`
	}
}
