/// <reference path="jasmine.d.ts" />
/// <reference path="../Sequences" />

describe("Streams#average", () => {
	it("average string length in array", () => {
		var result = Sequences.ofArray(["A", "BB", "CCC", "DDDD", "EEEEE"])
			.average(s => s.length);
		expect(result).toBe(3);
	});

	it("empty", () => {
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

	it("average age", () => {
		var result = Sequences.ofArray(users)
			.average(s => s.age);
		expect(result).toBe(30);
	});

	it("average of 100000 elements", () => {
		var result = Sequences.range(0, 100000).average(n => n);
		expect(result).toBe(50000);
	});
});