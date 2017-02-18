import { Itr } from './index'
import { DelegateItr } from './DelegateItr'

/** Itr, that "peeks" into another Itr, that is, before consuming each elements, performs a side-effect on them. */
export class PeekingItr<T> extends DelegateItr<T> {

	/** The consumer function, that is performed on each element. */
	private mConsumer: (input: T) => void

	/** 
	 * Constructor.
	 * @param delegate The delegate Itr.
	 * @param consumer The consumer.
	 */
	constructor(delegate: Itr<T>, consumer: (input: T) => void) {
		super(delegate)
		this.mConsumer = consumer
	}

	next(): T {
		var next = super.next()
		this.mConsumer(next)
		return next
	}

	toString() {
		return `peek(${this.mDelegate.toString()})`
	}
}
