class Optional<T> {
	
	private static EMPTY: Optional<any> = new Optional(null);
	private mReference: T = undefined;

	constructor(reference: T) {
		this.mReference = reference;
	}

	public isPresent(): boolean {
		return !this.isAbsent();
	}

	public isAbsent(): boolean {
		return this.mReference == undefined;
	}

	public get(): T {
		if (this.isAbsent()) {
			throw new Error("absent");
		}
		return this.mReference;
	}

	public or(fallback: T): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return fallback;
	}

	public static of<T>(item: T): Optional<T> {
		if (item == undefined) {
			throw new Error("null");
		}
		return new Optional<T>(item);
	}

	public static ofNullable<T>(item: T): Optional<T> {
		if (item == undefined) {
			return Optional.EMPTY;
		}
		return new Optional<T>(item);
	}

	public static empty<T>(): Optional<T> {
		return Optional.EMPTY;
	}

	toString(): String {
		if (this.isPresent()) {
			return "Present {" + this.mReference.toString() + "}";
		}
		return "Absent {}";
	}
}