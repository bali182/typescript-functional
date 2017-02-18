import { Itr } from './index'

/**
 * This class is responsible for effectively chaining together Itrs. 
 * It works something like a functional immutable linked list.
 */
export class ItrChain<T> implements Itr<Itr<T>>  {
	/** The wrapped Itr, the head element. */
	private mHead: Itr<T>
	/** The tail of the cain. */
	private mTail: ItrChain<T>
	/** Static, lazy loaded insance of an empty Itr. */
	private static EMPTY_Itr: ItrChain<any> = undefined

	/**
	 * Creates a chain.
	 * @param head The head element.
	 * @param tail The tail of the Itr.
	 */
	constructor(head: Itr<T>, tail?: ItrChain<T>) {
		this.mHead = head
		this.mTail = tail || ItrChain.empty<T>()
	}

	/** Returns the tail chain.	 */
	tail(): ItrChain<T> {
		return this.mTail
	}

	/** Returns the head element. */
	head(): Itr<T> {
		return this.mHead
	}

	/** Returns the head element. */
	next(): Itr<T> {
		return this.head()
	}

	/** Returns true, if the chain has any next elements, false otherwise. */
	hasNext(): boolean {
		return true
	}

	/** 
	* Appends another Itr to the chain. Does not modify this instance.
	* @param Itr The Itr to append.
	*/
	append(Itr: Itr<T>): ItrChain<T> {
		// TODO - recursive solution might not be the best for lots of append() calls, may need a rework in the future
		return this.appendChain(ItrChain.wrap(Itr))
	}

	/** 
	* Appends another chain element to the chain. Does not modify this instance.
	* @param chain The chain element to append.
	*/
	private appendChain(chain: ItrChain<T>): ItrChain<T> {
		return new ItrChain<T>(this.mHead, this.mTail.appendChain(chain))
	}

	/** Lazy loaded empty instance accessor. */
	public static empty<T>(): ItrChain<T> {
		// TODO - this looks very hacky. When 1.6 is released, it could be rewritten
		if (ItrChain.EMPTY_Itr === undefined) {
			var empty: any = {
				appendChain(chain: ItrChain<any>): ItrChain<any> { return chain },
				append(Itr: Itr<any>): ItrChain<any> { return ItrChain.wrap(Itr) },
				hasNext(): boolean { return false },
				next(): Itr<any> { throw new Error('No more elements') },
				tail(): ItrChain<any> { throw new Error('Has no tail') },
				head(): Itr<any> { return undefined },
				toString(): string { return 'chain()' }
			}
			ItrChain.EMPTY_Itr = <ItrChain<any>>empty
		}
		return ItrChain.EMPTY_Itr
	}

	/**
	* Wraps a regular Itr into a chain.
	* @param Itr The Itr to wrap.
	*/
	public static wrap<T>(Itr: Itr<T>): ItrChain<T> {
		return new ItrChain<T>(Itr)
	}

	isFinite(): boolean {
		return this.head().isFinite() && this.tail().isFinite()
	}

	toString(): string {
		return `chain(head=${this.mHead.toString()}, tail=${this.mTail.toString()})`
	}
}
