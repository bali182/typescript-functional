/// <reference path="jasmine.d.ts" />
/// <reference path="../src/MappingIterator" />
/// <reference path="../src/ConcatenatingIterator" />
/// <reference path="../src/LimitingIterator" />
/// <reference path="../src/SkippingIterator" />
/// <reference path="../src/FilteringIterator" />
/// <reference path="../src/PeekingIterator" />
/// <reference path="../src/ArrayIterator" />

describe("Iterators", () => {
	it("ArrayIterator)", () => {
		var iterator = new ArrayIterator(["A", "B", "C"]);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("A");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("B");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("C");
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("DelegateIterator", () => {
		var delegate = new ArrayIterator([1, 2, 3]);
		var iterator = new DelegateIterator(delegate);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(1);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(3);
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("FilteringIterator", () => {
		var delegate = new ArrayIterator([1, 2, 3, 4, 5]);
		var iterator = new FilteringIterator(delegate, n => n % 2 == 0);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(4);
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("MappingIterator", () => {
		var delegate = new ArrayIterator([1, 2, 3]);
		var iterator = new MappingIterator(delegate, n => n + " is a string now");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("1 is a string now");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("2 is a string now");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("3 is a string now");
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("ConcatenatingIterator", () => {
		var iterator = new ConcatenatingIterator(
			new ArrayIterator([
				new ArrayIterator(["A", "B"]),
				new ArrayIterator(["C"]),
				new ArrayIterator(["D", "E"])
			]
				)
			);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("A");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("B");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("C");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("D");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("E");
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("RangeIterator", () => {
		var iterator = new RangeIterator(1, 3, 1);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(1);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(3);
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("LimitingIterator", () => {
		var delegate = new EndlessIterator(() => "A");
		var iterator = new LimitingIterator(delegate, 2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("A");
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual("A");
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("SkippingIterator", () => {
		var delegate = new ArrayIterator([0, 1, 2, 3]);
		var iterator = new SkippingIterator(delegate, 2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(2);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual(3);
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("ZippingIterator", () => {
		var first = new ArrayIterator(["A", "B", "C"]);
		var second = new ArrayIterator([1, 2, 3]);
		var iterator = new ZipIterator(first, second);
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual({ first: "A", second: 1 });
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual({ first: "B", second: 2 });
		expect(iterator.hasNext()).toEqual(true);
		expect(iterator.next()).toEqual({ first: "C", second: 3 });
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});

	it("EmptyIterator", () => {
		var iterator = EmptyIterator.instance<any>()
		expect(iterator.hasNext()).toEqual(false);
		expect(() => iterator.next()).toThrow();
	});
});