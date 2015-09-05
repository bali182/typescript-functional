/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Stream#count", () => {
	it("Ranges", () => {
		expect(Sequences.range(0, 10).count()).toEqual(11);
		expect(Sequences.range(0, 10, 2).count()).toEqual(6);
		expect(Sequences.range(10, 0, -2).count()).toEqual(6);
	});

	it("Array", () => {
		expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).count()).toEqual(5);
	});

	it("Filtered", () => {
		expect(Sequences.ofValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).filter(n => n % 2 == 0).count()).toBe(6)
	});

	it("Mapped", () => {
		expect(Sequences.range(1, 10).map(s => s.toString()).count()).toEqual(10);
		expect(Sequences.ofValues(1, 2, 3, 4, 5).map(n => n.toString()).count()).toBe(5)
	});

	it("Skip & Limit", () => {
		expect(Sequences.range(1, 10).skip(2).limit(6).count()).toBe(6);
	});

	it("empty", () => {
		expect(Sequences.empty<any>().count()).toBe(0);
	});

	it("After transformation and filter", () => {
		var result = Sequences.range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n.toString())
			.limit(3)
			.skip(1)
			.count();
		expect(result).toEqual(2);
	});

	it("count 100000 elements", () => {
		var result = Sequences.range(1, 100000).count();
		expect(result).toBe(100000);
	});
})