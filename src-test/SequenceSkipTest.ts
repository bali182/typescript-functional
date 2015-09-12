/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#skip", () => {
		it("Skip endless Sequence", () => {
			expect(Sequences.repeat("A").skip(10).limit(3).toArray()).toEqual(["A", "A", "A"]);
			var i = 0;
			expect(Sequences.generate(() => ++i).skip(3).limit(5).toArray()).toEqual([4, 5, 6, 7, 8]);
		});

		it("Skip ranges", () => {
			expect(Sequences.range(0, 10).skip(8).toArray()).toEqual([8, 9, 10]);
			expect(Sequences.range(0, 10, 2).skip(2).toArray()).toEqual([4, 6, 8, 10]);
			expect(Sequences.range(10, 0, -2).skip(2).toArray()).toEqual([6, 4, 2, 0]);
		});

		it("Limit array", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).skip(3).toArray()).toEqual(["D", "E"]);
		});

		it("Limit after transformation and filter", () => {
			var result = Sequences.range(0, 10)
				.filter(n => n % 2 == 0)
				.map(n => n.toString())
				.skip(3)
				.toArray();
			expect(result).toEqual(["6", "8", "10"]);
		});

		it("empty", () => {
			expect(Sequences.empty<string>().skip(3).toArray()).toEqual([]);
		});
	});
}