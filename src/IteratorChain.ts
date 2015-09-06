/// <reference path="DelegateIterator" />

class IteratorChain<T> implements Iterator<Iterator<T>>  {
	private mTail: IteratorChain<T>;
	private mNext: Iterator<T>;
	protected static EMPTY_ITERATOR: IteratorChain<any> = undefined;

	constructor(delegate: Iterator<T>, tail?: IteratorChain<T>) {
		this.mNext = delegate;
		this.mTail = tail || IteratorChain.empty<T>();
	}

	tail(): IteratorChain<T> {
		return this.mTail;
	}

	next(): Iterator<T> {
		return this.mNext;
	}

	hasNext(): boolean {
		return true;
	}

	append(iterator: Iterator<T>): IteratorChain<T> {
		// TODO - recursive solution might not be the best for lots of append() calls, may need a rework in the future
		return this.appendChain(IteratorChain.wrap(iterator))
	}

	private appendChain(chain: IteratorChain<T>): IteratorChain<T> {
		return new IteratorChain<T>(this.mNext, this.mTail.appendChain(chain));
	}

	public static empty<T>(): IteratorChain<T> {
		// TODO - this looks very hacky. When 1.6 is released, it could be rewritten
		if (IteratorChain.EMPTY_ITERATOR === undefined) {
			var empty: any = {
				appendChain: (chain: IteratorChain<T>) => chain,
				append: (iterator: Iterator<T>) => IteratorChain.wrap(iterator),
				hasNext: () => false,
				next: () => { throw new Error('No more elements') },
				tail: () => { throw new Error('Has no tail') },
			};
			IteratorChain.EMPTY_ITERATOR = <IteratorChain<any>> empty;
		}
		return IteratorChain.EMPTY_ITERATOR;
	}

	public static wrap<T>(iterator: Iterator<T>): IteratorChain<T> {
		return new IteratorChain<T>(iterator);
	}
}