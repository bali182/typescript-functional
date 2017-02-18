/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#tail", () => {
		it("should be the tail of an array sequence", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).tail().toArray()).toEqual(["B", "C", "D", "E"])
			expect(Sequences.ofArray(["A", "E"]).tail().toArray()).toEqual(["E"])
			expect(Sequences.ofArray(["A"]).tail().toArray()).toEqual([])
		})

		it("should be the tail of a range", () => {
			expect(Sequences.range(0, 5).tail().toArray()).toEqual([1, 2, 3, 4, 5])
			expect(Sequences.range(0, 1).tail().toArray()).toEqual([1])
		})

		it("should work after repeat & limit", () => {
			expect(Sequences.repeat("A").limit(5).tail().toArray()).toEqual(["A", "A", "A", "A"])
		})

		it("should be empty on empty", () => {
			expect(Sequences.empty<any>().tail().toArray()).toEqual([])
		})

		it("should always be empty", () => {
			expect(Optional.empty<any>().tail()).toBe(Optional.empty<any>())
			expect(Optional.of('a').tail()).toBe(Optional.empty<any>())
		})
	})
}