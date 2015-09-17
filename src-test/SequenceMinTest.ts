/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#min", () => {
		var numComparator = (a: number, b: number) => a < b ? -1 : (a > b ? + 1 : 0);
		var strLenComparator = (a: string, b: string) => a.length < b.length ?
			-1
			: (a.length > b.length ? + 1 : 0);

		var ageComparator = (a: { name: String, age: number }, b: { name: String, age: number }) =>
			a.age < b.age ? -1 : (a.age > b.age ? + 1 : 0);

		it("should be the min numbers in range", () => {
			var result = Sequences.range(0, 10).min(numComparator);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe(0);
		});

		it("should be the min length string", () => {
			var result = Sequences.ofValues("Apple", "Orange", "Dog", "Peach", "Berry").min(strLenComparator);
			expect(result.isPresent()).toBe(true);
			expect(result.get()).toBe("Dog");
		});

		var users: Array<{ name: String, age: number }> = [
			{ name: "Bob", age: 31 },
			{ name: "Ed", age: 50 },
			{ name: "Angela", age: 20 },
			{ name: "Robert", age: 19 }
		];

		it("should be the min age person", () => {
			var result = Sequences.ofArray(users).min(ageComparator);
			expect(result.isPresent()).toBe(true);
			expect(result.get().name).toBe("Robert");
		});

		it("should be empty", () => {
			var last = Sequences.empty<string>().min(strLenComparator);
			expect(last.isAbsent()).toBe(true);
		});

		it("should be the max of 1000 elements", () => {
			var max = Sequences.range(1000, 0, -1).map(n => Sequences.repeat("A").limit(n).join()).min(strLenComparator);
			expect(max.isPresent()).toBe(true);
			expect(max.get()).toBe("");
		});
		
		it("should always be itself", () => {
			expect(Optional.empty<any>().max((a, b) => 0)).toEqual(Optional.empty<any>());

			var a = Optional.of('a');
			expect(a.max((a, b) => a.length - b.length)).toEqual(a);
		});
	});
}