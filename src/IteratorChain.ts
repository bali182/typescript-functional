/// <reference path="DelegateIterator" />
/**
 * This class is responsible for effectively chaining together Iterators. 
 * It works something like a functional immutable linked list.
 */
class IteratorChain<T> implements Iterator<Iterator<T>>  {
	/** The wrapped iterator, the head element. */
	private mHead: Iterator<T>;
	/** The tail of the cain. */
	private mTail: IteratorChain<T>;
	/** Static, lazy loaded insance of an empty iterator. */
	private static EMPTY_ITERATOR: IteratorChain<any> = undefined;
	
	/**
	 * Creates a chain.
	 * @param head The head element.
	 * @param tail The tail of the iterator.
	 */
	constructor(head: Iterator<T>, tail?: IteratorChain<T>) {
		this.mHead = head;
		this.mTail = tail || IteratorChain.empty<T>();
	}
	
	/** Returns the tail chain.	 */
	tail(): IteratorChain<T> {
		return this.mTail;
	}
	
	/** Returns the head element. */
	head(): Iterator<T> {
		return this.mHead;
	}
	
	/** Returns the head element. */
	next(): Iterator<T> {
		return this.head();
	}
	
	/** Returns true, if the chain has any next elements, false otherwise. */
	hasNext(): boolean {
		return true;
	}
	
	/** 
	 * Appends another iterator to the chain. Does not modify this instance.
	 * @param iterator The iterator to append.
	 */
	append(iterator: Iterator<T>): IteratorChain<T> {
		// TODO - recursive solution might not be the best for lots of append() calls, may need a rework in the future
		return this.appendChain(IteratorChain.wrap(iterator));
	}
	
	/** 
	 * Appends another chain element to the chain. Does not modify this instance.
	 * @param chain The chain element to append.
	 */
	private appendChain(chain: IteratorChain<T>): IteratorChain<T> {
		return new IteratorChain<T>(this.mHead, this.mTail.appendChain(chain));
	}
	
	/** Lazy loaded empty instance accessor. */
	public static empty<T>(): IteratorChain<T> {
		// TODO - this looks very hacky. When 1.6 is released, it could be rewritten
		if (IteratorChain.EMPTY_ITERATOR === undefined) {
			var empty: any = {
				appendChain: (chain: IteratorChain<T>) => chain,
				append: (iterator: Iterator<T>) => IteratorChain.wrap(iterator),
				hasNext: () => false,
				next: () => { throw new Error('No more elements'); },
				tail: () => { throw new Error('Has no tail'); },
				head: () => { return undefined; },
			};
			IteratorChain.EMPTY_ITERATOR = <IteratorChain<any>> empty;
		}
		return IteratorChain.EMPTY_ITERATOR;
	}
	
	/**
	 * Wraps a regular iterator into a chain.
	 * @param iterator The iterator to wrap.
	 */
	public static wrap<T>(iterator: Iterator<T>): IteratorChain<T> {
		return new IteratorChain<T>(iterator);
	}

	isFinite() {
		return this.head().isFinite() && this.tail().isFinite();
	}
}
