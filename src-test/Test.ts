/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Streams#create", () => {
	it("ofArray()", () => {
		expect(Streams.ofArray([]).toArray()).toEqual([]);
		expect(Streams.ofArray(["A"]).toArray()).toEqual(["A"]);
		expect(Streams.ofArray([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValues()", () => {
		expect(Streams.ofValues().toArray()).toEqual([]);
		expect(Streams.ofValues("A").toArray()).toEqual(["A"]);
		expect(Streams.ofValues(1, 2, 3).toArray()).toEqual([1, 2, 3]);
	});

	it("ofValue()", () => {
		expect(Streams.ofValue(1).toArray()).toEqual([1]);
	});

	it("range()", () => {
		expect(Streams.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4, 5]);
		expect(Streams.range(0, 8, 2).toArray()).toEqual([0, 2, 4, 6, 8]);
		expect(Streams.range(10, 5, -2).toArray()).toEqual([10, 8, 6]);
		expect(Streams.range(-5, 0).toArray()).toEqual([-5, -4, -3, -2, -1, 0]);
	});

	it("generate()", () => {
		expect(Streams.generate(() => "A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		var i = 0;
		expect(Streams.generate(() => i++).limit(5).toArray()).toEqual([0, 1, 2, 3, 4])
	});

	it("repeat()", () => {
		expect(Streams.repeat("A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"])
		expect(Streams.repeat([0]).limit(3).toArray()).toEqual([[0], [0], [0]])
	});
});

describe("Stream#filter", () => {
	it("Filter even / odd", () => {
		expect(Streams.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 == 0).toArray()).toEqual([2, 4]);
		expect(Streams.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 != 0).toArray()).toEqual([1, 3, 5]);
	});

	it("Filter that starts with A", () => {
		expect(Streams.ofValues("Apple", "Pear", "Astronaut", "Dog").filter(s => s.charAt(0) == 'A').toArray()).toEqual(["Apple", "Astronaut"]);
	});
});

describe("Stream#map", () => {
	it("number to string", () => {
		expect(Streams.ofValues(1, 2, 3).map(n => n.toString()).toArray()).toEqual(["1", "2", "3"]);
	});

	it("parseInt", () => {
		expect(Streams.ofValues("1", "2", "3").map(s => parseInt(s)).toArray()).toEqual([1, 2, 3]);
	});
});

describe("Stream#head", () => {
	it("Head of non empty", () => {
		expect(Streams.ofValues("A").head().get()).toEqual("A");
		expect(Streams.ofValues("A").head().isPresent()).toEqual(true);
		expect(Streams.ofValues("A").head().isAbsent()).toEqual(false);

		expect(Streams.ofValues("A", "B", "C").head().get()).toEqual("A");
		expect(Streams.ofValues("A", "B", "C").head().isPresent()).toEqual(true);
		expect(Streams.ofValues("A", "B", "C").head().isAbsent()).toEqual(false);
	});

	it("Head of empty", () => {
		expect(Streams.empty().head().isPresent()).toEqual(false);
		expect(Streams.empty().head().isAbsent()).toEqual(true);
	});
})

describe("Stream complex examples", () => {
	it("Multiply", () => {
		var a = 6;
		var b = 4;
		expect(Streams.repeat(a).limit(b).reduce((x, y) => x + y, 0)).toEqual(a * b);
	});

	var users: Array<{ name: String, age: number }> = [
		{ name: "Bob", age: 31 },
		{ name: "Angela", age: 20 },
		{ name: "Robert", age: 19 },
		{ name: "Ed", age: 50 },
	];

	function createJoiner(separator: string): (a: string, b: string) => string {
		return (a, b) => a ? (a + separator + b) : b
	}

	it("Join names of older than 20", () => {
		var names = Streams.ofArray(users)
			.filter(u => u.age > 20)
			.map(u => u.name)
			.reduce(createJoiner(" and "));

		expect(names).toEqual("Bob and Ed");
	});

	it("Add the ages", () => {
		expect(Streams.ofArray(users).map(u => u.age).reduce((a, b) => a + b, 0)).toEqual(120);
	});

	it("Generate sequence of 'A' as long as the names combined", () => {
		var sequence = Streams.ofArray(users)
			.map(u => u.name)
			.map(name => name.length)
			.map(length => Streams.repeat("A").limit(length).reduce(createJoiner("")))
			.reduce(createJoiner(" "))

		expect(sequence).toEqual("AAA AAAAAA AAAAAA AA");
	});
})