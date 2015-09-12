/// <reference path="Iterator" />

module tsf {
	/** Iterator for splitting the elements of a delegate iterator into chuncks of predetermined size. */
	export class PartitioningIterator<T> implements Iterator<Array<T>> {
		
		/** The chunk size. */
		private mChunkSize: number;
		/** The delegate iterator. */
		private mDelegate: Iterator<T>;
		
		/**
		 * Constructor.
		 * @param delegate The delegate iterator.
		 * @param chunkSize The chunk size.
		 */
		constructor(delegate: Iterator<T>, chunkSize: number) {
			this.mDelegate = delegate;
			this.mChunkSize = chunkSize;
		}

		next(): Array<T> {
			if (!this.hasNext()) {
				throw new Error("No such element");
			}
			var array: Array<T> = [];
			var counter = 0;
			var partitionSize = this.mChunkSize;
			var delegate = this.mDelegate;
			while (delegate.hasNext() && counter++ < partitionSize) {
				array.push(delegate.next());
			}
			return array;
		}

		hasNext(): boolean {
			return this.mDelegate.hasNext();
		}

		isFinite() {
			return true;
		}
	}
}
