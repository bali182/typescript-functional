import {  } from '../src/Sequences' 
import {  } from 'EmployeeModel' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#indeOf', () => {
		it('should be the same as the array's current element', () => {
			const seq = Sequences.ofArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(e => {
				expect(seq.indexOf(e).get()).toBe(e)
			})
		})

		it('should be -1 when the element is not there', () => {
			const seq = Sequences.ofArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
			[10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(e => {
				expect(seq.indexOf(e)).toBe(Optional.empty())
			})
		})

		const emps = [
			{ name: 'A', profession: Profession.ANALYST, boss: null, salary: 1050 },
			{ name: 'B', profession: Profession.CLERK, boss: null, salary: 1000 },
			{ name: 'C', profession: Profession.MANAGER, boss: null, salary: 2000 },
			{ name: 'D', profession: Profession.PRESIDENT, boss: null, salary: 3000 },
		]

		it('should be 2 when using a custom equality comparator', () => {
			const seq = Sequences.ofArray<Employee>(emps)
			const toSearch = <Employee> { name: 'B', profession: Profession.ANALYST, boss: null, salary: 1000 }
			expect(seq.indexOf(toSearch, (a, b) => a.name === b.name && a.salary === b.salary).get()).toBe(1)
		})

		it('should be -1 when none match using a custom equality comparator', () => {
			const seq = Sequences.ofArray<Employee>(emps)
			const toSearch = <Employee> { name: 'B', profession: Profession.ANALYST, boss: null, salary: 1000 }
			expect(seq.indexOf(toSearch, (a, b) => a.name === b.name && a.profession === b.profession)).toBe(Optional.empty())
		})
	})
}