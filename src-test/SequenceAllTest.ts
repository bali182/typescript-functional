import { range, ofArray, empty } from '../src/seq'
import { some, none } from '../src/option'
import { describe, it, expect } from 'jasmine'

describe('Sequence#all', () => {
	it('should be true, because all elements are > 0', () => {
		expect(range(0, 10).all(n => n >= 0)).toEqual(true)
	})
	it('should be false, because not all elements are even', () => {
		expect(range(0, 10).all(n => n % 2 == 0)).toEqual(false)
	})

	it('should be true, because all elements are non-empty strings', () => {
		expect(ofArray(['A', 'B', 'C', 'D', 'E']).all(s => s.length > 0)).toEqual(true)
		expect(ofArray(['A', 'B', '', 'D', 'E']).all(s => s.length > 0)).toEqual(false)
	})

	it('should be false, because not all elements are non-empty strings', () => {
		expect(ofArray(['A', 'B', '', 'D', 'E']).all(s => s.length > 0)).toEqual(false)
	})

	it('should be true, because all elements are odd', () => {
		const result = range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n + 1)
			.limit(3)
			.all(n => n % 2 != 0)
		expect(result).toEqual(true)
	})

	it('should be true, because all elements match the condition in an empty sequence', () => {
		expect(empty<any>().all(e => e === 'A')).toBe(true)
	})

	it('should be true, because the range is incremented by 2 so all elements are even', () => {
		const elements = range(2, 100000, 2).toArray()
		expect(ofArray(elements).all(n => n % 2 == 0)).toBe(true)
	})

	it('should be false, because the range is incremented by 2 so no elements are odd', () => {
		const elements = range(2, 100000, 2).toArray()
		expect(ofArray(elements).all(n => n % 2 != 0)).toBe(false)
	})

	it('should be true, on Optional#empty', () => {
		expect(none<string>().all(s => s.length > 0)).toBe(true)
	})

	it('should be true, on Optional#of, when matching', () => {
		expect(some('a').all(s => s.length > 0)).toBe(true)
	})

	it('should be false, on Optional#of, when not matching', () => {
		expect(some('').all(s => s.length > 0)).toBe(false)
	})
})
