/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />

describe("Streams#average", () => {
	it("average string length in array", () => {
		var result = Streams.ofArray(["A", "BB", "CCC", "DDDD", "EEEEE"])
			.average(s => s.length);
		expect(result).toBe(3);
	});

	it("empty", () => {
		var result = Streams.empty<string>()
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
		var result = Streams.ofArray(users)
			.average(s => s.age);
		expect(result).toBe(30);
	});

	it("average of 100000 elements", () => {
		var result = Streams.range(0, 100000).average(n => n);
		expect(result).toBe(50000);
	});
});