import 'mocha'
import { expect } from 'chai'

import { Profession, Employee } from './EmployeeModel'
import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'

describe('Sequence#contains', () => {
	it('should be false when no elements match', () => {
		const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		const seq = ofArray(values)
		values.forEach(e => expect(seq.contains(e)).to.equal(true))
	})

	it('should be -1 when the element is not there', () => {
		const seqValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		const checkValues = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
		const seq = ofArray(seqValues)
		checkValues.forEach(e => expect(seq.contains(e)).to.equal(false))
	})

	const emps: Employee[] = [
		{ name: 'A', profession: Profession.ANALYST, boss: null, salary: 1050 },
		{ name: 'B', profession: Profession.CLERK, boss: null, salary: 1000 },
		{ name: 'C', profession: Profession.MANAGER, boss: null, salary: 2000 },
		{ name: 'D', profession: Profession.PRESIDENT, boss: null, salary: 3000 },
	]

	it('should be 2 when using a custom equality comparator', () => {
		const seq = ofArray<Employee>(emps)
		const toSearch = <Employee>{ name: 'B', profession: Profession.ANALYST, boss: null, salary: 1000 }
		expect(seq.contains(toSearch, (a, b) => a.name === b.name && a.salary === b.salary)).to.equal(true)
	})

	it('should be -1 when none match using a custom equality comparator', () => {
		const seq = ofArray<Employee>(emps)
		const toSearch = <Employee>{ name: 'B', profession: Profession.ANALYST, boss: null, salary: 1000 }
		expect(seq.contains(toSearch, (a, b) => a.name === b.name && a.profession === b.profession)).to.equal(false)
	})
})
