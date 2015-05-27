/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />

describe("Streams#create", () => {
	it("ofArray()", () => {
		expect(Streams.ofArray([]).toArray()).toEqual([]);
		expect(Streams.ofArray(["A"]).toArray()).toEqual(["A"]);
		expect(Streams.ofArray([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValues()", () => {
		expect(Streams.ofValues().toArray()).toEqual([]);
		expect(Streams.ofValues("A").toArray()).toEqual(["A"]);
		expect(Streams.ofValues(1, 2, 3).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValue()", () => {
		expect(Streams.ofValue(1).toArray()).toEqual([1]);
	});

	it("range()", () => {
		expect(Streams.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4, 5]);
		expect(Streams.range(0, 8, 2).toArray()).toEqual([0, 2, 4, 6, 8]);
		expect(Streams.range(10, 5, -2).toArray()).toEqual([10, 8, 6]);
		expect(Streams.range(-5, 0).toArray()).toEqual([-5, -4, -3, -2, -1, 0]);
	});

	it("generate()", () => {
		expect(Streams.generate(() => "A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		var i = 0;
		expect(Streams.generate(() => i++).limit(5).toArray()).toEqual([0, 1, 2, 3, 4])
	});

	it("repeat()", () => {
		expect(Streams.repeat("A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		expect(Streams.repeat([0]).limit(3).toArray()).toEqual([[0], [0], [0]])
	});

	it("empty()", () => {
		expect(Streams.empty<any>().toArray()).toEqual([])
	});
});