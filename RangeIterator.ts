/// <reference path="Iterator" />

/**
 * Iterator, which iterates on numeric ranges. From - To values are inclusive.
 */
class RangeIterator implements Iterator<number> {
	
	/** The starting point of the iteration */
	private mFrom: number;
	/** The end point of the iteration. */
	private mTo: number;
	/** The currently iterated element. */
	private mCurrent: number;
	/** The delta (increment or decrement value) */
	private mDelta: number
	
	/** 
	 * Constructor.
	 * @param from The starting point of the iteration (inclusive).
	 * @param to The end point of the iteration (inclusive).
	 * @param delta (Optional) optional delta. If not present, +1 will be used.
	 */
	constructor(from: number, to: number, delta?: number) {
		this.mCurrent = from;
		this.mTo = to;
		this.mDelta = delta ? delta : 1;
	}

	next(): number {
		this.mCurrent = this.mCurrent + this.mDelta;
		return this.mCurrent;
	}

	hasNext(): boolean {
		return this.mCurrent + this.mDelta <= this.mTo;
	}
}