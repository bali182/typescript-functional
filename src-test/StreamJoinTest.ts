/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#join", () => {
	it("join empty", () => {
		expect(Streams.empty<string>().join()).toBe("");
		expect(Streams.empty<string>().join(",")).toBe("");
		expect(Streams.empty<string>().join(",", "[")).toBe("[");
		expect(Streams.empty<string>().join(",", "[", "]")).toBe("[]");
	});

	it("join 1 element", () => {
		var array: Array<string> = ["A"];
		expect(Streams.ofArray(array).join()).toBe("A");
		expect(Streams.ofArray(array).join(",")).toBe("A");
		expect(Streams.ofArray(array).join(",", "[")).toBe("[A");
		expect(Streams.ofArray(array).join(",", "[", "]")).toBe("[A]");
	});

	it("join 3 elements", () => {
		var array: Array<string> = ["A", "B", "C"];
		expect(Streams.ofArray(array).join()).toBe("ABC");
		expect(Streams.ofArray(array).join(",")).toBe("A,B,C");
		expect(Streams.ofArray(array).join(",", "[")).toBe("[A,B,C");
		expect(Streams.ofArray(array).join(",", "[", "]")).toBe("[A,B,C]");
	});

	it("join 100000 elements", () => {
		var array = Streams.repeat("A").limit(100000).toArray();
		expect(Streams.ofArray(array).join()).toBe(array.join(""));
		expect(Streams.ofArray(array).join(",")).toBe(array.join(","));
		expect(Streams.ofArray(array).join(",", "[")).toBe("[" + array.join(","));
		expect(Streams.ofArray(array).join(",", "[", "]")).toBe("[" + array.join(",") + "]");
	})
})