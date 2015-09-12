/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#limit", () => {
		it("Limit endless Sequence", () => {
			expect(Sequences.repeat("A").limit(3).toArray()).toEqual(["A", "A", "A"]);
			var i = 0;
			expect(Sequences.generate(() => ++i).limit(5).toArray()).toEqual([1, 2, 3, 4, 5]);
		});

		it("Limit ranges", () => {
			expect(Sequences.range(0, 10).limit(3).toArray()).toEqual([0, 1, 2]);
			expect(Sequences.range(0, 10, 2).limit(3).toArray()).toEqual([0, 2, 4]);
			expect(Sequences.range(10, 0, -2).limit(3).toArray()).toEqual([10, 8, 6]);
		});

		it("Limit array", () => {
			expect(Sequences.ofArray(["A", "B", "C", "D", "E"]).limit(3).toArray()).toEqual(["A", "B", "C"]);
		});

		it("Limit after transformation and filter", () => {
			var result = Sequences.range(0, 20)
				.filter(n => n % 2 == 0)
				.map(n => n.toString())
				.limit(3)
				.toArray();
			expect(result).toEqual(["0", "2", "4"]);
		});

		it("empty", () => {
			expect(Sequences.empty<any>().limit(3).toArray()).toEqual([]);
		});

		it("limit of 100000 elements", () => {
			var joined = Sequences.repeat("A").limit(100000).join();
			var reference = "";
			for (var i = 0; i < 100000; i++) {
				reference += "A";
			}
			expect(joined).toBe(reference);
		});
	});
}