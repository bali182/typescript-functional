/// <reference path="jasmine.d.ts" />
/// <reference path="../Sequences" />

describe("Sequences#create", () => {
	it("ofArray()", () => {
		expect(Sequences.ofArray([]).toArray()).toEqual([]);
		expect(Sequences.ofArray(["A"]).toArray()).toEqual(["A"]);
		expect(Sequences.ofArray([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValues()", () => {
		expect(Sequences.ofValues().toArray()).toEqual([]);
		expect(Sequences.ofValues("A").toArray()).toEqual(["A"]);
		expect(Sequences.ofValues(1, 2, 3).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValue()", () => {
		expect(Sequences.ofValue(1).toArray()).toEqual([1]);
	});

	it("range()", () => {
		expect(Sequences.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4, 5]);
		expect(Sequences.range(0, 8, 2).toArray()).toEqual([0, 2, 4, 6, 8]);
		expect(Sequences.range(10, 5, -2).toArray()).toEqual([10, 8, 6]);
		expect(Sequences.range(-5, 0).toArray()).toEqual([-5, -4, -3, -2, -1, 0]);
	});

	it("generate()", () => {
		expect(Sequences.generate(() => "A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		var i = 0;
		expect(Sequences.generate(() => i++).limit(5).toArray()).toEqual([0, 1, 2, 3, 4])
	});

	it("repeat()", () => {
		expect(Sequences.repeat("A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		expect(Sequences.repeat([0]).limit(3).toArray()).toEqual([[0], [0], [0]])
	});

	it("empty()", () => {
		expect(Sequences.empty<any>().toArray()).toEqual([])
	});
});