import { Seq } from './index'
import { Option } from '../option'
import { Itr } from '../itr'

export class DelegateSeq<T> implements Seq<T> {

	private mDelegate: Seq<T>

	constructor(delegate: Seq<T>) {
		this.mDelegate = delegate
	}

	protected delegate(): Seq<T> {
		return this.mDelegate
	}

	all(predicate: (input: T) => boolean): boolean {
		return this.delegate().all(predicate)
	}

	any(predicate: (input: T) => boolean): boolean {
		return this.delegate().any(predicate)
	}

	at(index: number): Option<T> {
		return this.delegate().at(index)
	}

	append(other: Seq<T>): Seq<T> {
		return this.delegate().append(other)
	}

	average(mapper: (input: T) => number): number {
		return this.delegate().average(mapper)
	}

	contains(item: T, equality: (a: T, b: T) => boolean): boolean {
		return this.delegate().contains(item, equality)
	}

	count(predicate?: (item: T) => boolean): number {
		return this.delegate().count(predicate)
	}

	filter(predicate: (input: T) => boolean): Seq<T> {
		return this.delegate().filter(predicate)
	}

	findFirst(predicate: (input: T) => boolean): Option<T> {
		return this.delegate().findFirst(predicate)
	}

	findLast(predicate: (input: T) => boolean): Option<T> {
		return this.delegate().findLast(predicate)
	}

	flatten<R>(sequencify: (input: T) => Seq<R>): Seq<R> {
		return this.delegate().flatten(sequencify)
	}

	fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
		return this.delegate().fold(reducer, initial)
	}

	forEach(consumer: (input: T) => void): void {
		return this.delegate().forEach(consumer)
	}

	head(): Option<T> {
		return this.delegate().head()
	}

	indexOf(item: T, equality?: (a: T, b: T) => boolean): Option<number> {
		return this.delegate().indexOf(item, equality)
	}

	iterator(): Itr<T> {
		return this.delegate().iterator()
	}

	join(separator?: string, prefix?: string, suffix?: string): string {
		return this.delegate().join(separator, prefix, suffix)
	}

	last(): Option<T> {
		return this.delegate().last()
	}

	limit(limit: number): Seq<T> {
		return this.delegate().limit(limit)
	}

	map<R>(mapper: (input: T) => R): Seq<R> {
		return this.delegate().map(mapper)
	}

	max(comparator: (first: T, second: T) => number): Option<T> {
		return this.delegate().max(comparator)
	}

	min(comparator: (first: T, second: T) => number): Option<T> {
		return this.delegate().min(comparator)
	}

	peek(consumer: (input: T) => void): Seq<T> {
		return this.delegate().peek(consumer)
	}

	reduce(reducer: (left: T, right: T) => T): Option<T> {
		return this.delegate().reduce(reducer)
	}

	skip(amount: number): Seq<T> {
		return this.delegate().skip(amount)
	}

	skipWhile(predicate: (input: T) => boolean): Seq<T> {
		return this.delegate().skipWhile(predicate)
	}

	sum(mapper: (input: T) => number): number {
		return this.delegate().sum(mapper)
	}

	tail(): Seq<T> {
		return this.delegate().tail()
	}

	takeWhile(predicate: (input: T) => boolean): Seq<T> {
		return this.delegate().takeWhile(predicate)
	}

	toArray(): Array<T> {
		return this.delegate().toArray()
	}

	zip<R, E>(other: Seq<R>, combiner: (first: T, second: R) => E): Seq<E> {
		return this.delegate().zip(other, combiner)
	}
}
