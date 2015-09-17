/// <reference path="jasmine.d.ts" />
/// <reference path="../src/Sequences" />

module tsf.test {
	describe("Sequences#average", () => {
		it("should be the 3 (average length)", () => {
			var result = Sequences.ofArray(["A", "BB", "CCC", "DDDD", "EEEEE"])
				.average(s => s.length);
			expect(result).toBe(3);
		});

		it("should be 0 (average of empty)", () => {
			var result = Sequences.empty<string>()
				.average(s => s.length);
			expect(result).toBe(0);
		});

		var users: Array<{ name: String, age: number }> = [
			{ name: "Bob", age: 31 },
			{ name: "Angela", age: 20 },
			{ name: "Robert", age: 19 },
			{ name: "Ed", age: 50 },
		];

		it("should be 30 (average age)", () => {
			var result = Sequences.ofArray(users)
				.average(s => s.age);
			expect(result).toBe(30);
		});

		it("should be 50000 (average of range)", () => {
			var result = Sequences.range(0, 100000).average(n => n);
			expect(result).toBe(50000);
		});

		it("should be 0 on empty", () => {
			expect(Optional.empty<string>().average(s => s.length)).toBe(0);
		});

		it("should be mapped value on non-empty", () => {
			expect(Optional.of('a').average(s => s.length)).toBe(1);
		});
	});
}