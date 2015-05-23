/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#zip", () => {
	it("zip something with empty", () => {
		var as = Streams.empty<string>();
		var bs = Streams.ofValues("B", "B", "B");

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual([]);
	});
	it("zip arrays of equal length", () => {
		var as = Streams.ofValues("A", "A", "A");
		var bs = Streams.ofValues("B", "B", "B");

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
	});

	it("zip arrays of different length", () => {
		var as = Streams.ofValues("A", "A", "A", "B");
		var bs = Streams.ofValues("B", "B");

		var zipped = as.zip(bs, (a, b) => a + b);
		expect(zipped.toArray()).toEqual(["AB", "AB"]);
	});

	it("zip endless streams", () => {
		var as = Streams.repeat("A")
		var bs = Streams.repeat("B")

		var zipped = as.zip(bs, (a, b) => a + b).limit(3);
		expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
	});
	it("zip something zipped", () => {
		var as = Streams.repeat("A")
		var bs = Streams.repeat("B")
		var cs = Streams.repeat("C");

		var zipped = as.zip(bs, (a, b) => a + b).zip(cs, (ab, c) => ab + c).limit(3);
		expect(zipped.collect(Collectors.join())).toEqual("ABCABCABC");
	});
})