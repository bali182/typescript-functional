/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#zip", () => {
		it("should be empty, when zipping something with empty", () => {
			var as = Sequences.empty<string>();
			var bs = Sequences.ofValues("B", "B", "B");

			var zipped = as.zip(bs, (a, b) => a + b);
			expect(zipped.toArray()).toEqual([]);
		});
		it("should be equal length result, when zipping array sequences of equal length", () => {
			var as = Sequences.ofValues("A", "A", "A");
			var bs = Sequences.ofValues("B", "B", "B");

			var zipped = as.zip(bs, (a, b) => a + b);
			expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
		});

		it("should be the length of the shorter, when zipping arrays of different length", () => {
			var as = Sequences.ofValues("A", "A", "A", "B");
			var bs = Sequences.repeat("B").limit(2);

			var zipped = as.zip(bs, (a, b) => a + b);
			expect(zipped.toArray()).toEqual(["AB", "AB"]);
		});

		it("should zip endless sequences", () => {
			var as = Sequences.ofArray(["A", "A", "A"])
			var bs = Sequences.repeat("B")

			var zipped = as.zip(bs, (a, b) => a + b).limit(3);
			expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
		});

		it("should zip something zipped", () => {
			var as = Sequences.repeat("A")
			var bs = Sequences.repeat("B")
			var cs = Sequences.repeat("C");

			var zipped = as
				.zip(bs, (a, b) => a + b)
				.zip(cs, (ab, c) => ab + c)
				.limit(3);
			expect(zipped.join()).toEqual("ABCABCABC");
		});

		it("should(nt) zip empty", () => {
			var empty = Sequences.empty<string>()
			var bs = Sequences.repeat("B").limit(3);
			var zipped = empty.zip(bs, (a, b) => a + b).limit(3);
			expect(zipped.toArray()).toEqual([]);
		});

		it("should be empty when one Optional is empty", () => {
			var empty = Optional.empty<string>();
			var bs = Sequences.repeat("B").limit(3);
			var zipped = empty.zip(bs, (a, b) => a + b);
			expect(zipped).toEqual(Optional.empty<string>());
		});

		it("should be a single value when none is empty", () => {
			var a = Optional.of('A');
			var b = Optional.of('B');
			var zipped = a.zip(b, (letterA, letterB) => letterA + letterB);
			expect(zipped.get()).toEqual('AB');
		});
	});
}