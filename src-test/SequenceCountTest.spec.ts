import 'mocha'
import { expect } from 'chai'

import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'
import { some, none } from '../src/option'

describe('Sequence#count', () => {
	it('should be 11, 6, 6 on ranges', () => {
		expect(range(0, 10).count()).to.equal(11)
		expect(range(0, 10, 2).count()).to.equal(6)
		expect(range(10, 0, -2).count()).to.equal(6)
	})

	it('should be 5 on an array sequence', () => {
		expect(ofArray(['A', 'B', 'C', 'D', 'E']).count()).to.equal(5)
	})

	it('should be 6 on a filtered sequence', () => {
		expect(ofValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).filter(n => n % 2 == 0).count()).to.equal(6)
	})

	it('should be 10 & 5 on a mapped sequence', () => {
		expect(range(1, 10).map(s => s.toString()).count()).to.equal(10)
		expect(ofValues(1, 2, 3, 4, 5).map(n => n.toString()).count()).to.equal(5)
	})

	it('should be 6 on a skipped & limited sequence', () => {
		expect(range(1, 10).skip(2).limit(6).count()).to.equal(6)
	})

	it('should be 0 on an empty sequence', () => {
		expect(empty<any>().count()).to.equal(0)
	})

	it('should be 2 after heavy transformation', () => {
		const result = range(0, 20)
			.filter(n => n % 2 == 0)
			.map(n => n.toString())
			.limit(3)
			.skip(1)
			.count()
		expect(result).to.equal(2)
	})

	it('should be 100000 on long range', () => {
		const result = range(1, 100000).count()
		expect(result).to.equal(100000)
	})

	it('should be 0 on empty', () => {
		expect(none().count()).to.equal(0)
	})

	it('should be 1 on non empty', () => {
		expect(some('a').count()).to.equal(1)
	})
})