/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#join", () => {
		it("should join an empty sequence", () => {
			expect(Sequences.empty<string>().join()).toBe("");
			expect(Sequences.empty<string>().join(",")).toBe("");
			expect(Sequences.empty<string>().join(",", "[")).toBe("[");
			expect(Sequences.empty<string>().join(",", "[", "]")).toBe("[]");
		});

		it("should join 1 element", () => {
			var array: Array<string> = ["A"];
			expect(Sequences.ofArray(array).join()).toBe("A");
			expect(Sequences.ofArray(array).join(",")).toBe("A");
			expect(Sequences.ofArray(array).join(",", "[")).toBe("[A");
			expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[A]");
		});

		it("should join 3 elements", () => {
			var array: Array<string> = ["A", "B", "C"];
			expect(Sequences.ofArray(array).join()).toBe("ABC");
			expect(Sequences.ofArray(array).join(",")).toBe("A,B,C");
			expect(Sequences.ofArray(array).join(",", "[")).toBe("[A,B,C");
			expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[A,B,C]");
		});

		it("should join 100000 elements", () => {
			var array = Sequences.repeat("A").limit(100000).toArray();
			expect(Sequences.ofArray(array).join()).toBe(array.join(""));
			expect(Sequences.ofArray(array).join(",")).toBe(array.join(","));
			expect(Sequences.ofArray(array).join(",", "[")).toBe("[" + array.join(","));
			expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[" + array.join(",") + "]");
		});

		it("should add prefix and suffix only, when empty", () => {
			expect(Optional.empty<any>().join()).toBe('');
			expect(Optional.empty<any>().join(',')).toBe('');
			expect(Optional.empty<any>().join(',', '[')).toBe('[');
			expect(Optional.empty<any>().join(',', '[', '}')).toBe('[}');
		});

		it("should add prefix, element, and suffix only, when non empty", () => {
			expect(Optional.of('a').join()).toBe('a');
			expect(Optional.of('a').join(',')).toBe('a');
			expect(Optional.of('a').join(',', '[')).toBe('[a');
			expect(Optional.of('a').join(',', '[', '}')).toBe('[a}');
		});
	});
}