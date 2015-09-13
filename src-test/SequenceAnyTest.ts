/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#any", () => {
		it("Range", () => {
			expect(Sequences.range(0, 10).any(n => n >= 0)).toEqual(true);
			expect(Sequences.range(0, 10).any(n => n % 2 == 0)).toEqual(true);
			expect(Sequences.range(0, 10).any(n => n > 10)).toEqual(false);
		});

		it("Array", () => {
			expect(Sequences.ofValues("A", "B", "C").any(s => s === "B"));
		});

		it("Values", () => {
			expect(Sequences.ofArray(["A", "B", "C"]).any(s => s === "C"));
		});

		it("empty", () => {
			expect(Sequences.empty<any>().any(s => s === "C")).toBe(false);
		});

		it("any for 100000 elements", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).any(n => n % 2 == 0)).toBe(true);
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