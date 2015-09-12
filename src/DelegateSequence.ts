/// <reference path="Sequence" />

module tsf {
		
	export class DelegateSequence<T> implements Sequence<T> {
	
		private mDelegate: Sequence<T>;
	
		constructor(delegate: Sequence<T>) {
			this.mDelegate = delegate;
		}
	
		protected delegate(): Sequence<T> {
			return this.mDelegate;
		}
	
		all(predicate: (input: T) => boolean): boolean {
			return this.delegate().all(predicate);
		}
	
		any(predicate: (input: T) => boolean): boolean {
			return this.delegate().any(predicate);
		}
	
		at(index: number): Optional<T> {
			return this.delegate().at(index);
		}
	
		append(other: Sequence<T>): Sequence<T> {
			return this.delegate().append(other);
		}
	
		average(mapper: (input: T) => number): number {
			return this.delegate().average(mapper);
		}
		
		contains(item: T, equality: (a: T, b: T) => boolean): boolean {
			return this.delegate().contains(item, equality);
		}
	
		count(): number {
			return this.delegate().count();
		}
	
		filter(predicate: (input: T) => boolean): Sequence<T> {
			return this.delegate().filter(predicate);
		}
	
		findFirst(predicate: (input: T) => boolean): Optional<T> {
			return this.delegate().findFirst(predicate);
		}
	
		findLast(predicate: (input: T) => boolean): Optional<T> {
			return this.delegate().findLast(predicate);
		}
	
		flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> {
			return this.delegate().flatten(sequencify);
		}
	
		fold<R>(reducer: (left: R, right: T) => R, initial: R): R {
			return this.delegate().fold(reducer, initial);
		}
	
		forEach(consumer: (input: T) => void): void {
			return this.delegate().forEach(consumer);
		}
	
		head(): Optional<T> {
			return this.delegate().head();
		}
		
		indexOf(item: T, equality?: (a: T, b: T) => boolean): number {
			return this.delegate().indexOf(item, equality);
		}
	
		iterator(): Iterator<T> {
			return this.delegate().iterator();
		}
	
		join(separator?: string, prefix?: string, suffix?: string): string {
			return this.delegate().join(separator, prefix, suffix);
		}
	
		last(): Optional<T> {
			return this.delegate().last();
		}
	
		limit(limit: number): Sequence<T> {
			return this.delegate().limit(limit);
		}
	
		map<R>(mapper: (input: T) => R): Sequence<R> {
			return this.delegate().map(mapper);
		}
	
		max(comparator: (first: T, second: T) => number): Optional<T> {
			return this.delegate().max(comparator);
		}
	
		min(comparator: (first: T, second: T) => number): Optional<T> {
			return this.delegate().min(comparator);
		}
	
		peek(consumer: (input: T) => void): Sequence<T> {
			return this.delegate().peek(consumer);
		}
	
		reduce(reducer: (left: T, right: T) => T): T {
			return this.delegate().reduce(reducer);
		}
	
		skip(amount: number): Sequence<T> {
			return this.delegate().skip(amount);
		}
	
		skipWhile(predicate: (input: T) => boolean): Sequence<T> {
			return this.delegate().skipWhile(predicate);
		}
	
		sum(mapper: (input: T) => number): number {
			return this.delegate().sum(mapper);
		}
	
		tail(): Sequence<T> {
			return this.delegate().tail();
		}
	
		takeWhile(predicate: (input: T) => boolean): Sequence<T> {
			return this.delegate().takeWhile(predicate);
		}
	
		toArray(): Array<T> {
			return this.delegate().toArray();
		}
	
		zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Sequence<E> {
			return this.delegate().zip(other, combiner);
		}
	}
}
