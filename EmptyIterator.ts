/// <reference path="Iterator" />

class EmptyIterator<T> implements Iterator<T> {
	next(): T {
		throw new Error("No such element")
	}
	hasNext(): boolean {
		return false;
	}

	private static INSTANCE = new EmptyIterator<any>();

	public static instance<T>(): Iterator<T> {
		return EmptyIterator.INSTANCE;
	}
}