/// <reference path="../Streams" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />

describe("Collectors", () => {
	it("SumCollector", () => {
		expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.sum())).toEqual(15);
		expect(Streams.range(0, 5).collect(Collectors.sum())).toEqual(15);
	});

	it("AveragingCollector", () => {
		expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
		expect(Streams.range(0, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
		expect(Streams.repeat(5).limit(30).collect(Collectors.average())).toEqual(5);
		expect(Streams.empty<any>().collect(Collectors.average())).toBe(0);
	});

	it("MinCollector", () => {
		var comparator = (a: number, b: number) => a < b ? -1 : (a > b ? + 1 : 0);

		var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
		expect(minPresent.isPresent()).toEqual(true);
		expect(minPresent.get()).toEqual(1);

		var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
		expect(minForSingle.isPresent()).toEqual(true);
		expect(minForSingle.get()).toEqual(5);

		var minForNone = Streams.empty<any>().collect(Collectors.min(comparator));
		expect(minForNone.isPresent()).toEqual(false);
	});

	it("MaxCollector", () => {
		var comparator = (a: number, b: number) => a < b ? 1 : (a > b ? + -1 : 0);

		var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
		expect(minPresent.isPresent()).toEqual(true);
		expect(minPresent.get()).toEqual(11);

		var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
		expect(minForSingle.isPresent()).toEqual(true);
		expect(minForSingle.get()).toEqual(5);

		var minForNone = Streams.empty<any>().collect(Collectors.min(comparator));
		expect(minForNone.isPresent()).toEqual(false);
	});

	it("JoiningCollector", () => {
		expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join())).toEqual("ABC");
		expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join(",", "[", "]"))).toEqual("[A,B,C]");
		expect(Streams.ofArray([1, 2, 3]).collect(Collectors.join(",", "["))).toEqual("[1,2,3");
		expect(Streams.empty<any>().collect(Collectors.join(",", "[", "]"))).toEqual("[]");
	});

	it("CounterCollector", () => {
		expect(Streams.repeat("A").limit(5).collect(Collectors.count())).toBe(5);
		expect(Streams.generate(() => "A").limit(10).collect(Collectors.count())).toBe(10);
		expect(Streams.range(0, 9).limit(10).collect(Collectors.count())).toBe(10);
		expect(Streams.ofValues("A", "B", "C").collect(Collectors.count())).toBe(3);
		expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.count())).toBe(3);
		expect(Streams.ofValue("A").collect(Collectors.count())).toBe(1);
		expect(Streams.empty<any>().collect(Collectors.count())).toBe(0);
	});

	it("ToArrayCollector", () => {
		expect(Streams.ofValue(1).collect(Collectors.toArray())).toEqual([1]);
		expect(Streams.ofValues(1, 2, 3).collect(Collectors.toArray())).toEqual([1, 2, 3]);
		expect(Streams.ofArray([1, 2, 3]).collect(Collectors.toArray())).toEqual([1, 2, 3]);
		expect(Streams.range(0, 3).collect(Collectors.toArray())).toEqual([0, 1, 2, 3]);
		expect(Streams.generate(() => "A").limit(3).collect(Collectors.toArray())).toEqual(["A", "A", "A"]);
		expect(Streams.repeat("A").limit(3).collect(Collectors.toArray())).toEqual(["A", "A", "A"]);
	});
});