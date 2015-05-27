/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#append", () => {
	it("Append arrays", () => {
		var first = ["A", "B"];
		var second = ["C"];
		var third = ["D", "E"];
		var complete = Streams.ofArray(first)
			.append(Streams.ofArray(second))
			.append(Streams.ofArray(third))
		expect(complete.toArray()).toEqual(["A", "B", "C", "D", "E"]);
	});

	it("Append limited endless", () => {
		var first = Streams.repeat("A").limit(2)
		var second = Streams.generate(() => "B").limit(3);
		var third = Streams.repeat("C").limit(1);
		var complete = first.append(second).append(third);
		expect(complete.toArray()).toEqual(["A", "A", "B", "B", "B", "C"]);
	});

	it("Append ranges", () => {
		var first = Streams.range(0, 3);
		var second = Streams.range(4, 5);
		var third = Streams.range(6, 10);
		var complete = first.append(second).append(third);
		expect(complete.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	});

	// Because iterators are deeply nested, this is slow, and memory consuming.
	it("Appending 1000 elements", () => {
		var appended = Streams.empty<string>();
		for (var i = 0; i < 1000; i++) {
			appended = appended.append(Streams.ofValue("A"));
		}
		expect(appended.toArray()).toEqual(Streams.repeat("A").limit(1000).toArray());
	});
});