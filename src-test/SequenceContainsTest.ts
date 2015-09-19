/// <reference path="../src/Sequences" />
/// <reference path="EmployeeModel" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#contains", () => {
		it("should be false when no elements match", () => {
			var seq = Sequences.ofArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(e => {
				expect(seq.contains(e)).toBe(true);
			});
		});
		
		it("should be -1 when the element is not there", () => {
			var seq = Sequences.ofArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			[10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(e => {
				expect(seq.contains(e)).toBe(false);
			});
		});

		var emps = [
			{ name: "A", profession: Profession.ANALYST, boss: null, salary: 1050 },
			{ name: "B", profession: Profession.CLERK, boss: null, salary: 1000 },
			{ name: "C", profession: Profession.MANAGER, boss: null, salary: 2000 },
			{ name: "D", profession: Profession.PRESIDENT, boss: null, salary: 3000 },
		];

		it("should be 2 when using a custom equality comparator", () => {
			var seq = Sequences.ofArray<Employee>(emps);
			var toSearch = <Employee> { name: "B", profession: Profession.ANALYST, boss: null, salary: 1000 };
			expect(seq.contains(toSearch, (a, b) => a.name === b.name && a.salary === b.salary)).toBe(true);
		});

		it("should be -1 when none match using a custom equality comparator", () => {
			var seq = Sequences.ofArray<Employee>(emps);
			var toSearch = <Employee> { name: "B", profession: Profession.ANALYST, boss: null, salary: 1000 };
			expect(seq.contains(toSearch, (a, b) => a.name === b.name && a.profession === b.profession)).toBe(false);
		});
	});
}