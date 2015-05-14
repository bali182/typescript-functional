/// <reference path="Iterator" />
/// <reference path="Optional" />

/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />

class Iterators {
	
	public static filter<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): Iterator<T> {
		return new FilteringIterator(iterator, predicate);
	}

	public static map<T, R>(iterator: Iterator<T>, mapper: (item: T) => R): Iterator<R> {
		return new MappingIterator(iterator, mapper);
	}

	public static concatenate<T>(iterators: Iterator<Iterator<T>>): Iterator<T> {
		return new ConcatenatingIterator(iterators);
	}

	public static all<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): boolean {
		while (iterator.hasNext()) {
			if (!predicate(iterator.next())) {
				return false;
			}
		}
		return true;
	}

	public static any<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): boolean {
		while (iterator.hasNext()) {
			if (predicate(iterator.next())) {
				return true;
			}
		}
		return false;
	}

	public static reduce<T>(iterator: Iterator<T>, reducer: (left: T, right: T) => T, initial?: T): T {
		var current = initial;
		while (iterator.hasNext()) {
			current = reducer(current, iterator.next());
		}
		return current;
	}

	public static head<T>(iterator: Iterator<T>): Optional<T> {
		if (iterator.hasNext()) {
			return Optional.of(iterator.next());
		}
		return Optional.empty<T>();
	}

	public static tail<T>(iterator: Iterator<T>): Iterator<T> {
		if (iterator.hasNext()) {
			return Iterators.skip(iterator, 1);
		}
		return Iterators.empty<T>();
	}

	public static last<T>(iterator: Iterator<T>): Optional<T> {
		var tail = undefined;
		while (iterator.hasNext()) {
			tail = iterator.next();
		}
		return Optional.ofNullable(tail);
	}

	public static count<T>(iterator: Iterator<T>): number {
		var count = 0;
		while (iterator.hasNext()) {
			iterator.next();
			count++;
		}
		return count;
	}

	public static limit<T>(iterator: Iterator<T>, limit: number): Iterator<T> {
		return new LimitingIterator(iterator, limit);
	}

	public static toArray<T>(iterator: Iterator<T>): Array<T> {
		var array: Array<T> = [];
		while (iterator.hasNext()) {
			array.push(iterator.next());
		}
		return array;
	}

	public static skip<T>(iterator: Iterator<T>, skipped: number): Iterator<T> {
		return new SkippingIterator<T>(iterator, skipped);
	}

	public static forEach<T>(iterator: Iterator<T>, consumer: (input: T) => void): void {
		while (iterator.hasNext()) {
			consumer(iterator.next());
		}
	}

	public static empty<T>(): Iterator<T> {
		return Iterators.EMPTY;
	}

	private static EMPTY: Iterator<any> = {
		next(): any {
			throw new Error("no such element");
		},
		hasNext(): boolean {
			return false;
		}
	}
}