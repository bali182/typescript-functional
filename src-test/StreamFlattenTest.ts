/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Stream#flatten", () => {
	it("Flatten array of array", () => {
		expect(Sequences.ofValues([1, 2], [3], [4, 5]).flatten(a => Sequences.ofArray(a)).toArray()).toEqual([1, 2, 3, 4, 5]);
	});

	var users: Array<{ name: String, age: number, children: number }> = [
		{ name: "Bob", age: 31, children: 2 },
		{ name: "Angela", age: 20, children: 1 },
		{ name: "Robert", age: 19, children: 0 },
		{ name: "Ed", age: 50, children: 5 },
	];

	it("Flatten mapped values", () => {
		var array = Sequences.ofArray(users)
			.map(u => u.children)
			.flatten(ch => Sequences.repeat("a").limit(ch))
			.toArray()
		expect(array).toEqual(["a", "a", "a", "a", "a", "a", "a", "a", ]);
	});

	it("Flatten empties", () => {
		var stream = Sequences.repeat(undefined)
			.limit(5)
			.flatten(n => Sequences.empty<string>());
		expect(stream.toArray()).toEqual([]);
	});

	it("Flatten 100000 streams", () => {
		var stream = Sequences.repeat(undefined)
			.limit(100000)
			.flatten(n => Sequences.ofValue("A"));
		expect(stream.toArray()).toEqual(Sequences.repeat("A").limit(100000).toArray());
	});
})