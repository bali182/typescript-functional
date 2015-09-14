/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#toArray", () => {
		it("array", () => {
			expect(Sequences.ofArray(["A", "B", "C"]).toArray()).toEqual(["A", "B", "C"]);
		});

		it("values", () => {
			expect(Sequences.ofValues("A", "B", "C").toArray()).toEqual(["A", "B", "C"]);
		});

		it("value", () => {
			expect(Sequences.ofValue("A").toArray()).toEqual(["A"]);
		});

		it("range", () => {
			expect(Sequences.range(1, 5).toArray()).toEqual([1, 2, 3, 4, 5]);
		});

		it("endless & limit", () => {
			expect(Sequences.repeat(1).limit(3).toArray()).toEqual([1, 1, 1]);
		});

		it("endless & limit", () => {
			expect(Sequences.generate(() => 5).limit(4).toArray()).toEqual([5, 5, 5, 5]);
		});

		it("should be empty array when empty", () => {
			expect(Optional.empty<any>().toArray()).toEqual([]);
		});

		it("should have a single element, when non-empty", () => {
			expect(Optional.of('a').toArray()).toEqual(['a']);
		});
	});
}