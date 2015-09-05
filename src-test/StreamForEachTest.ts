/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Stream#forEach", () => {
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
})