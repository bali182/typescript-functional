/// <reference path="jasmine.d.ts" />
/// <reference path="../src/Sequences" />

module tsf.test {
	describe("Sequences#at", () => {
		it("should be present & B", () => {
			var result = Sequences.ofArray(["A", "B", "C"]).at(1)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe("B")
		})

		it("should be present & 5", () => {
			var index = 0
			var result = Sequences.generate(() => index++).at(5)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(5)
		})

		it("should be present & A", () => {
			var result = Sequences.repeat("A").at(5)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe("A")
		})

		it("should be present & 3", () => {
			var result = Sequences.range(1, 5).at(2)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(3)
		})

		it("should be absent, because index is out of range", () => {
			var result = Sequences.ofArray(["A", "B", "C"]).at(3)
			expect(result.isAbsent()).toBe(true)

			result = Sequences.ofArray(["A", "B", "C"]).at(100)
			expect(result.isAbsent()).toBe(true)
		})

		it("should be absent", () => {
			var result = Sequences.empty<any>().at(2)
			expect(result.isAbsent()).toBe(true)
		})

		it("should be present & A", () => {
			var result = Sequences.repeat("A").at(100000)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe("A")
		})

		it("should be empty on Optional#empty", () => {
			expect(Optional.empty<any>().at(0)).toEqual(Optional.empty<any>())
			expect(Optional.empty<any>().at(100)).toEqual(Optional.empty<any>())
		})

		it("should be empty on Optional#of with index higher, than 0", () => {
			expect(Optional.of('a').at(3)).toEqual(Optional.empty<any>())
			expect(Optional.of('a').at(100)).toEqual(Optional.empty<any>())
		})

		it("should be itself on Optional#of with index 0", () => {
			var a = Optional.of('a')
			expect(a.at(0)).toEqual(a)
		})
	})
}