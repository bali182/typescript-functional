/// <reference path="Iterator" />
/// <reference path="Optional" />
/// <reference path="ArrayIterator" />
/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />
/// <reference path="PeekingIterator" />
/// <reference path="SkipWhileIterator" />
/// <reference path="TakeWhileIterator" />
/// <reference path="ZipIterator" />
/// <reference path="ChainableIterator" />

module tsf {

	export class Iterators {

		static all<T>(it: Iterator<T>, predicate: (input: T) => boolean): boolean {
			while (it.hasNext()) {
				if (!predicate(it.next())) {
					return false;
				}
			}
			return true;
		}

		static any<T>(it: Iterator<T>, predicate: (input: T) => boolean): boolean {
			while (it.hasNext()) {
				if (predicate(it.next())) {
					return true;
				}
			}
			return false;
		}

		static at<T>(it: Iterator<T>, index: number): Optional<T> {
			var idx = 0;
			while (it.hasNext() && idx < index) {
				it.next();
				idx++;
			}
			if (it.hasNext()) {
				return Optional.ofNullable(it.next());
			}
			return Optional.empty<T>();
		}

		static append<T>(first: Iterator<T>, rest: Iterator<T>): Iterator<T> {
			return first instanceof ChainableIterator
				? (<ChainableIterator<T>>first).chain(rest)
				: new ChainableIterator<T>().chain(first).chain(rest);
		}

		static average<T>(it: Iterator<number>): number {
			var length = 0;
			var sum = Iterators.fold(it, (x, y) => {
				length++;
				return x + y;
			}, 0);
			return sum > 0 ? sum / length : sum;
		}

		static count(it: Iterator<any>): number {
			return Iterators.fold(it, (length, item) => length + 1, 0);
		}

		static filter<T>(it: Iterator<T>, predicate: (input: T) => boolean): Iterator<T> {
			return new FilteringIterator(it, predicate);
		}

		static findFirst<T>(it: Iterator<T>, predicate: (input: T) => boolean): Optional<T> {
			return Iterators.head(Iterators.filter(it, predicate));
		}

		static findLast<T>(it: Iterator<T>, predicate: (input: T) => boolean): Optional<T> {
			return Iterators.last(Iterators.filter(it, predicate));
		}

		static flatten<T, R>(it: Iterator<T>, sequencify: (input: T) => Iterator<R>): Iterator<R> {
			return new ConcatenatingIterator<R>(Iterators.map(it, sequencify));
		}

		static fold<T, R>(it: Iterator<T>, reducer: (left: R, right: T) => R, initial: R): R {
			var current = initial;
			while (it.hasNext()) {
				current = reducer(current, it.next());
			}
			return current;
		}

		static forEach<T>(it: Iterator<T>, consumer: (input: T) => void): void {
			while (it.hasNext()) {
				consumer(it.next());
			}
		}

		static head<T>(it: Iterator<T>): Optional<T> {
			return it.hasNext() ? Optional.of(it.next()) : Optional.empty<T>();
		}

		static indexOf<T>(it: Iterator<T>, item: T, equality?: (a: T, b: T) => boolean): number {
			var eq = equality || ((a, b) => a === b);
			var index = 0;
			while (it.hasNext()) {
				if (eq(item, it.next())) {
					return index;
				}
				index++;
			}
			return -1;
		}

		static join(it: Iterator<string>, separator?: string, prefix?: string, suffix?: string): string {
			separator = separator || '';
			var started = false;
			var accumulator = (joined: string, s: string): string => {
				if (!started) {
					started = true;
					return s;
				}
				return joined + separator + s;
			};
			var elementsJoined = Iterators.fold(it, accumulator, null);
			return (prefix || '') + (started ? elementsJoined : '') + (suffix || '');
		}

		static last<T>(it: Iterator<T>): Optional<T> {
			var last: T = undefined;
			while (it.hasNext()) {
				last = it.next();
			}
			return Optional.ofNullable(last);
		}

		static limit<T>(it: Iterator<T>, limit: number): Iterator<T> {
			return new LimitingIterator(it, limit);
		}

		static map<T, R>(it: Iterator<T>, mapper: (input: T) => R): Iterator<R> {
			return new MappingIterator(it, mapper);
		}

		static max<T>(it: Iterator<T>, comparator: (first: T, second: T) => number): Optional<T> {
			var started = false;
			var maxValue = Iterators.fold(it, (f, s) => {
				if (!started) {
					started = true;
					return s;
				}
				return comparator(f, s) > 0 ? f : s;
			}, null);
			return started ? Optional.ofNullable(maxValue) : Optional.empty<T>();
		}

		static min<T>(it: Iterator<T>, comparator: (first: T, second: T) => number): Optional<T> {
			var started = false;
			var minValue = Iterators.fold(it, (f, s) => {
				if (!started) {
					started = true;
					return s;
				}
				return comparator(f, s) < 0 ? f : s;
			}, null);
			return started ? Optional.ofNullable(minValue) : Optional.empty<T>();
		}

		static peek<T>(it: Iterator<T>, consumer: (input: T) => void): Iterator<T> {
			return new PeekingIterator(it, consumer);
		}

		static reduce<T>(it: Iterator<T>, reducer: (left: T, right: T) => T): T {
			if (!it.hasNext()) {
				throw new Error("Can't reduce an empty sequence");
			}
			var current = it.next();
			while (it.hasNext()) {
				current = reducer(current, it.next());
			}
			return current;
		}

		static skip<T>(it: Iterator<T>, amount: number): Iterator<T> {
			return new SkippingIterator(it, amount);
		}

		static skipWhile<T>(it: Iterator<T>, predicate: (input: T) => boolean): Iterator<T> {
			return new SkipWhileIterator(it, predicate);
		}

		static sum(it: Iterator<number>): number {
			return Iterators.fold(it, (a, b) => a + b, 0);
		}

		static tail<T>(it: Iterator<T>): Iterator<T> {
			return Iterators.skip(it, 1);
		}

		static takeWhile<T>(it: Iterator<T>, predicate: (input: T) => boolean): Iterator<T> {
			return new TakeWhileIterator(it, predicate);
		}

		static toArray<T>(it: Iterator<T>): Array<T> {
			return Iterators.fold(it, (array, e) => { array.push(e); return array; }, []);
		}

		static zip<T, R, E>(first: Iterator<T>, second: Iterator<R>, combiner: (first: T, second: R) => E): Iterator<E> {
			return Iterators.map(new ZipIterator(first, second), e => combiner(e.first, e.second));
		}
	}
}
