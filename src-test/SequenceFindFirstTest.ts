/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#findFirst", () => {
		var users: Array<{ name: String, age: number, children: number }> = [
			{ name: "Angela", age: 20, children: 1 },
			{ name: "Robert", age: 19, children: 0 },
			{ name: "Bob", age: 31, children: 2 },
			{ name: "Ed", age: 50, children: 5 },
		]

		it("should find the first adult", () => {
			var result = Sequences.ofArray(users).findFirst(u => u.age >= 21)
			expect(result.isPresent()).toBe(true)
			expect(result.get().name).toBe("Bob")
		})

		it("should find the first even number", () => {
			var result = Sequences.ofValues(1, 3, 5, 7, 4, 9, 1).findFirst(n => n % 2 === 0)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(4)
		})

		it("should find the first truthy value", () => {
			var result = Sequences.ofValues("", null, undefined, "A", null, "B").findFirst(s => !!s)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe("A")
		})

		it("should be empty", () => {
			var result = Sequences.empty<any>().findFirst(_ => true)
			expect(result.isPresent()).toBe(false)
		})

		it("should find the first matching among a large amount of elements", () => {
			var result = Sequences.range(0, 100000).findFirst(n => n > 99999)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(100000)
		})

		it("should be empty on empty", () => {
			expect(Optional.empty<any>().findFirst(e => true)).toBe(Optional.empty<any>())
		})

		it("should be empty on non matching filter", () => {
			expect(Optional.of('').findFirst(e => e.length > 0)).toBe(Optional.empty<any>())
		})

		it("should be empty on empty", () => {
			var a = Optional.of('a')
			expect(a.findFirst(e => e.length > 0)).toBe(a)
		})
	})
}