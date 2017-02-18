import { ArrayItr } from './ArrayItr'
import { ChainableItr } from './ChainableItr'
import { FilteringItr } from './FilteringItr'
import { ConcatenatingItr } from './ConcatenatingItr'
import { LimitingItr } from './LimitingItr'
import { MappingItr } from './MappingItr'
import { PeekingItr } from './PeekingItr'
import { SkippingItr } from './SkippingItr'
import { SkipWhileItr } from './SkipWhileItr'
import { TakeWhileItr } from './TakeWhileItr'
import { RangeItr } from './RangeItr'
import { ZipItr } from './ZipItr'
import { EmptyItr } from './EmptyItr'
import { EndlessItr } from './EndlessItr'
import { RepeatingItr } from './RepeatingItr'
import { SingletonItr } from './SingletonItr'
import { Option, some, maybe, none } from '../option'

/**
 * Base interface for Itrs
 */
export interface Itr<T> {
	/** Returns the next element of the iteration, or throws an error. */
	next(): T
	/** Returns, if the Itr has more elements. */
	hasNext(): boolean
	/** Returns, wether the Itr would ever terminate on subsequent next calls. */
	isFinite(): boolean
}

export function all<T>(it: Itr<T>, predicate: (input: T) => boolean): boolean {
	while (it.hasNext()) {
		if (!predicate(it.next())) {
			return false
		}
	}
	return true
}

export function any<T>(it: Itr<T>, predicate: (input: T) => boolean): boolean {
	while (it.hasNext()) {
		if (predicate(it.next())) {
			return true
		}
	}
	return false
}

export function at<T>(it: Itr<T>, index: number): Option<T> {
	var idx = 0
	while (it.hasNext() && idx < index) {
		it.next()
		idx++
	}
	if (it.hasNext()) {
		return maybe(it.next())
	}
	return none<T>()
}

export function append<T>(first: Itr<T>, rest: Itr<T>): Itr<T> {
	return first instanceof ChainableItr
		? (<ChainableItr<T>>first).chain(rest)
		: new ChainableItr<T>().chain(first).chain(rest)
}

export function average<T>(it: Itr<number>): number {
	var length = 0
	var sum = fold(it, (x, y) => {
		length++
		return x + y
	}, 0)
	return sum > 0 ? sum / length : sum
}

export function count<T>(it: Itr<T>, predicate: (item: T) => boolean = e => true): number {
	return fold(it, (ct, item) => predicate(item) ? ct + 1 : ct, 0)
}

export function empty<T>(): EmptyItr<T> {
	return EmptyItr.instance<T>()
}

export function filter<T>(it: Itr<T>, predicate: (input: T) => boolean): Itr<T> {
	return new FilteringItr(it, predicate)
}

export function findFirst<T>(it: Itr<T>, predicate: (input: T) => boolean): Option<T> {
	return head(filter(it, predicate))
}

export function findLast<T>(it: Itr<T>, predicate: (input: T) => boolean): Option<T> {
	return last(filter(it, predicate))
}

export function flatten<T, R>(it: Itr<T>, sequencify: (input: T) => Itr<R>): Itr<R> {
	return new ConcatenatingItr<R>(map(it, sequencify))
}

export function fold<T, R>(it: Itr<T>, reducer: (left: R, right: T) => R, initial: R): R {
	var current = initial
	while (it.hasNext()) {
		current = reducer(current, it.next())
	}
	return current
}

export function forEach<T>(it: Itr<T>, consumer: (input: T) => void): void {
	while (it.hasNext()) {
		consumer(it.next())
	}
}

export function head<T>(it: Itr<T>): Option<T> {
	return it.hasNext() ? some<T>(it.next()) : none<T>()
}

export function indexOf<T>(it: Itr<T>, item: T, equality?: (a: T, b: T) => boolean): Option<number> {
	var eq = equality || ((a, b) => a === b)
	var index = 0
	while (it.hasNext()) {
		if (eq(item, it.next())) {
			return some<number>(index)
		}
		index++
	}
	return none<number>()
}

export function join(it: Itr<string>, separator?: string, prefix?: string, suffix?: string): string {
	separator = separator || ''
	var started = false
	var accumulator = (joined: string, s: string): string => {
		if (!started) {
			started = true
			return s
		}
		return joined + separator + s
	}
	var elementsJoined = fold(it, accumulator, null)
	return (prefix || '') + (started ? elementsJoined : '') + (suffix || '')
}

export function last<T>(it: Itr<T>): Option<T> {
	var last: T = undefined
	while (it.hasNext()) {
		last = it.next()
	}
	return maybe(last)
}

export function limit<T>(it: Itr<T>, limit: number): Itr<T> {
	return new LimitingItr(it, limit)
}

export function map<T, R>(it: Itr<T>, mapper: (input: T) => R): Itr<R> {
	return new MappingItr(it, mapper)
}

export function max<T>(it: Itr<T>, comparator: (first: T, second: T) => number): Option<T> {
	var started = false
	var maxValue = fold(it, (f, s) => {
		if (!started) {
			started = true
			return s
		}
		return comparator(f, s) > 0 ? f : s
	}, null)
	return started ? maybe(maxValue) : none<T>()
}

export function min<T>(it: Itr<T>, comparator: (first: T, second: T) => number): Option<T> {
	var started = false
	var minValue = fold(it, (f, s) => {
		if (!started) {
			started = true
			return s
		}
		return comparator(f, s) < 0 ? f : s
	}, null)
	return started ? maybe(minValue) : none<T>()
}

export function peek<T>(it: Itr<T>, consumer: (input: T) => void): Itr<T> {
	return new PeekingItr(it, consumer)
}

export function reduce<T>(it: Itr<T>, reducer: (left: T, right: T) => T): Option<T> {
	if (!it.hasNext()) {
		return none<T>()
	}
	var current = it.next()
	while (it.hasNext()) {
		current = reducer(current, it.next())
	}
	return some<T>(current)
}

export function skip<T>(it: Itr<T>, amount: number): Itr<T> {
	return new SkippingItr(it, amount)
}

export function skipWhile<T>(it: Itr<T>, predicate: (input: T) => boolean): Itr<T> {
	return new SkipWhileItr(it, predicate)
}

export function sum(it: Itr<number>): number {
	return fold(it, (a, b) => a + b, 0)
}

export function tail<T>(it: Itr<T>): Itr<T> {
	return skip(it, 1)
}

export function takeWhile<T>(it: Itr<T>, predicate: (input: T) => boolean): Itr<T> {
	return new TakeWhileItr(it, predicate)
}

export function toArray<T>(it: Itr<T>): Array<T> {
	return fold(it, (array, e) => {
		array.push(e);
		return array
	}, [])
}

export function zip<T, R, E>(first: Itr<T>, second: Itr<R>, combiner: (first: T, second: R) => E): Itr<E> {
	return map(new ZipItr(first, second), ([first, second]) => combiner(first, second))
}

export function singleton<T>(item: T): Itr<T> {
	return new SingletonItr(item)
}

export function ofArray<T>(array: T[]): Itr<T> {
	return new ArrayItr(array)
}

export function endless<T>(supplier: () => T): Itr<T> {
	return new EndlessItr(supplier)
}

export function repeat<T>(item: T): Itr<T> {
	return new RepeatingItr(item)
}

export function range<T>(from: number, to: number, delta?: number): Itr<number> {
	return new RangeItr(from, to, delta)
}

export function concatenate<T>(itrs: Itr<Itr<T>>): Itr<T> {
	return new ConcatenatingItr(itrs)
}