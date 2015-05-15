/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#skip", () => {
	it("Skip endless stream", () => {
		expect(Streams.repeat("A").skip(10).limit(3).toArray()).toEqual(["A", "A", "A"]);
		var i = 0;
		expect(Streams.generate(() => ++i).skip(3).limit(5).toArray()).toEqual([4, 5, 6, 7, 8]);
	});

	it("Skip ranges", () => {
		expect(Streams.range(0, 10).skip(8).toArray()).toEqual([8, 9, 10]);
		expect(Streams.range(0, 10, 2).skip(2).toArray()).toEqual([4, 6, 8, 10]);
		expect(Streams.range(10, 0, -2).skip(2).toArray()).toEqual([6, 4, 2, 0]);
	});

	it("Limit array", () => {
		expect(Streams.ofArray(["A", "B", "C", "D", "E"]).skip(3).toArray()).toEqual(["D", "E"]);
	});

	it("Limit after transformation and filter", () => {
		var result = Streams.range(0, 10)
			.filter(n => n % 2 == 0)
			.map(n => n.toString())
			.skip(3)
			.toArray();
		expect(result).toEqual(["6", "8", "10"]);
	});
})