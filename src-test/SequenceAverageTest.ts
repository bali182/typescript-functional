import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'
import { describe, it, expect } from 'jasmine'

describe('Sequences#average', () => {
	it('should be the 3 (average length)', () => {
		const result = ofArray(['A', 'BB', 'CCC', 'DDDD', 'EEEEE'])
			.average(s => s.length)
		expect(result).toBe(3)
	})

	it('should be 0 (average of empty)', () => {
		const result = empty<string>()
			.average(s => s.length)
		expect(result).toBe(0)
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
		expect(result).toBe(30)
	})

	it('should be 50000 (average of range)', () => {
		const result = range(0, 100000).average(n => n)
		expect(result).toBe(50000)
	})

	it('should be 0 on empty', () => {
		expect(none<string>().average(s => s.length)).toBe(0)
	})

	it('should be mapped value on non-empty', () => {
		expect(some('a').average(s => s.length)).toBe(1)
	})
})