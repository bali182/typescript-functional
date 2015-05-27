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

	it("empty", () => {
		var last = Streams.empty<string>().last();
		expect(last.isAbsent()).toBe(true);
	});

	it("last of 100000 elements", () => {
		var last = Streams.range(0, 100000).last();
		expect(last.isPresent()).toBe(true);
		expect(last.get()).toBe(100000);
	});
})