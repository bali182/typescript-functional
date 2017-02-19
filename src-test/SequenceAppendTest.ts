import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'
import { describe, it, expect } from 'jasmine'

describe('Sequence#append', () => {
	it('should be A, B, C, D, E, when appending 3 sequences', () => {
		const first = ['A', 'B']
		const second = ['C']
		const third = ['D', 'E']
		const complete = ofArray(first)
			.append(ofArray(second))
			.append(ofArray(third))
		expect(complete.toArray()).toEqual(['A', 'B', 'C', 'D', 'E'])
	})

	it('should b A x2, B x3, C x1 when appending 3 limited endless sequences', () => {
		const first = repeat('A').limit(2)
		const second = generate(() => 'B').limit(3)
		const third = repeat('C').limit(1)
		const complete = first.append(second).append(third)
		expect(complete.toArray()).toEqual(['A', 'A', 'B', 'B', 'B', 'C'])
	})

	it('should be 0 - 10 when appending 3 ranges', () => {
		const first = range(0, 3)
		const second = range(4, 5)
		const third = range(6, 10)
		const complete = first.append(second).append(third)
		expect(complete.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	})

	// Because Itrs are deeply nested, this is slow, and memory consuming.
	it('should be 1000 A-s', () => {
		let appended = empty<string>()
		const repeats = 1000
		for (let i = 0; i < repeats; i++) {
			appended = appended.append(ofValue('A'))
		}
		expect(appended.toArray()).toEqual(repeat('A').limit(repeats).toArray())
	})

	it('should be a, b, c, d, e, when appending to empty optional', () => {
		const elements = none<string>()
			.append(ofValue('a'))
			.append(some('b'))
			.append(ofArray(['c']))
			.append(ofValues('d', 'e'))
			.toArray()
		expect(elements).toEqual(['a', 'b', 'c', 'd', 'e'])
	})

	it('should be a, b, c, d, e, f when appending to a non-empty optional', () => {
		const elements = some('a')
			.append(ofValue('b'))
			.append(some('c'))
			.append(ofArray(['d']))
			.append(ofValues('e', 'f'))
			.toArray()
		expect(elements).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
	})
})