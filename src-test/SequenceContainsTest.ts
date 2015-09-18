/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#contains", () => {
		it("should be false when no elements match", () => {
			var seq = Sequences.ofArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(e => {
				expect(seq.contains(e)).toBe(true);
			});
		});
	});
}