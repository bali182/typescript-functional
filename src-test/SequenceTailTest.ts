/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#tail", () => {
		it("Array", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).tail().toArray()).toEqual(["B", "C", "D", "E"]);
			expect(Sequences.ofArray(["A", "E"]).tail().toArray()).toEqual(["E"]);
			expect(Sequences.ofArray(["A"]).tail().toArray()).toEqual([]);
		});

		it("Range", () => {
			expect(Sequences.range(0, 5).tail().toArray()).toEqual([1, 2, 3, 4, 5]);
			expect(Sequences.range(0, 1).tail().toArray()).toEqual([1]);
		});

		it("Repeat & Limit", () => {
			expect(Sequences.repeat("A").limit(5).tail().toArray()).toEqual(["A", "A", "A", "A"]);
		});

		it("empty", () => {
			expect(Sequences.empty<any>().tail().toArray()).toEqual([]);
		});
	});
}