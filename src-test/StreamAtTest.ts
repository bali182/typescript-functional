/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />

describe("Streams#at", () => {
	it("array", () => {
		var result = Streams.ofArray(["A", "B", "C"]).at(1);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe("B");
	});

	it("endless", () => {
		var index = 0;
		var result = Streams.generate(() => index++).at(5);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe(5);
	});

	it("repeat", () => {
		var result = Streams.repeat("A").at(5);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe("A");
	});

	it("range", () => {
		var result = Streams.range(1, 5).at(2);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe(3);
	});

	it("out of range", () => {
		var result = Streams.ofArray(["A", "B", "C"]).at(3);
		expect(result.isAbsent()).toBe(true);

		result = Streams.ofArray(["A", "B", "C"]).at(100);
		expect(result.isAbsent()).toBe(true);
	});

	it("empty", () => {
		var result = Streams.empty<any>().at(2);
		expect(result.isAbsent()).toBe(true);
	});

	it("At 100000 th position", () => {
		var result = Streams.repeat("A").at(100000);
		expect(result.isPresent()).toBe(true);
		expect(result.get()).toBe("A");
	});
});