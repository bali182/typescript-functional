/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#map", () => {
	it("number to string", () => {
		expect(Sequences.ofValues(1, 2, 3)
			.map(n => n.toString())
			.toArray())
			.toEqual(["1", "2", "3"]);
	});

	it("parseInt", () => {
		expect(Sequences.ofValues("1", "2", "3")
			.map(s => parseInt(s))
			.toArray())
			.toEqual([1, 2, 3]);
	});

	var users: Array<{ name: String, age: number }> = [
		{ name: "Bob", age: 31 },
		{ name: "Ed", age: 50 },
		{ name: "Angela", age: 20 },
		{ name: "Robert", age: 19 }
	];

	it("map people to their name", () => {
		var result = Sequences.ofArray(users).map(u => u.name);
		expect(result.toArray()).toEqual(["Bob", "Ed", "Angela", "Robert"]);
	});

	it("empty", () => {
		expect(Sequences.empty<string>().map(s => parseInt(s)).toArray()).toEqual([]);
	});

	it("mapping 100000 elements", () => {
		expect(Sequences.repeat(1)
			.limit(100000)
			.map(n => n.toString())
			.toArray()
		).toEqual(Sequences.repeat("1")
			.limit(100000)
			.toArray()
		);
	});
});