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