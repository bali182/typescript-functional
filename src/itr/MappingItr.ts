import { Itr } from './index'

/**
 * Itr, which maps each element from a delegate Itr to the return value of a mapper function.
 */
export class MappingItr<T, R> implements Itr<R> {
	/** The mapper function. */
	private mMapper: (input: T) => R
	/** The delegate Itr. */
	private mDelegate: Itr<T>

	/**
	 * Constructor.
	 * @param delegate The delegate Itr.
	 * @param mapper The mapper function.
	 */
	constructor(delegate: Itr<T>, mapper: (input: T) => R) {
		this.mMapper = mapper
		this.mDelegate = delegate
	}

	next(): R {
		return this.mMapper(this.mDelegate.next())
	}

	hasNext(): boolean {
		return this.mDelegate.hasNext()
	}

	isFinite() {
		return this.mDelegate.isFinite()
	}

	toString() {
		return `map(${this.mDelegate.toString()})`
	}
}
