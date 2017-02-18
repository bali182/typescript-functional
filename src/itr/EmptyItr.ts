import { Itr } from './index'

/**
 * Iterator, which has no elements, meaning it's hasNext() is always false, and it's next() 
 * always throws an Error.
 */
export class EmptyItr<T> implements Itr<T> {
	/** The singleton instance. */
	private static INSTANCE: EmptyItr<any> = new EmptyItr<any>()

	/** Accessor method for the singleton instance. */
	public static instance<T>(): Itr<T> {
		return EmptyItr.INSTANCE
	}

	next(): T {
		throw new Error("No such element")
	}

	hasNext(): boolean {
		return false
	}

	isFinite() {
		return true
	}

	toString() {
		return 'empty()'
	}
}
