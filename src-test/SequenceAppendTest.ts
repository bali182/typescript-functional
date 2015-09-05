/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#append", () => {
	it("Append arrays", () => {
		var first = ["A", "B"];
		var second = ["C"];
		var third = ["D", "E"];
		var complete = Sequences.ofArray(first)
			.append(Sequences.ofArray(second))
			.append(Sequences.ofArray(third))
		expect(complete.toArray()).toEqual(["A", "B", "C", "D", "E"]);
	});

	it("Append limited endless", () => {
		var first = Sequences.repeat("A").limit(2)
		var second = Sequences.generate(() => "B").limit(3);
		var third = Sequences.repeat("C").limit(1);
		var complete = first.append(second).append(third);
		expect(complete.toArray()).toEqual(["A", "A", "B", "B", "B", "C"]);
	});

	it("Append ranges", () => {
		var first = Sequences.range(0, 3);
		var second = Sequences.range(4, 5);
		var third = Sequences.range(6, 10);
		var complete = first.append(second).append(third);
		expect(complete.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	});

	// Because iterators are deeply nested, this is slow, and memory consuming.
	it("Appending 1000 elements", () => {
		var appended = Sequences.empty<string>();
		for (var i = 0; i < 1000; i++) {
			appended = appended.append(Sequences.ofValue("A"));
		}
		expect(appended.toArray()).toEqual(Sequences.repeat("A").limit(1000).toArray());
	});
});