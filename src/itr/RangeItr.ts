import { Itr } from './index'

/** Itr, which iterates on numeric ranges. From - To values are inclusive. */
export class RangeItr implements Itr<number> {

	/** The starting point of the iteration */
	private mFrom: number
	/** The end point of the iteration. */
	private mTo: number
	/** The currently iterated element. */
	private mCurrent: number
	/** The delta (increment or decrement value) */
	private mDelta: number

	/** 
	 * Constructor.
	 * @param from The starting point of the iteration (inclusive).
	 * @param to The end point of the iteration (inclusive).
	 * @param delta (Optional) optional delta. If not present, +1 will be used.
	 */
	constructor(from: number, to: number, delta?: number) {
		this.mTo = to
		this.mFrom = from
		this.mDelta = delta ? delta : 1
		this.mCurrent = from
	}

	next(): number {
		if (!this.hasNext()) {
			throw new Error("No such element")
		}
		var current = this.mCurrent
		this.mCurrent += this.mDelta
		return current
	}

	hasNext(): boolean {
		return this.mDelta > 0 ? this.mCurrent <= this.mTo : this.mCurrent >= this.mTo
	}

	isFinite() {
		return true
	}

	toString() {
		return `range(from=${this.mFrom}, to=${this.mTo}, step=${this.mDelta})`
	}
}
