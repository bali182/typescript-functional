/// <reference path="Iterator" />

class RangeIterator implements Iterator<number> {
	
	private mFrom: number;
	private mTo: number;
	private mCurrent: number;
	private mDelta: number

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