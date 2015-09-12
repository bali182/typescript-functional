/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#skipWhile", () => {
		it("SkipWhile ranges", () => {
			expect(Sequences.range(0, 10).skipWhile(i => i < 5).toArray()).toEqual([5, 6, 7, 8, 9, 10]);
		});

		it("SkipWhile after transformation and filter", () => {
			var result = Sequences.range(0, 10)
				.filter(n => n % 2 == 0)
				.map(n => Sequences.repeat("A").limit(n).join())
				.skipWhile(s => s.length < 6)
				.toArray();
			expect(result).toEqual(["AAAAAA", "AAAAAAAA", "AAAAAAAAAA"]);
		});

		it("empty", () => {
			expect(Sequences.empty<string>().skipWhile(s => true).toArray()).toEqual([]);
		});
	});
}