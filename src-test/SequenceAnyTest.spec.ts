import 'mocha'
import { expect } from 'chai'

import { range, ofArray, empty, ofValues } from '../src/seq'
import { some, none } from '../src/option'

describe('Sequence#any', () => {
	it('should work on ranges', () => {
		expect(range(0, 10).any(n => n >= 0)).to.equal(true)
		expect(range(0, 10).any(n => n % 2 == 0)).to.equal(true)
		expect(range(0, 10).any(n => n > 10)).to.equal(false)
	})

	it('should be true, because there is a "B" among the values', () => {
		expect(ofValues('A', 'B', 'C').any(s => s === 'B')).to.equal(true)
	})

	it('should be true, becuse there is a "C" among the values', () => {
		expect(ofArray(['A', 'B', 'C']).any(s => s === 'C')).to.equal(true)
	})

	it('should be false, because no elements match the condition in an empty sequence', () => {
		expect(empty<any>().any(s => s === 'C')).to.equal(false)
	})

	it('should be true, because some elements (all) match the condition', () => {
		const elements = range(2, 100000, 2).toArray()
		expect(ofArray(elements).any(n => n % 2 == 0)).to.equal(true)
	})

	it('should be false, because none of the elements match the condition', () => {
		const elements = range(2, 100000, 2).toArray()
		expect(ofArray(elements).any(n => n % 2 != 0)).to.equal(false)
	})

	it('should be false, on Optional#empty', () => {
		expect(none<string>().any(s => s.length > 0)).to.equal(false)
	})

	it('should be true, on Optional#any, when matching', () => {
		expect(some('a').any(s => s.length > 0)).to.equal(true)
	})

	it('should be false, on Optional#any, when not matching', () => {
		expect(some('').any(s => s.length > 0)).to.equal(false)
	})
})
