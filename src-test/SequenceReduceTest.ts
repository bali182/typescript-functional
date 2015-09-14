/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#reduce", () => {

		var sumReducer = (a: number, b: number) => a + b;
		var emptyJoiner = (a: string, b: string) => a ? a + b : b;

		it("Sum Ranges", () => {
			expect(Sequences.range(0, 10).reduce(sumReducer)).toEqual(55);
			expect(Sequences.range(0, 10, 2).reduce(sumReducer)).toEqual(30);
			expect(Sequences.range(10, 0, -2).reduce(sumReducer)).toEqual(30)
		});

		it("Join", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).reduce(emptyJoiner)).toEqual("ABCDE");
		});

		it("empty", () => {
			expect(() => Sequences.empty<number>().reduce(sumReducer)).toThrow();
		});

		it("should throw on empty", () => {
			expect(() => Optional.empty<any>().reduce(sumReducer)).toThrow();
		});

		it("should be the first element on non-empty", () => {
			expect(Optional.of(1).reduce(sumReducer)).toBe(1);
		});
	});
}