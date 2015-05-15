/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#reduce", () => {

	var sumReducer = (a: number, b: number) => a + b;
	var emptyJoiner = (a: string, b: string) => a ? a + b : b;

	it("Sum Ranges", () => {
		expect(Streams.range(0, 10).reduce(sumReducer, 0)).toEqual(55);
		expect(Streams.range(0, 10, 2).reduce(sumReducer, 0)).toEqual(30);
		expect(Streams.range(10, 0, -2).reduce(sumReducer, 0)).toEqual(30)
	});

	it("Join", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).reduce(emptyJoiner)).toEqual("ABCDE");
	});
})