/// <reference path="jasmine.d.ts" />
/// <reference path="../src/Sequences" />

module tsf.test {
	describe("Creating sequence", () => {
		describe("Sequences#ofArray", () => {
			it("should be [], ['A'], [1, 2, 3]", () => {
				expect(Sequences.ofArray([]).toArray()).toEqual([])
				expect(Sequences.ofArray(["A"]).toArray()).toEqual(["A"])
				expect(Sequences.ofArray([1, 2, 3]).toArray()).toEqual([1, 2, 3])
			})
		})
	
		describe("Sequences#ofValues (varargs)", () => {
			it("should be [], ['A'], [1, 2, 3]", () => {
				expect(Sequences.ofValues().toArray()).toEqual([])
				expect(Sequences.ofValues("A").toArray()).toEqual(["A"])
				expect(Sequences.ofValues(1, 2, 3).toArray()).toEqual([1, 2, 3])
			})
		})
	
		describe("Sequences#ofValue", () => {
			it("should be [1]", () => {
				expect(Sequences.ofValue(1).toArray()).toEqual([1])
			})
		})
	
		describe("Sequences#range", () => {
			it("should match the limits of the ranges", () => {
				expect(Sequences.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4, 5])
				expect(Sequences.range(0, 8, 2).toArray()).toEqual([0, 2, 4, 6, 8])
				expect(Sequences.range(10, 5, -2).toArray()).toEqual([10, 8, 6])
				expect(Sequences.range(-5, 0).toArray()).toEqual([-5, -4, -3, -2, -1, 0])
			})
		})
	
		describe("Sequences#generate", () => {
			it("should generate an endless sequence with the given supplier, which is limited", () => {
				expect(Sequences.generate(() => "A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
				var i = 0
				expect(Sequences.generate(() => i++).limit(5).toArray()).toEqual([0, 1, 2, 3, 4])
			})
		})
	
		describe("Sequences#repeat", () => {
			it("should endlessly repeat the given element in a sequence, which is limited", () => {
				expect(Sequences.repeat("A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
				expect(Sequences.repeat([0]).limit(3).toArray()).toEqual([[0], [0], [0]])
			})
		})
	
		describe("Sequences#empty", () => {
			it("should be empty", () => {
				expect(Sequences.empty<any>().toArray()).toEqual([])
			})
		})
	})
}