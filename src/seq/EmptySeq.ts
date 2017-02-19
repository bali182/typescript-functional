import { Seq } from './index'
import { IterableSeq } from './IterableSeq'
import { empty } from '../itr'

/** Sequence, which is built on top of an empty Itr. */
export class EmptySeq<T> extends IterableSeq<T> {
	/** The singleton instance. */
	private static INSTANCE: EmptySeq<any> = new EmptySeq<any>()

	/** Accessor for the singleton instance. */
	public static instance<T>(): Seq<T> {
		return EmptySeq.INSTANCE
	}

	/** Empty constructor. */
	constructor() {
		super(() => empty<T>())
	}
}
