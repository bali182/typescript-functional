/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#map", () => {
	it("number to string", () => {
		expect(Streams.ofValues(1, 2, 3).map(n => n.toString()).toArray()).toEqual(["1", "2", "3"]);
	});

	it("parseInt", () => {
		expect(Streams.ofValues("1", "2", "3").map(s => parseInt(s)).toArray()).toEqual([1, 2, 3]);
	});
});
