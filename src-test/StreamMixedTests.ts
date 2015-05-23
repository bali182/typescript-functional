/// <reference path="../Streams" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />

describe("Stream mixed examples", () => {
	it("Multiply", () => {
		var a = 6;
		var b = 4;
		expect(Streams.repeat(a).limit(b).reduce((x, y) => x + y, 0)).toEqual(a * b);
	});

	var users: Array<{ name: String, age: number }> = [
		{ name: "Bob", age: 31 },
		{ name: "Angela", age: 20 },
		{ name: "Robert", age: 19 },
		{ name: "Ed", age: 50 },
	];

	it("Join names of older than 20", () => {
		var names = Streams.ofArray(users)
			.filter(u => u.age > 20)
			.map(u => u.name)
			.collect(Collectors.join(" and "));

		expect(names).toEqual("Bob and Ed");
	});

	it("Add the ages", () => {
		expect(Streams.ofArray(users).map(u => u.age).reduce((a, b) => a + b, 0)).toEqual(120);
	});

	it("Generate sequence of 'A' as long as the names combined", () => {
		var sequence = Streams.ofArray(users)
			.map(u => u.name)
			.map(name => name.length)
			.map(length => Streams.repeat("A").limit(length).collect(Collectors.join("")))
			.collect(Collectors.join(" "))

		expect(sequence).toEqual("AAA AAAAAA AAAAAA AA");
	});
})