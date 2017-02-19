import 'mocha'
import { expect } from 'chai'

import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'

describe('Sequences#average', () => {
	it('should be the 3 (average length)', () => {
		const result = ofArray(['A', 'BB', 'CCC', 'DDDD', 'EEEEE'])
			.average(s => s.length)
		expect(result).to.equal(3)
	})

	it('should be 0 (average of empty)', () => {
		const result = empty<string>()
			.average(s => s.length)
		expect(result).to.equal(0)
	})

	const users: Array<{ name: String, age: number }> = [
		{ name: 'Bob', age: 31 },
		{ name: 'Angela', age: 20 },
		{ name: 'Robert', age: 19 },
		{ name: 'Ed', age: 50 },
	]

	it('should be 30 (average age)', () => {
		const result = ofArray(users)
			.average(s => s.age)
		expect(result).to.equal(30)
	})

	it('should be 50000 (average of range)', () => {
		const result = range(0, 100000).average(n => n)
		expect(result).to.equal(50000)
	})

	it('should be 0 on empty', () => {
		expect(none<string>().average(s => s.length)).to.equal(0)
	})

	it('should be mapped value on non-empty', () => {
		expect(some('a').average(s => s.length)).to.equal(1)
	})
})