/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#limit", () => {
	it("Limit endless stream", () => {
		expect(Streams.repeat("A").limit(3).toArray()).toEqual(["A", "A", "A"]);
		var i = 0;
		expect(Streams.generate(() => ++i).limit(5).toArray()).toEqual([1, 2, 3, 4, 5]);
	});

	it("Limit ranges", () => {
		expect(Streams.range(0, 10).limit(3).toArray()).toEqual([0, 1, 2]);
		expect(Streams.range(0, 10, 2).limit(3).toArray()).toEqual([0, 2, 4]);
		expect(Streams.range(10, 0, -2).limit(3).toArray()).toEqual([10, 8, 6]);
	});

	it("Limit array", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).limit(3).toArray()).toEqual(["A", "B", "C"]);
	});

	it("Limit after transformation and filter", () => {
		var result = Streams.range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n.toString())
			.limit(3)
			.toArray();
		expect(result).toEqual(["0", "2", "4"]);
	});
})