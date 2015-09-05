/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Stream#reduce", () => {

	var sumReducer = (a: number, b: number) => a + b;
	var emptyJoiner = (a: string, b: string) => a ? a + b : b;

	it("Sum Ranges", () => {
		expect(Sequences.range(0, 10).reduce(sumReducer, 0)).toEqual(55);
		expect(Sequences.range(0, 10, 2).reduce(sumReducer, 0)).toEqual(30);
		expect(Sequences.range(10, 0, -2).reduce(sumReducer, 0)).toEqual(30)
	});

	it("Join", () => {
		expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).reduce(emptyJoiner)).toEqual("ABCDE");
	});

	it("empty", () => {
		expect(Sequences.empty<number>().reduce(sumReducer, 0)).toBe(0);
	});
})