/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#max", () => {
	var numComparator = (a: number, b: number) => a < b ? -1 : (a > b ? + 1 : 0);
	var strLenComparator = (a: string, b: string) => a.length < b.length ?
		-1
		: (a.length > b.length ? + 1 : 0);

	var ageComparator = (a: { name: String, age: number }, b: { name: String, age: number }) =>
		a.age < b.age ? -1 : (a.age > b.age ? + 1 : 0);

	it("max numbers in range", () => {
		var result = Sequences.range(0, 10).max(numComparator);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe(10);
	});

	it("max length string", () => {
		var result = Sequences.ofValues("Apple", "Orange", "Almonds", "Peach", "Berry").max(strLenComparator);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe("Almonds");
	});

	var users: Array<{ name: String, age: number }> = [
		{ name: "Bob", age: 31 },
		{ name: "Ed", age: 50 },
		{ name: "Angela", age: 20 },
		{ name: "Robert", age: 19 }
	];

	it("max age person", () => {
		var result = Sequences.ofArray(users).max(ageComparator);
		expect(result.isPresent()).toBe(true);
		expect(result.get().name).toBe("Ed");
	});

	it("empty", () => {
		var last = Sequences.empty<string>().max(strLenComparator);
		expect(last.isAbsent()).toBe(true);
	});

	it("max of 1000 elements", () => {
		var max = Sequences.range(0, 1000).map(n => Sequences.repeat("A").limit(n).join()).max(strLenComparator);
		expect(max.isPresent()).toBe(true);
		expect(max.get()).toBe(Sequences.repeat("A").limit(1000).join());
	});
})