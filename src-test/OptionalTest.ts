/// <reference path="../src/Optional" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Optional", () => {
		it("should be present, shouldn't be absent, should throw no exception, and value should be 'A'", () => {
			var present = Optional.of("A")
			expect(present.isPresent()).toBe(true)
			expect(present.isAbsent()).toBe(false)
			expect(present.get()).toBe("A")
		})

		it("should be absent, shouldn't be present, and should throw an exception (null)", () => {
			var absent = Optional.ofNullable<any>(null)
			expect(absent.isAbsent()).toBe(true)
			expect(absent.isPresent()).toBe(false)
			expect(() => absent.get()).toThrow()
		})

		it("should be absent, shouldn't be present, and should throw an exception (undefined)", () => {
			var absent = Optional.ofNullable<any>(undefined)
			expect(absent.isAbsent()).toBe(true)
			expect(absent.isPresent()).toBe(false)
			expect(() => absent.get()).toThrow()
		})

		it("should throw an exception", () => {
			expect(() => { Optional.of<any>(null) }).toThrow()
		})

		it("should throw an exception", () => {
			expect(() => { Optional.of<any>(undefined) }).toThrow()
		})

		it("should be the correct fallback value", () => {
			var empty1 = Optional.empty<string>()
			expect(empty1.getOr('test1')).toBe('test1')

			var empty2 = Optional.ofNullable(null)
			expect(empty2.getOr('test2')).toBe('test2')
		})

		it("should be the correct fallback value (null)", () => {
			var empty1 = Optional.empty<string>()
			expect(empty1.getOrNull()).toBe(null)

			var empty2 = Optional.ofNullable(null)
			expect(empty2.getOrNull()).toBe(null)
		})

		it("should be the correct fallback value (undefined)", () => {
			var empty1 = Optional.empty<string>()
			expect(empty1.getOrUndefined()).toBe(undefined)

			var empty2 = Optional.ofNullable(null)
			expect(empty2.getOrUndefined()).toBe(undefined)
		})
	})
}