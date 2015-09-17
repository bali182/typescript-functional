/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#append", () => {
		it("should be A, B, C, D, E, when appending 3 sequences", () => {
			var first = ["A", "B"];
			var second = ["C"];
			var third = ["D", "E"];
			var complete = Sequences.ofArray(first)
				.append(Sequences.ofArray(second))
				.append(Sequences.ofArray(third))
			expect(complete.toArray()).toEqual(["A", "B", "C", "D", "E"]);
		});

		it("should b A x2, B x3, C x1 when appending 3 limited endless sequences", () => {
			var first = Sequences.repeat("A").limit(2)
			var second = Sequences.generate(() => "B").limit(3);
			var third = Sequences.repeat("C").limit(1);
			var complete = first.append(second).append(third);
			expect(complete.toArray()).toEqual(["A", "A", "B", "B", "B", "C"]);
		});

		it("should be 0 - 10 when appending 3 ranges", () => {
			var first = Sequences.range(0, 3);
			var second = Sequences.range(4, 5);
			var third = Sequences.range(6, 10);
			var complete = first.append(second).append(third);
			expect(complete.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		});
	
		// Because iterators are deeply nested, this is slow, and memory consuming.
		it("should be 1000 A-s", () => {
			var appended = Sequences.empty<string>();
			var repeat = 1000;
			for (var i = 0; i < repeat; i++) {
				appended = appended.append(Sequences.ofValue("A"));
			}
			expect(appended.toArray()).toEqual(Sequences.repeat("A").limit(repeat).toArray());
		});

		it("should be a, b, c, d, e, when appending to empty optional", () => {
			var elements = Optional.empty<string>()
				.append(Sequences.ofValue('a'))
				.append(Optional.of('b'))
				.append(Sequences.ofArray(['c']))
				.append(Sequences.ofValues('d', 'e'))
				.toArray();
			expect(elements).toEqual(["a", "b", "c", "d", "e"])
		});

		it("should be a, b, c, d, e, f when appending to a non-empty optional", () => {
			var elements = Optional.of('a')
				.append(Sequences.ofValue('b'))
				.append(Optional.of('c'))
				.append(Sequences.ofArray(['d']))
				.append(Sequences.ofValues('e', 'f'))
				.toArray();
			expect(elements).toEqual(["a", "b", "c", "d", "e", "f"])
		});
	});
}