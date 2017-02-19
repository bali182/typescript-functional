import 'mocha'
import { expect } from 'chai'

import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'

describe('Sequences#at', () => {
	it('should be present & B', () => {
		const result = ofArray(['A', 'B', 'C']).at(1)
		expect(result.isPresent()).to.equal(true)
		expect(result.get()).to.equal('B')
	})

	it('should be present & 5', () => {
		let index = 0
		const result = generate(() => index++).at(5)
		expect(result.isPresent()).to.equal(true)
		expect(result.get()).to.equal(5)
	})

	it('should be present & A', () => {
		const result = repeat('A').at(5)
		expect(result.isPresent()).to.equal(true)
		expect(result.get()).to.equal('A')
	})

	it('should be present & 3', () => {
		const result = range(1, 5).at(2)
		expect(result.isPresent()).to.equal(true)
		expect(result.get()).to.equal(3)
	})

	it('should be absent, because index is out of range', () => {
		const result = ofArray(['A', 'B', 'C']).at(3)
		expect(result.isAbsent()).to.equal(true)

		const result2 = ofArray(['A', 'B', 'C']).at(100)
		expect(result2.isAbsent()).to.equal(true)
	})

	it('should be absent', () => {
		const result = empty().at(2)
		expect(result.isAbsent()).to.equal(true)
	})

	it('should be present & A', () => {
		const result = repeat('A').at(100000)
		expect(result.isPresent()).to.equal(true)
		expect(result.get()).to.equal('A')
	})

	it('should be empty on Optional#empty', () => {
		expect(none().at(0)).to.equal(none())
		expect(none().at(100)).to.equal(none())
	})

	it('should be empty on Optional#of with index higher, than 0', () => {
		expect(some('a').at(3)).to.equal(none())
		expect(some('a').at(100)).to.equal(none())
	})

	it('should be itself on Optional#of with index 0', () => {
		const a = some('a')
		expect(a.at(0)).to.equal(a)
	})
})
