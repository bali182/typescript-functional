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
			throw new Error("The element is absent");
		}
		return this.mReference;
	}
	
	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
	 * @param fallback The fallback value to use, if the value is absent.
	 */
	public getOr(fallback: T): T {
		if (fallback === null || fallback === undefined) {
			throw new Error("use orUndefined() or orNull() instead");
		}
		if (this.isPresent()) {
			return this.mReference;
		}
		return fallback;
	}
	
	/**
	 * Returns the referenced value if present, undefined otherwise.
	 */
	public getOrUndefined(): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return undefined;
	}
	
	/**
	 * Returns the referenced value if present, null otherwise.
	 */
	public getOrNull(): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		return null;
	}
	
	/**
	 * Returns the referenced value if present, throws the given Error otherwise.
	 */
	public getOrThrow(error: Error): T {
		if (this.isPresent()) {
			return this.mReference;
		}
		throw error;
	}
	
	/**
	 * Constructs an optional with a non-null and non-undefined value. If null or undefined is supplied, an error will be thrown.
	 * @param input The referenced value. May not be null or undefined.
	 */
	public static of<T>(input: T): Optional<T> {
		if (input === undefined || input === null) {
			throw new Error("undefined or null");
		}
		return new Optional<T>(input);
	}
	
	/**
	 * Constructs an optional from the given value, which may be null.
	 * @param input The referenced value. Can be null.
	 */
	public static ofNullable<T>(input: T): Optional<T> {
		if (input === undefined || input === null) {
			return Optional.EMPTY;
		}
		return new Optional<T>(input);
	}
	
	/**
	 * Returns an empty optional (absent), which contains no reference.
	 */
	public static empty<T>(): Optional<T> {
		return Optional.EMPTY;
	}

	toString(): String {
		if (this.isPresent()) {
			return "Present { " + this.mReference.toString() + " }";
		}
		return "Absent {}";
	}
}