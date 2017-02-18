import { Sequence } from './index'
import { IterableSequence } from './IterableSequence'
import { empty } from '../itr'

/** Sequence, which is built on top of an empty Itr. */
export class EmptySequence<T> extends IterableSequence<T> {
	/** The singleton instance. */
	private static INSTANCE: EmptySequence<any> = new EmptySequence<any>()

	/** Accessor for the singleton instance. */
	public static instance<T>(): Sequence<T> {
		return EmptySequence.INSTANCE
	}

	/** Empty constructor. */
	constructor() {
		super(() => empty<T>())
	}
}
