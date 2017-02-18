/// <reference path="jasmine.d.ts" />
/// <reference path="../src/MappingItr" />
/// <reference path="../src/ConcatenatingItr" />
/// <reference path="../src/LimitingItr" />
/// <reference path="../src/SkippingItr" />
/// <reference path="../src/FilteringItr" />
/// <reference path="../src/PeekingItr" />
/// <reference path="../src/ArrayItr" />
/// <reference path="../src/RangeItr" />
/// <reference path="../src/EndlessItr" />
/// <reference path="../src/ZipItr" />

module tsf.test {
	describe("Itrs", () => {
		
		describe("ArrayItr", () => {
			it("should have 3 items)", () => {
				var Itr = new ArrayItr(["A", "B", "C"])
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("A")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("B")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("C")
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("DelegateItr", () => {
			it("should delegate correctly to the underlyig ArrayItr", () => {
				var delegate = new ArrayItr([1, 2, 3])
				var Itr = new DelegateItr(delegate)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(1)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(3)
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
	
		describe("FilteringItr", () => {
			it("should filter the only emit even numbers", () => {
				var delegate = new ArrayItr([1, 2, 3, 4, 5])
				var Itr = new FilteringItr(delegate, n => n % 2 == 0)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(4)
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("MappingItr", () => {
			it("should map the elements to strings", () => {
				var delegate = new ArrayItr([1, 2, 3])
				var Itr = new MappingItr(delegate, n => n + " is a string now")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("1 is a string now")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("2 is a string now")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("3 is a string now")
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("ConcatenatingItr", () => {
			it("should concatenate the 3 Itrs, and have 5 elements", () => {
				var Itr = new ConcatenatingItr(
					new ArrayItr([
						new ArrayItr(["A", "B"]),
						new ArrayItr(["C"]),
						new ArrayItr(["D", "E"])
					])
				)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("A")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("B")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("C")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("D")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("E")
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("RangeItr", () => {
			it("should emit the elements from 1 to 3 inclusive", () => {
				var Itr = new RangeItr(1, 3, 1)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(1)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(3)
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("LimitingItr", () => {
			it("should limit the endless Itr to 2 elements", () => {
				var delegate = new EndlessItr(() => "A")
				var Itr = new LimitingItr(delegate, 2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("A")
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual("A")
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("SkippingItr", () => {
			it("should skip the first 2 elements, and emit 2 and 3 only", () => {
				var delegate = new ArrayItr([0, 1, 2, 3])
				var Itr = new SkippingItr(delegate, 2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(2)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual(3)
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("ZipItr", () => {
			it("should zip the 2 Itrs", () => {
				var first = new ArrayItr(["A", "B", "C"])
				var second = new ArrayItr([1, 2, 3])
				var Itr = new ZipItr(first, second)
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual({ first: "A", second: 1 })
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual({ first: "B", second: 2 })
				expect(Itr.hasNext()).toEqual(true)
				expect(Itr.next()).toEqual({ first: "C", second: 3 })
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
		
		describe("EmptyItr", () => {
			it("should be empty", () => {
				var Itr = EmptyItr.instance<any>()
				expect(Itr.hasNext()).toEqual(false)
				expect(() => Itr.next()).toThrow()
			})
		})
	})
}