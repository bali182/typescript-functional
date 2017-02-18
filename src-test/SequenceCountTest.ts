/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#count", () => {
		it("should be 11, 6, 6 on ranges", () => {
			expect(Sequences.range(0, 10).count()).toEqual(11)
			expect(Sequences.range(0, 10, 2).count()).toEqual(6)
			expect(Sequences.range(10, 0, -2).count()).toEqual(6)
		})

		it("should be 5 on an array sequence", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).count()).toEqual(5)
		})

		it("should be 6 on a filtered sequence", () => {
			expect(Sequences.ofValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).filter(n => n % 2 == 0).count()).toBe(6)
		})

		it("should be 10 & 5 on a mapped sequence", () => {
			expect(Sequences.range(1, 10).map(s => s.toString()).count()).toEqual(10)
			expect(Sequences.ofValues(1, 2, 3, 4, 5).map(n => n.toString()).count()).toBe(5)
		})

		it("should be 6 on a skipped & limited sequence", () => {
			expect(Sequences.range(1, 10).skip(2).limit(6).count()).toBe(6)
		})

		it("should be 0 on an empty sequence", () => {
			expect(Sequences.empty<any>().count()).toBe(0)
		})

		it("should be 2 after heavy transformation", () => {
			var result = Sequences.range(0, 20)
				.filter(n => n % 2 == 0)
				.map(n => n.toString())
				.limit(3)
				.skip(1)
				.count()
			expect(result).toEqual(2)
		})

		it("should be 100000 on long range", () => {
			var result = Sequences.range(1, 100000).count()
			expect(result).toBe(100000)
		})

		it("should be 0 on empty", () => {
			expect(Optional.empty<any>().count()).toBe(0)
		})

		it("should be 1 on non empty", () => {
			expect(Optional.of('a').count()).toBe(1)
		})
	})
}