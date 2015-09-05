/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#zip", () => {
	it("zip something with empty", () => {
		var as = Sequences.empty<string>();
		var bs = Sequences.ofValues("B", "B", "B");

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual([]);
	});
	it("zip arrays of equal length", () => {
		var as = Sequences.ofValues("A", "A", "A");
		var bs = Sequences.ofValues("B", "B", "B");

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
	});

	it("zip arrays of different length", () => {
		var as = Sequences.ofValues("A", "A", "A", "B");
		var bs = Sequences.repeat("B").limit(2);

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual(["AB", "AB"]);
	});

	it("zip endless Sequences", () => {
		var as = Sequences.ofArray(["A", "A", "A"])
		var bs = Sequences.repeat("B")

		var zipped = as.zip(bs, (a, b) => a + b).limit(3);
		expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
	});

	it("zip something zipped", () => {
		var as = Sequences.repeat("A")
		var bs = Sequences.repeat("B")
		var cs = Sequences.repeat("C");

		var zipped = as
			.zip(bs, (a, b) => a + b)
			.zip(cs, (ab, c) => ab + c)
			.limit(3);
		expect(zipped.collect(Collectors.join())).toEqual("ABCABCABC");
	});

	it("empty", () => {
		var empty = Sequences.empty<string>()
		var bs = Sequences.repeat("B").limit(3);
		var zipped = empty.zip(bs, (a, b) => a + b).limit(3);
		expect(zipped.toArray()).toEqual([]);
	});
})