/// <reference path="jasmine.d.ts" />
/// <reference path="../Sequences" />

describe("Sequence#filter", () => {
	it("Filter even / odd", () => {
		expect(Sequences.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 == 0).toArray()).toEqual([2, 4]);
		expect(Sequences.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 != 0).toArray()).toEqual([1, 3, 5]);
	});

	it("Filter that starts with A", () => {
		expect(Sequences.ofValues("Apple", "Pear", "Astronaut", "Dog").filter(s => s.charAt(0) == 'A').toArray()).toEqual(["Apple", "Astronaut"]);
	});

	it("empty", () => {
		expect(Sequences.empty<string>().filter(s => s.length > 0).toArray()).toEqual([])
	});

	it("filtering 100000 elements", () => {
		var elements = Sequences.range(1, 100000).toArray();
		var even = Sequences.ofArray(elements).filter(n => n % 2 == 0).toArray();
		expect(even).toEqual(Sequences.range(2, 100000, 2).toArray());
	})
});