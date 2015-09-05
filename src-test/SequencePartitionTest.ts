/// <reference path="../Sequences" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#partition", () => {
	it("Count", () => {
		var originalSequence = Sequences.repeat("A").limit(10);
		var partitionedSequence = originalSequence.partition(2);
		expect(partitionedSequence.count()).toBe(5);
	});

	it("Count subSequences and check contents", () => {
		var originalSequence = Sequences.repeat("A").limit(15);
		var partitionedSequence = originalSequence.partition(3);

		partitionedSequence.forEach(subSequence => {
			var counter = 0;
			var concatenated = "";
			subSequence.forEach(a => {
				concatenated += a
				counter++;
			});
			expect(counter).toBe(3);
			expect(concatenated).toBe("AAA");
		});
	});

	it("Count subSequences and check contents of incomplete partition", () => {
		var originalSequence = Sequences.repeat("A").limit(13);
		var partitionedSequence = originalSequence.partition(5);
		var iterationCount = 0;

		partitionedSequence.forEach(subSequence => {
			var counter = 0;
			var concatenated = "";
			subSequence.forEach(a => {
				concatenated += a
				counter++;
			});
			if (iterationCount < 2) {
				expect(counter).toBe(5);
				expect(concatenated).toBe("AAAAA");
			} else {
				expect(counter).toBe(3);
				expect(concatenated).toBe("AAA");
			}
			iterationCount++;
		});
	});

	it("empty", () => {
		expect(Sequences.empty<any>().partition(2).toArray()).toEqual([]);
	});
})