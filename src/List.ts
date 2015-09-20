module tsf {
	export interface List<T> {
		prepend(value: T): List<T>;
		push(value: T): List<T>;
		length: number;
	}

	const emptyNode: List<any> = <List<any>> { /* comming soon */ };

	class Node<T> implements List<T> {
		private mValue: T;
		private mNext: List<T>;
		private mLength: number;

		constructor(value: T, next: List<T>) {
			this.mValue = value;
			this.mNext = next ? next : emptyNode;
			this.mLength = 1 + this.mNext.length;
		}

		get length(): number {
			return this.mLength;
		}

		push(value: T): List<T> {
			return null;
		}

		prepend(value: T): List<T> {
			return new Node(value, this);
		}
	}

}