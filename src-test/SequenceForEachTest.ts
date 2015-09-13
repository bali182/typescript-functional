/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#forEach", () => {
		it("Range", () => {
			var counter = 0;
			Sequences.range(0, 10).forEach(n => {
				expect(n).toBe(counter++);
			})
			expect(counter).toBe(11);
		});

		it("Endless", () => {
			var counter = 0
			Sequences.repeat("A").limit(3).forEach(str => {
				expect(str).toBe("A");
				counter++;
			});
			expect(counter).toBe(3);
		});

		it("Array", () => {
			var array = ["A", "B", "C"];
			var index = 0;
			Sequences.ofArray(["A", "B", "C"]).forEach(str => {
				expect(str).toBe(array[index++]);
			});
		});

		it("Value", () => {
			Sequences.ofValue("A").forEach(str => {
				expect(str).toBe("A");
			});
		});

		it("Values", () => {
			var array = ["A", "B", "C"];
			var index = 0;
			Sequences.ofValues("A", "B", "C").forEach(str => {
				expect(str).toBe(array[index++]);
			});
		});

		it("empty", () => {
			var sum = 0;
			Sequences.empty<number>().forEach(n => sum += n);
			expect(sum).toBe(0);
		});

		it("forEach 100000 elements", () => {
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