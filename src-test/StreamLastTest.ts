/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#last", () => {
	it("Array last", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).last().get()).toEqual("E");
		expect(Streams.ofArray(["A", "B", "C", "D"]).last().get()).toEqual("D");
		expect(Streams.empty().last().isAbsent()).toBe(true);
	});

	it("Range", () => {
		expect(Streams.range(0, 5).last().get()).toEqual(5);
	});

	it("Repeat & limit", () => {
		expect(Streams.repeat("A").limit(4).last().get()).toEqual("A");
	});
})