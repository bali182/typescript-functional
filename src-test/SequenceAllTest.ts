/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#all", () => {
		it("should be true, because all elements are > 0", () => {
			expect(Sequences.range(0, 10).all(n => n >= 0)).toEqual(true);
		});
		it("should be false, because not all elements are even", () => {
			expect(Sequences.range(0, 10).all(n => n % 2 == 0)).toEqual(false);
		});

		it("should be true, because all elements are non-empty strings", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).all(s => s.length > 0)).toEqual(true);
			expect(Sequences.ofArray(["A", "B", "", "D", "E"]).all(s => s.length > 0)).toEqual(false);
		});
		
		it("should be false, because not all elements are non-empty strings", () => {
			expect(Sequences.ofArray(["A", "B", "", "D", "E"]).all(s => s.length > 0)).toEqual(false);
		});

		it("should be true, because all elements are odd", () => {
			var result = Sequences.range(0, 20)
				.filter(n => n % 2 == 0)
				.map(n => n + 1)
				.limit(3)
				.all(n => n % 2 != 0);
			expect(result).toEqual(true);
		});

		it("should be true, because all elements match the condition in an empty sequence", () => {
			expect(Sequences.empty<any>().all(e => e === "A")).toBe(true);
		});

		it("should be true, because the range is incremented by 2 so all elements are even", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).all(n => n % 2 == 0)).toBe(true);
		});
		
		it("should be false, because the range is incremented by 2 so no elements are odd", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).all(n => n % 2 != 0)).toBe(false);
		});

		it("should be true, on Optional#empty", () => {
			expect(Optional.empty<string>().all(s => s.length > 0)).toBe(true);
		});

		it("should be true, on Optional#of, when matching", () => {
			expect(Optional.of('a').all(s => s.length > 0)).toBe(true);
		});

		it("should be false, on Optional#of, when not matching", () => {
			expect(Optional.of('').all(s => s.length > 0)).toBe(false);
		});
	})
}