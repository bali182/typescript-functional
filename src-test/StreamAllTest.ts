/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#all", () => {
	it("Ranges", () => {
		expect(Streams.range(0, 10).all(n => n >= 0)).toEqual(true);
		expect(Streams.range(0, 10).all(n => n % 2 == 0)).toEqual(false);
	});

	it("Array", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).all(s => s.length > 0)).toEqual(true);
		expect(Streams.ofArray(["A", "B", "", "D", "E"]).all(s => s.length > 0)).toEqual(false);
	});

	it("After transformation and filter", () => {
		var result = Streams.range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n + 1)
			.limit(3)
			.all(n => n % 2 != 0);
		expect(result).toEqual(true);
	});
})