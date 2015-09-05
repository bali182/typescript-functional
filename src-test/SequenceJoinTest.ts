/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#join", () => {
	it("join empty", () => {
		expect(Sequences.empty<string>().join()).toBe("");
		expect(Sequences.empty<string>().join(",")).toBe("");
		expect(Sequences.empty<string>().join(",", "[")).toBe("[");
		expect(Sequences.empty<string>().join(",", "[", "]")).toBe("[]");
	});

	it("join 1 element", () => {
		var array: Array<string> = ["A"];
		expect(Sequences.ofArray(array).join()).toBe("A");
		expect(Sequences.ofArray(array).join(",")).toBe("A");
		expect(Sequences.ofArray(array).join(",", "[")).toBe("[A");
		expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[A]");
	});

	it("join 3 elements", () => {
		var array: Array<string> = ["A", "B", "C"];
		expect(Sequences.ofArray(array).join()).toBe("ABC");
		expect(Sequences.ofArray(array).join(",")).toBe("A,B,C");
		expect(Sequences.ofArray(array).join(",", "[")).toBe("[A,B,C");
		expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[A,B,C]");
	});

	it("join 100000 elements", () => {
		var array = Sequences.repeat("A").limit(100000).toArray();
		expect(Sequences.ofArray(array).join()).toBe(array.join(""));
		expect(Sequences.ofArray(array).join(",")).toBe(array.join(","));
		expect(Sequences.ofArray(array).join(",", "[")).toBe("[" + array.join(","));
		expect(Sequences.ofArray(array).join(",", "[", "]")).toBe("[" + array.join(",") + "]");
	})
})