/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#peek", () => {
	it("peek into array stream", () => {
		var concatenated = "";
		var stream = Streams.ofArray(["A", "B", "C"])
			.peek(s => concatenated += s)
			.forEach(s => { });
		expect(concatenated).toBe("ABC");
	});

	it("peek multiple times", () => {
		var concatenated = "";
		var stream = Streams.ofArray(["A", "B", "C"])
			.peek(s => concatenated += s)
			.peek(s => concatenated += s)
			.forEach(s => { });
		expect(concatenated).toBe("AABBCC");
	});

	it("peek into transformed", () => {
		var concatenated = "";
		var summed = 0;

		var stream = Streams.ofArray(["1", "2", "3"])
			.peek(s => concatenated += s)
			.map(s => parseInt(s))
			.peek(num => summed += num)
			.forEach(s => { });
		expect(concatenated).toBe("123");
		expect(summed).toBe(6);
	});
})