/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

//TODO - more tests for this
describe("Sequence#takeWhile", () => {
	it("Fruits", () => {
		expect(Sequences.ofValues("Apple", "Avocado", "Banana", "Cat").takeWhile(f => f.charAt(0) === 'A').toArray()).toEqual(["Apple", "Avocado"])
	});

	it("Range", () => {
		expect(Sequences.range(0, 10).takeWhile(i => i < 5).toArray()).toEqual([0, 1, 2, 3, 4]);
	});

	it("Alternate to limit", () => {
		var counter = 0;
		expect(Sequences.repeat("A").takeWhile(a => ++counter <= 3).toArray()).toEqual(["A", "A", "A"]);
	});
})