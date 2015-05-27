/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#findFirst", () => {
	var users: Array<{ name: String, age: number, children: number }> = [
		{ name: "Angela", age: 20, children: 1 },
		{ name: "Robert", age: 19, children: 0 },
		{ name: "Bob", age: 31, children: 2 },
		{ name: "Ed", age: 50, children: 5 },
	];

	it("first adult", () => {
		var result = Streams.ofArray(users).findFirst(u => u.age >= 21);
		expect(result.isPresent()).toBe(true);
		expect(result.get().name).toBe("Bob");
	});

	it("first even", () => {
		var result = Streams.ofValues(1, 3, 5, 7, 4, 9, 1).findFirst(n => n % 2 === 0);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe(4);
	});

	it("first non empty", () => {
		var result = Streams.ofValues("", null, undefined, "A", null, "B").findFirst(s => !!s);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe("A");
	});

	it("first in empty", () => {
		var result = Streams.empty<any>().findFirst(_ => true);
		expect(result.isPresent()).toBe(false);
	});

	it("find between 100000 elements", () => {
		var result = Streams.range(0, 100000).findFirst(n => n > 99999);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe(100000)
	});
})