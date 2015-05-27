/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#forEach", () => {
	it("Range", () => {
		var counter = 0;
		Streams.range(0, 10).forEach(n => {
			expect(n).toBe(counter++);
		})
		expect(counter).toBe(11);
	});

	it("Endless", () => {
		var counter = 0
		Streams.repeat("A").limit(3).forEach(str => {
			expect(str).toBe("A");
			counter++;
		});
		expect(counter).toBe(3);
	});

	it("Array", () => {
		var array = ["A", "B", "C"];
		var index = 0;
		Streams.ofArray(["A", "B", "C"]).forEach(str => {
			expect(str).toBe(array[index++]);
		});
	});

	it("Value", () => {
		Streams.ofValue("A").forEach(str => {
			expect(str).toBe("A");
		});
	});

	it("Values", () => {
		var array = ["A", "B", "C"];
		var index = 0;
		Streams.ofValues("A", "B", "C").forEach(str => {
			expect(str).toBe(array[index++]);
		});
	});

	it("empty", () => {
		var sum = 0;
		Streams.empty<number>().forEach(n => sum += n);
		expect(sum).toBe(0);
	});

	it("forEach 100000 elements", () => {
		var sum = 0;
		Streams.repeat(1).limit(100000).forEach(n => sum += n);
		expect(sum).toBe(100000);
	});
})