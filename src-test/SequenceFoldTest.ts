/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#fold", () => {

	var sumReducer = (a: number, b: number) => a + b;
	var emptyJoiner = (a: string, b: string) => a + b;

	it("Sum Ranges", () => {
		expect(Sequences.range(0, 10).fold(sumReducer, 5)).toEqual(60);
		expect(Sequences.range(0, 10, 2).fold(sumReducer, 0)).toEqual(30);
	});

	it("Join", () => {
		expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).fold(emptyJoiner, "")).toEqual("ABCDE");
	});

	it("empty", () => {
		expect(Sequences.empty<number>().fold(sumReducer, 0)).toBe(0);
	});
})