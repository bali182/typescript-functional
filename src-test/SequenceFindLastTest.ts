/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#findLast", () => {
		var users: Array<{ name: String, age: number, children: number }> = [
			{ name: "Angela", age: 20, children: 1 },
			{ name: "Robert", age: 19, children: 0 },
			{ name: "Bob", age: 31, children: 2 },
			{ name: "Ed", age: 50, children: 5 },
		];

		it("last adult", () => {
			var result = Sequences.ofArray(users).findLast(u => u.age >= 21);
			expect(result.isPresent()).toBe(true);
			expect(result.get().name).toBe("Ed");
		});

		it("last even", () => {
			var result = Sequences.ofValues(1, 3, 5, 7, 4, 2, 1).findLast(n => n % 2 === 0);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe(2);
		});

		it("last non empty", () => {
			var result = Sequences.ofValues("", null, undefined, "A", null, "B", "").findLast(s => !!s);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe("B");
		});

		it("last in empty", () => {
			var result = Sequences.empty<any>().findLast(_ => true);
			expect(result.isPresent()).toBe(false);
		});

		it("find between 100000 elements", () => {
			var result = Sequences.range(0, 110000).findLast(n => n > 99999);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe(110000)
		});
	});
}