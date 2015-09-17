/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#forEach", () => {
		it("should iterate on a range", () => {
			var counter = 0;
			Sequences.range(0, 10).forEach(n => {
				expect(n).toBe(counter++);
			})
			expect(counter).toBe(11);
		});

		it("should iterate limited endless sequence", () => {
			var counter = 0
			Sequences.repeat("A").limit(3).forEach(str => {
				expect(str).toBe("A");
				counter++;
			});
			expect(counter).toBe(3);
		});

		it("should iterate on a sequence composed from an array", () => {
			var array = ["A", "B", "C"];
			var index = 0;
			Sequences.ofArray(["A", "B", "C"]).forEach(str => {
				expect(str).toBe(array[index++]);
			});
		});

		it("should iterate on a sequence composed of a single element", () => {
			Sequences.ofValue("A").forEach(str => {
				expect(str).toBe("A");
			});
		});

		it("should iterate on a sequence composed by varargs", () => {
			var array = ["A", "B", "C"];
			var index = 0;
			Sequences.ofValues("A", "B", "C").forEach(str => {
				expect(str).toBe(array[index++]);
			});
		});

		it("should(nt) iterate an empty sequence", () => {
			var sum = 0;
			Sequences.empty<number>().forEach(n => sum += n);
			expect(sum).toBe(0);
		});

		it("should correctly iterate 100000 elements", () => {
			var sum = 0;
			Sequences.repeat(1).limit(100000).forEach(n => sum += n);
			expect(sum).toBe(100000);
		});

		it("should not touch guard", () => {
			var guard = -1;
			Optional.empty<any>().forEach(e => guard = e);
			expect(guard).toBe(-1);
		});

		it("should set guard to 10", () => {
			var guard = -1;
			Optional.of(10).forEach(e => guard = e);
			expect(guard).toBe(10);
		});
	});
}