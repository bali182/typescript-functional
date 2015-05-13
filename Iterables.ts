/// <reference path="Iterable" />
/// <reference path="Iterator" />
/// <reference path="Iterators" />

class Iterables {
	public static ofArray<T>(array: Array<T>): Iterable<T> {
		return {
			iterator(): Iterator<T> {
				return new ArrayIterator(array);
			}
		};
	}

	public static of<T>(...elements: T[]): Iterable<T> {
		return Iterables.ofArray(elements);
	}

	public static filter<T>(iterable: Iterable<T>, predicate: (item : T) => boolean): Iterable<T> {
		return {
			iterator(): Iterator<T> {
				return Iterators.filter(iterable.iterator(), predicate);
			}
		}
	}

	public static map<T, R>(iterable: Iterable<T>, mapper: (item : T) => R): Iterable<R> {
		return {
			iterator(): Iterator<R> {
				return Iterators.map(iterable.iterator(), mapper);
			}
		}
	}

	public static all<T>(iterable: Iterable<T>, predicate: (item : T) => boolean): boolean {
		return Iterators.all(iterable.iterator(), predicate);
	}

	public static any<T>(iterable: Iterable<T>, predicate: (item : T) => boolean): boolean {
		return Iterators.any(iterable.iterator(), predicate);
	}

	public static reduce<T>(iterable: Iterable<T>, reducer: (left: T, right: T) => T, initial?: T): T {
		return Iterators.reduce(iterable.iterator(), reducer, initial);
	}

	public static head<T>(iterable: Iterable<T>): Optional<T> {
		return Iterators.head(iterable.iterator());
	}

	public static tail<T>(iterable: Iterable<T>): Iterable<T> {
		return {
			iterator(): Iterator<T> {
				return Iterators.tail(iterable.iterator());
			}
		}
	}

	public static last<T>(iterable: Iterable<T>): Optional<T> {
		return Iterators.last(iterable.iterator());
	}

	public static count<T>(iterable: Iterable<T>): number {
		return Iterators.count(iterable.iterator());
	}

	public static limit<T>(iterable: Iterable<T>, limit: number): Iterable<T> {
		return {
			iterator(): Iterator<T> {
				return Iterators.limit(iterable.iterator(), limit);
			}
		}
	}

	public static skip<T>(iterable: Iterable<T>, skipped: number): Iterable<T> {
		return {
			iterator(): Iterator<T> {
				return Iterators.skip(iterable.iterator(), skipped);
			}
		};
	}

	public static toArray<T>(iterable: Iterable<T>): Array<T> {
		return Iterators.toArray(iterable.iterator());
	}


	public static empty<T>(): Iterable<T> {
		return Iterables.EMPTY;
	}

	private static EMPTY: Iterable<any> = {
		iterator(): Iterator<any> {
			return Iterators.empty();
		}
	}
}