/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#last", () => {
		it("Array last", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).last().get()).toEqual("E");
			expect(Sequences.ofArray(["A", "B", "C", "D"]).last().get()).toEqual("D");
			expect(Sequences.empty().last().isAbsent()).toBe(true);
		});

		it("Range", () => {
			expect(Sequences.range(0, 5).last().get()).toEqual(5);
		});

		it("Repeat & limit", () => {
			expect(Sequences.repeat("A").limit(4).last().get()).toEqual("A");
		});

		it("empty", () => {
			var last = Sequences.empty<string>().last();
			expect(last.isAbsent()).toBe(true);
		});

		it("last of 100000 elements", () => {
			var last = Sequences.range(0, 100000).last();
			expect(last.isPresent()).toBe(true);
			expect(last.get()).toBe(100000);
		});

		it("should be empty on empty", () => {
			expect(Optional.empty<any>().last()).toEqual(Optional.empty<any>());
		});

		it("should be itself on non-empty", () => {
			var a = Optional.of('a');
			expect(a.last()).toEqual(a);
		});
	});
}