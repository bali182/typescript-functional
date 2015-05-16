/// <reference path="../Streams" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />

describe("Collectors", () => {
	it("Sum 0-5", () => {
		expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.sum())).toEqual(15);
		expect(Streams.range(0, 5).collect(Collectors.sum())).toEqual(15);
	});

	it("Average", () => {
		expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
		expect(Streams.range(0, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
		expect(Streams.repeat(5).limit(30).collect(Collectors.average())).toEqual(5);
	});

	it("Min", () => {
		var comparator = (a, b) => a < b ? -1 : (a > b ? + 1 : 0);

		var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
		expect(minPresent.isPresent()).toEqual(true);
		expect(minPresent.get()).toEqual(1);

		var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
		expect(minForSingle.isPresent()).toEqual(true);
		expect(minForSingle.get()).toEqual(5);

		var minForNone = Streams.empty<number>().collect(Collectors.min(comparator));
		expect(minForNone.isPresent()).toEqual(false);
	});

	it("Max", () => {
		var comparator = (a, b) => a < b ? 1 : (a > b ? + -1 : 0);

		var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
		expect(minPresent.isPresent()).toEqual(true);
		expect(minPresent.get()).toEqual(11);

		var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
		expect(minForSingle.isPresent()).toEqual(true);
		expect(minForSingle.get()).toEqual(5);

		var minForNone = Streams.empty<number>().collect(Collectors.min(comparator));
		expect(minForNone.isPresent()).toEqual(false);
	});

	it("Join", () => {
		expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join())).toEqual("ABC");
		expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join(",", "[", "]"))).toEqual("[A,B,C]");
		expect(Streams.ofArray([1, 2, 3]).collect(Collectors.join(",", "["))).toEqual("[1,2,3");
	});
	
	// count and toArray are tested implicitly
});