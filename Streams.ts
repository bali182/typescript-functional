/// <reference path="IteratorStream" />
/// <reference path="Iterators" />
/// <reference path="ArrayIterator" />
/// <reference path="EndlessIterator" />
/// <reference path="RangeIterator" />

class Streams {
	
	public static ofIterator<T>(iterator: Iterator<T>): Stream<T> {
		return new IteratorStream(iterator);
	}

	public static ofArray<T>(array: Array<T>): Stream<T> {
		return Streams.ofIterator(new ArrayIterator(array));
	}

	public static ofValue<T>(value: T): Stream<T> {
		return Streams.ofArray([value]);
	}

	public static ofValues<T>(...values: Array<T>): Stream<T> {
		return Streams.ofArray(values);
	}

	public static generate<T>(supplier: () => T): Stream<T> {
		return Streams.ofIterator(new EndlessIterator(supplier));
	}

	public static repeat<T>(value: T): Stream<T> {
		return Streams.generate(() => value);
	}

	public static range(from: number, to: number, delta?: number): Stream<number> {
		return Streams.ofIterator(new RangeIterator(from, to, delta));
	}

	public static concatenate<T>(...streams: Array<Stream<T>>): Stream<T> {
		if (streams.length == 0) {
			return Streams.empty<T>();
		} else if (streams.length == 1) {
			return streams[0];
		} else {
			return Streams.ofIterator(
				Iterators.concatenate(
					Iterators.map(
						new ArrayIterator(streams), s => s.iterator()
					)
				)
			);
		}
	}

	public static empty<T>(): Stream<T> {
		return Streams.ofIterator(Iterators.empty<T>());
	}
}
