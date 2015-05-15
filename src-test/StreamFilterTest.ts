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
});