/// <reference path="Iterator" />
/// <reference path="Optional" />

class Iterators {
	public static filter<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): Iterator<T> {
		return new FilteringIterator(iterator, predicate);
	}

	public static map<T, R>(iterator: Iterator<T>, mapper: (item: T) => R): Iterator<R> {
		return new MappingIterator(iterator, mapper);
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

class AbstractIterator<T> implements Iterator<T> {

	private mNext: T;
	private mState: IteratorState;

	next(): T {
		if (!this.hasNext()) {
			throw new Error("no such element");
		}
		this.mState = IteratorState.NOT_READY;
		var result: T = this.mNext;
		this.mNext = null;
		return result;
	}

	hasNext(): boolean {
		var state = this.getState();
		if (state == IteratorState.FAILED) {
			throw new Error("failed");
		}
		switch (state) {
			case IteratorState.DONE:
				return false;
			case IteratorState.READY:
				return true;
			default:
		}
		return this.tryToComputeNext();
	}

	private tryToComputeNext(): boolean {
		this.mState = IteratorState.FAILED; // temporary pessimism
		this.mNext = this.computeNext();
		if (this.mState != IteratorState.DONE) {
			this.mState = IteratorState.READY;
			return true;
		}
		return false;
	}

	protected /*abstract*/ computeNext(): T {
		return null;
	}

	protected endOfData(): T {
		this.mState = IteratorState.DONE;
		return null;
	}

	getState(): IteratorState {
		return this.mState;
	}
}

enum IteratorState {
    /** We have computed the next element and haven't returned it yet. */
    READY,

    /** We haven't yet computed or have already returned the element. */
    NOT_READY,

    /** We have reached the end of the data and are finished. */
    DONE,

    /** We've suffered an exception and are kaput. */
    FAILED,
}

class ArrayIterator<T> implements Iterator<T> {
	private mIndex: number;
	private mArray: Array<T>;

	constructor(array: Array<T>) {
		this.mArray = array;
		this.mIndex = 0;
	}

	next(): T {
		if (!this.hasNext()) {
			throw new Error("no such element");
		}
		return this.mArray[this.mIndex++];
	}

	hasNext(): boolean {
		return this.mIndex < this.mArray.length;
	}
}

class AbstractDelegateIterator<T> extends AbstractIterator<T> {
	protected mDelegate: Iterator<T>;

	constructor(delegate: Iterator<T>) {
		super();
		this.mDelegate = delegate;
	}
}

class FilteringIterator<T> extends AbstractDelegateIterator<T> {
	private mPredicate: (input : T) => boolean;

	constructor(delegate: Iterator<T>, predicate: (input: T) => boolean) {
		super(delegate);
		this.mPredicate = predicate;
	}

	protected computeNext(): T {
		while (this.mDelegate.hasNext()) {
			var element: T = this.mDelegate.next();
			if (this.mPredicate(element)) {
				return element;
			}
        }
        return this.endOfData();
	}
}

class MappingIterator<T, R> implements Iterator<R> {
	private mMapper: (T) => R;
	private mDelegate: Iterator<T>;

	constructor(delegate: Iterator<T>, mapper: (input: T) => R) {
		this.mMapper = mapper;
		this.mDelegate = delegate;
	}

	next(): R {
		return this.mMapper(this.mDelegate.next());
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext();
	}
}

class LimitingIterator<T> implements Iterator<T> {
	private mLimit: number;
	private mIteratedCount: number;
	private mDelegate: Iterator<T>;

	constructor(delegate: Iterator<T>, limit: number) {
		this.mLimit = limit;
		this.mIteratedCount = 0;
		this.mDelegate = delegate;
	}

	next(): T {
		if (this.hasNext()) {
			var next = this.mDelegate.next();
			this.mIteratedCount++;
			return next;
		}
		throw new Error("no more elements");
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext() && this.mIteratedCount < this.mLimit;
	}
}

class SkippingIterator<T> extends AbstractDelegateIterator<T> {
	private mSkip: number;
	private mSkiped: boolean;

	constructor(delegate: Iterator<T>, skip: number) {
		super(delegate);
		this.mSkip = skip;
		this.mSkiped = false;
	}

	protected computeNext(): T {
		var delegate = this.mDelegate
		if (!this.mSkiped) {
			var skipedCt = 0;
			while (delegate.hasNext() && skipedCt < this.mSkip) {
				delegate.next();
				skipedCt++;
			}
			this.mSkiped = true;
		}
		if (delegate.hasNext()) {
			return delegate.next();
		}
        return this.endOfData();
	}

}