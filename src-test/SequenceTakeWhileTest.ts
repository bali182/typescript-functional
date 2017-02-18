/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	//TODO - more tests for this
	describe("Sequence#takeWhile", () => {
		it("should take the fruits starting with the letter 'A'", () => {
			expect(Sequences.ofValues("Apple", "Avocado", "Banana", "Cat").takeWhile(f => f.charAt(0) === 'A').toArray()).toEqual(["Apple", "Avocado"])
		})

		it("should take elements from a range, while they are < 5", () => {
			expect(Sequences.range(0, 10).takeWhile(i => i < 5).toArray()).toEqual([0, 1, 2, 3, 4])
		})

		it("should be an alternative limit", () => {
			var counter = 0
			expect(Sequences.repeat("A").takeWhile(a => ++counter <= 3).toArray()).toEqual(["A", "A", "A"])
		})

		it("should be empty when taking from empty", () => {
			expect(Optional.empty<any>().takeWhile(e => true)).toBe(Optional.empty<any>())
		})

		it("should be empty when taking from non-empty, with false condition", () => {
			var a = Optional.of('a')
			expect(a.takeWhile(e => false)).toBe(Optional.empty<any>())
		})

		it("should be itself when taking from non-empty", () => {
			var a = Optional.of('a')
			expect(a.takeWhile(e => true)).toBe(a)
		})
	})
}