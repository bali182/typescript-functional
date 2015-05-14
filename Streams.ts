/// <reference path="IteratorStream" />
/// <reference path="Iterators" />
/// <reference path="Iterable" />

class Streams {
	public static ofIterator<T>(iterator: Iterator<T>) {
		return new IteratorStream(iterator);
	}
	
	public static ofArray<T>(array: Array<T>) {
		return Streams.ofIterator(new ArrayIterator(array));
	}

	public static ofValues<T>(...values: Array<T>) {
		return Streams.ofArray(values);
	}

	public static ofIterable<T>(iterable: Iterable<T>) {
		return Streams.ofIterator(iterable.iterator());
	}

	public static generate<T>(supplier: () => T) {
		return Streams.ofIterator(new EndlessIterator(supplier));
	}

	public static range(from: number, to: number, delta?: number) {
		return Streams.ofIterator(new RangeIterator(from, to, delta));
	}
}
