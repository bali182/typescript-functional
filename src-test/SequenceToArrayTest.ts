/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#toArray", () => {
		it("should convert array sequences back to the same structure", () => {
			expect(Sequences.ofArray(["A", "B", "C"]).toArray()).toEqual(["A", "B", "C"])
		})

		it("should convert varargs values to the equivalent array", () => {
			expect(Sequences.ofValues("A", "B", "C").toArray()).toEqual(["A", "B", "C"])
		})

		it("should convert single value to an 1 length array", () => {
			expect(Sequences.ofValue("A").toArray()).toEqual(["A"])
		})

		it("should convert range", () => {
			expect(Sequences.range(1, 5).toArray()).toEqual([1, 2, 3, 4, 5])
		})

		it("should convert endless & limited sequence", () => {
			expect(Sequences.repeat(1).limit(3).toArray()).toEqual([1, 1, 1])
		})

		it("should convert endless & limited sequence 2", () => {
			expect(Sequences.generate(() => 5).limit(4).toArray()).toEqual([5, 5, 5, 5])
		})

		it("should be empty array when empty", () => {
			expect(Optional.empty<any>().toArray()).toEqual([])
		})

		it("should have a single element, when non-empty", () => {
			expect(Optional.of('a').toArray()).toEqual(['a'])
		})
	})
}