/// <reference path="Collector" />
/// <reference path="Optional" />

/**
 * Collector for joining elements as a single string.
 */
class JoiningCollector<T> implements Collector<string, T, string> {
	private mSeparator: string;
	private mPrefix: string;
	private mSuffix: string;
	private mStarted: boolean;

	constructor(separator?: string, prefix?: string, suffix?: string) {
		this.mSeparator = separator || "";
		this.mPrefix = prefix || "";
		this.mSuffix = suffix || "";
	}

	initial(): string {
		return this.mPrefix;
	}

	accumulate(accumulated: string, input: T): string {
		if (!this.mStarted) {
			this.mStarted = true;
			return accumulated + this.toStringAny(input); // prefix + first element
		}
		return accumulated + this.mSeparator + input; // add previous + separator + next
	}

	finish(accumulated: string): string {
		return accumulated + this.mSuffix;
	}

	private toStringAny(input: any): string {
		if (input === null) {
			return "null";
		}
		if (input === undefined) {
			return "undefined";
		}
		return input.toString();
	}
}