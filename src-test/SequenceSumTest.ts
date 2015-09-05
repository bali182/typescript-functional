/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#sum", () => {
	it("sum range", () => {
		var sum = Sequences.range(1, 3).sum(n => n);
		expect(sum).toBe(6);
	});

	it("sum length of strings", () => {
		var sum = Sequences.ofValues("", "A", "BB", "CCC", "", "D")
			.sum(s => s.length);
		expect(sum).toBe(7);
	});

	it("sum length of strings", () => {
		var sum = Sequences.ofValues("", "A", "BB", "CCC", "", "D")
			.sum(s => s.length);
		expect(sum).toBe(7);
	});

	var users: Array<{ name: String, age: number }> = [
		{ name: "Bob", age: 31 },
		{ name: "Ed", age: 50 },
		{ name: "Angela", age: 20 },
		{ name: "Robert", age: 19 }
	];

	it("sum ages of people", () => {
		var sum = Sequences.ofArray(users)
			.sum(s => s.age);
		expect(sum).toBe(120);
	});

	it("sum empty", () => {
		var sum = Sequences.empty<number>().sum(n => n);
		expect(sum).toBe(0);
	});
})