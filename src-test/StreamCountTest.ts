/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#count", () => {
	it("Ranges", () => {
		expect(Streams.range(0, 10).count()).toEqual(11);
		expect(Streams.range(0, 10, 2).count()).toEqual(6);
		expect(Streams.range(10, 0, -2).count()).toEqual(6);
	});

	it("Array", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).count()).toEqual(5);
	});

	it("Filtered", () => {
		expect(Streams.ofValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).filter(n => n % 2 == 0).count()).toBe(6)
	});

	it("Mapped", () => {
		expect(Streams.range(1, 10).map(s => s.toString()).count()).toEqual(10);
		expect(Streams.ofValues(1, 2, 3, 4, 5).map(n => n.toString()).count()).toBe(5)
	});

	it("Skip & Limit", () => {
		expect(Streams.range(1, 10).skip(2).limit(6).count()).toBe(6);
	});

	it("After transformation and filter", () => {
		var result = Streams.range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n.toString())
			.limit(3)
			.skip(1)
			.count();
		expect(result).toEqual(2);
	});
})