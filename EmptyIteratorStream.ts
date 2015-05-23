/// <reference path="Iterator" />
/// <reference path="IteratorStream" />

class EmptyIteratorStream<T> extends IteratorStream<T> {
	private static INSTANCE: EmptyIteratorStream<any> = new EmptyIteratorStream<any>();

	constructor() {
		super(EmptyIterator.instance<T>(), false);
	}

	protected invalidate(): void {
		// empty
	}

	public static instance<T>(): Stream<T> {
		return EmptyIteratorStream.INSTANCE;
	}
}