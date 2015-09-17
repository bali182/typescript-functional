/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#any", () => {
		it("should work on ranges", () => {
			expect(Sequences.range(0, 10).any(n => n >= 0)).toEqual(true);
			expect(Sequences.range(0, 10).any(n => n % 2 == 0)).toEqual(true);
			expect(Sequences.range(0, 10).any(n => n > 10)).toEqual(false);
		});

		it("should be true, because there is a 'B' among the values", () => {
			expect(Sequences.ofValues("A", "B", "C").any(s => s === "B")).toBe(true);
		});

		it("should be true, becuse there is a 'C' among the values", () => {
			expect(Sequences.ofArray(["A", "B", "C"]).any(s => s === "C")).toBe(true);
		});

		it("should be false, because no elements match the condition in an empty sequence", () => {
			expect(Sequences.empty<any>().any(s => s === "C")).toBe(false);
		});

		it("should be true, because some elements (all) match the condition", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).any(n => n % 2 == 0)).toBe(true);
		});
		
		it("should be false, because none of the elements match the condition", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).any(n => n % 2 != 0)).toBe(false);
		});

		it("should be false, on Optional#empty", () => {
			expect(Optional.empty<string>().any(s => s.length > 0)).toBe(false);
		});

		it("should be true, on Optional#any, when matching", () => {
			expect(Optional.of('a').any(s => s.length > 0)).toBe(true);
		});

		it("should be false, on Optional#any, when not matching", () => {
			expect(Optional.of('').any(s => s.length > 0)).toBe(false);
		});
	});
}