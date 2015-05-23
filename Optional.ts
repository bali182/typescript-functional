/**
 * Container object, which may or may not contain a value.
 */
class Optional<T> {
	
	/** Empty optional, which contains no value. */
	private static EMPTY: Optional<any> = new Optional(undefined);
	/** The reference to the value. */
	private mReference: T = undefined;
	
	/** 
	 * Constructor.
	 * @param reference The referenced object.
	 */
	constructor(reference: T) {
		this.mReference = reference;
	}
	
	/**
	 * Returns true, if there is a non-null and non-undefined reference present, false otherwise.
	 */
	public isPresent(): boolean {
		return !this.isAbsent();
	}
	
	/**
	 * Returns true, if there is no non-null and non-undefined reference present, false otherwise.
	 */
	public isAbsent(): boolean {
		return this.mReference === undefined;
	}

	/**
	 * Returns the referenced value, if present, otherwise throws an error.
	 */
	public get(): T {
		if (this.isAbsent()) {
			throw new Error("absent");
		}
		return this.mReference;
	}
	
	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 */
	public or(fallback: T): T {
		if (fallback === null || fallback === undefined) {
			throw new Error("use orUndefined instead");
		}
		if (this.isPresent()) {
			return this.mReference;
		}
		return fallback;
	}
	
	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 */
	public orUndefined(): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return undefined;
	}
	
	/**
	 * Constructs an optional with a non-null and non-undefined value. If null or undefined is supplied, an error will be thrown.
	 * @param item The referenced value. May not be null or undefined.
	 */
	public static of<T>(item: T): Optional<T> {
		if (item === undefined || item === null) {
			throw new Error("undefined or null");
		}
		return new Optional<T>(item);
	}
	
	/**
	 * Constructs an optional from the given value, which may be null.
	 * @param item The referenced value. Can be null.
	 */
	public static ofNullable<T>(item: T): Optional<T> {
		if (item === undefined || item === null) {
			return Optional.EMPTY;
		}
		return new Optional<T>(item);
	}
	
	/**
	 * Returns an empty optional (absent), which contains no reference.
	 */
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