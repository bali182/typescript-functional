/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Sequence#peek", () => {
	it("peek into array Sequence", () => {
		var concatenated = "";
		var Sequence = Sequences.ofArray(["A", "B", "C"])
			.peek(s => concatenated += s)
			.forEach(s => { });
		expect(concatenated).toBe("ABC");
	});

	it("peek multiple times", () => {
		var concatenated = "";
		var Sequence = Sequences.ofArray(["A", "B", "C"])
			.peek(s => concatenated += s)
			.peek(s => concatenated += s)
			.forEach(s => { });
		expect(concatenated).toBe("AABBCC");
	});

	it("peek into transformed", () => {
		var concatenated = "";
		var summed = 0;

		var Sequence = Sequences.ofArray(["1", "2", "3"])
			.peek(s => concatenated += s)
			.map(s => parseInt(s))
			.peek(num => summed += num)
			.forEach(s => { });
		expect(concatenated).toBe("123");
		expect(summed).toBe(6);
	});

	it("empty", () => {
		var count = 0;
		Sequences.empty<number>().peek(n => count += n).forEach(n => { });
		expect(count).toBe(0);
	});
})