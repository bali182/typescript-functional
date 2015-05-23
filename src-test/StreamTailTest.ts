/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#tail", () => {
	it("Array", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).tail().toArray()).toEqual(["B", "C", "D", "E"]);
		expect(Streams.ofArray(["A", "E"]).tail().toArray()).toEqual(["E"]);
		expect(Streams.ofArray(["A"]).tail().toArray()).toEqual([]);
	});

	it("Range", () => {
		expect(Streams.range(0, 5).tail().toArray()).toEqual([1, 2, 3, 4, 5]);
		expect(Streams.range(0, 1).tail().toArray()).toEqual([1]);
	});

	it("Repeat & Limit", () => {
		expect(Streams.repeat("A").limit(5).tail().toArray()).toEqual(["A", "A", "A", "A"]);
	});
})