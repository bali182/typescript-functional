/// <reference path="Collector" />
/// <reference path="Optional" />

/**
 * Collector for joining elements as a single string. The input elements are transformed to string using 
 * the toString() method.
 */
class JoiningCollector<T> implements Collector<string, T, string> {
	/** The separator between the elements. Empty string ("") by default. */
	private mSeparator: string;
	/** The prefix of the generated string. Empty string ("") by default. */
	private mPrefix: string;
	/** The suffix of the generated string. Empty string ("") by default. */
	private mSuffix: string;
	/** Flag marking, if accumulate() has been called (iteration started) */
	private mStarted: boolean = false;

	/**
	 * Constructor.
	 * @param separator (Optional) The separator between the elements. Empty string ("") by default.
	 * @param prefix (Optional) The prefix of the generated string. Empty string ("") by default.
	 * @param suffix (Optional) The suffix of the generated string. Empty string ("") by default.
	 */
	constructor(separator?: string, prefix?: string, suffix?: string) {
		this.mSeparator = separator || "";
		this.mPrefix = prefix || "";
		this.mSuffix = suffix || "";
	}
	
	/** Returns the prefix - empty string ("") by default. */
	initial(): string {
		return this.mPrefix;
	}
	
	/** 
	 * Concatenates the accumulated string with the separator 
	 * - empty string ("") by default - and with the input value. 
	 */
	accumulate(accumulated: string, input: T): string {
		if (!this.mStarted) {
			this.mStarted = true;
			return accumulated + this.toStringAny(input); // prefix + first element
		}
		return accumulated + this.mSeparator + input; // add previous + separator + next
	}
	
	/** Concatenates the accumulated string with the given suffix - empty string ("") by default. */
	finish(accumulated: string): string {
		return accumulated + this.mSuffix;
	}
	
	/** 
	 * Converts the input to it's string representation
	 * "undefined" if the input was undefined
	 * "null" if the input was null
	 * input#toString() if the input was anything else.
	 */
	private toStringAny(input: any): string {
		if (input === undefined) {
			return "undefined";
		}
		if (input === null) {
			return "null";
		}
		return input.toString();
	}
}