/// <reference path="../Sequences" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />

describe("Stream#partition", () => {
	it("Count", () => {
		var originalStream = Sequences.repeat("A").limit(10);
		var partitionedStream = originalStream.partition(2);
		expect(partitionedStream.count()).toBe(5);
	});

	it("Count substreams and check contents", () => {
		var originalStream = Sequences.repeat("A").limit(15);
		var partitionedStream = originalStream.partition(3);

		partitionedStream.forEach(subStream => {
			var counter = 0;
			var concatenated = "";
			subStream.forEach(a => {
				concatenated += a
				counter++;
			});
			expect(counter).toBe(3);
			expect(concatenated).toBe("AAA");
		});
	});

	it("Count substreams and check contents of incomplete partition", () => {
		var originalStream = Sequences.repeat("A").limit(13);
		var partitionedStream = originalStream.partition(5);
		var iterationCount = 0;

		partitionedStream.forEach(subStream => {
			var counter = 0;
			var concatenated = "";
			subStream.forEach(a => {
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