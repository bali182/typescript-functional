/// <reference path="jasmine.d.ts" />
/// <reference path="../src/Sequences" />

module tsf.test {
	describe("Sequences#at", () => {
		it("array", () => {
			var result = Sequences.ofArray(["A", "B", "C"]).at(1);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe("B");
		});

		it("endless", () => {
			var index = 0;
			var result = Sequences.generate(() => index++).at(5);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe(5);
		});

		it("repeat", () => {
			var result = Sequences.repeat("A").at(5);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe("A");
		});

		it("range", () => {
			var result = Sequences.range(1, 5).at(2);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe(3);
		});

		it("out of range", () => {
			var result = Sequences.ofArray(["A", "B", "C"]).at(3);
			expect(result.isAbsent()).toBe(true);

			result = Sequences.ofArray(["A", "B", "C"]).at(100);
			expect(result.isAbsent()).toBe(true);
		});

		it("empty", () => {
			var result = Sequences.empty<any>().at(2);
			expect(result.isAbsent()).toBe(true);
		});

		it("At 100000 th position", () => {
			var result = Sequences.repeat("A").at(100000);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe("A");
		});

		it("should be empty on Optional#empty", () => {
			expect(Optional.empty<any>().at(0)).toEqual(Optional.empty<any>());
			expect(Optional.empty<any>().at(100)).toEqual(Optional.empty<any>());
		});

		it("should be empty on Optional#of with index higher, than 0", () => {
			expect(Optional.of('a').at(3)).toEqual(Optional.empty<any>());
			expect(Optional.of('a').at(100)).toEqual(Optional.empty<any>());
		});

		it("should be itself on Optional#of with index 0", () => {
			var a = Optional.of('a');
			expect(a.at(0)).toEqual(a);
		});
	});
}