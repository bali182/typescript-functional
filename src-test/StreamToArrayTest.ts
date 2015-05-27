/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#toArray", () => {
	it("array", () => {
		expect(Streams.ofArray(["A", "B", "C"]).toArray()).toEqual(["A", "B", "C"]);
	});

	it("values", () => {
		expect(Streams.ofValues("A", "B", "C").toArray()).toEqual(["A", "B", "C"]);
	});

	it("value", () => {
		expect(Streams.ofValue("A").toArray()).toEqual(["A"]);
	});

	it("range", () => {
		expect(Streams.range(1, 5).toArray()).toEqual([1, 2, 3, 4, 5]);
	});

	it("endless & limit", () => {
		expect(Streams.repeat(1).limit(3).toArray()).toEqual([1, 1, 1]);
	});

	it("endless & limit", () => {
		expect(Streams.generate(() => 5).limit(4).toArray()).toEqual([5, 5, 5, 5]);
	});
})