/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#any", () => {
	it("Range", () => {
		expect(Streams.range(0, 10).any(n => n >= 0)).toEqual(true);
		expect(Streams.range(0, 10).any(n => n % 2 == 0)).toEqual(true);
		expect(Streams.range(0, 10).any(n => n > 10)).toEqual(false);
	});

	it("Array", () => {
		expect(Streams.ofValues("A", "B", "C").any(s => s === "B"));
	});

	it("Values", () => {
		expect(Streams.ofArray(["A", "B", "C"]).any(s => s === "C"));
	});
})