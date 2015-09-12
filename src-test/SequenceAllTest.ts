/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#all", () => {
		it("Ranges", () => {
			expect(Sequences.range(0, 10).all(n => n >= 0)).toEqual(true);
			expect(Sequences.range(0, 10).all(n => n % 2 == 0)).toEqual(false);
		});
	
		it("Array", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).all(s => s.length > 0)).toEqual(true);
			expect(Sequences.ofArray(["A", "B", "", "D", "E"]).all(s => s.length > 0)).toEqual(false);
		});
	
		it("After transformation and filter", () => {
			var result = Sequences.range(0, 20)
				.filter(n => n % 2 == 0)
				.map(n => n + 1)
				.limit(3)
				.all(n => n % 2 != 0);
			expect(result).toEqual(true);
		});
	
		it("Empty", () => {
			expect(Sequences.empty<any>().all(e => e === "A")).toBe(true);
		});
	
		it("all for 100000 elements", () => {
			var elements = Sequences.range(2, 100000, 2).toArray();
			expect(Sequences.ofArray(elements).all(n => n % 2 == 0)).toBe(true);
			expect(Sequences.ofArray(elements).all(n => n % 2 != 0)).toBe(false);
		});
	})
}