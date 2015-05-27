/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />

describe("Stream#filter", () => {
	it("Filter even / odd", () => {
		expect(Streams.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 == 0).toArray()).toEqual([2, 4]);
		expect(Streams.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 != 0).toArray()).toEqual([1, 3, 5]);
	});

	it("Filter that starts with A", () => {
		expect(Streams.ofValues("Apple", "Pear", "Astronaut", "Dog").filter(s => s.charAt(0) == 'A').toArray()).toEqual(["Apple", "Astronaut"]);
	});

	it("empty", () => {
		expect(Streams.empty<string>().filter(s => s.length > 0).toArray()).toEqual([])
	});

	it("filtering 100000 elements", () => {
		var elements = Streams.range(1, 100000).toArray();
		var even = Streams.ofArray(elements).filter(n => n % 2 == 0).toArray();
		expect(even).toEqual(Streams.range(2, 100000, 2).toArray());
	})
});