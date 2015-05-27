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

	it("empty", () => {
		expect(Streams.empty<any>().any(s => s === "C")).toBe(false);
	});

	it("any for 100000 elements", () => {
		var elements = Streams.range(2, 100000, 2).toArray();
		expect(Streams.ofArray(elements).any(n => n % 2 == 0)).toBe(true);
		expect(Streams.ofArray(elements).any(n => n % 2 != 0)).toBe(false);
	});
})