import 'mocha'
import { expect } from 'chai'

import { maybe, some, none } from '../src/option'

describe('Option', () => {
	it('should be present, shouldn\'t be absent, should throw no exception, and value should be "A"', () => {
		const present = some('A')
		expect(present.isPresent()).to.equal(true)
		expect(present.isAbsent()).to.equal(false)
		expect(present.get()).to.equal('A')
	})

	it('should be absent, shouldn\'t be present, and should throw an exception (null)', () => {
		const absent = maybe(null)
		expect(absent.isAbsent()).to.equal(true)
		expect(absent.isPresent()).to.equal(false)
		expect(() => absent.get()).to.throw()
	})

	it('should be absent, shouldn\'t be present, and should throw an exception (undefined)', () => {
		const absent = maybe(undefined)
		expect(absent.isAbsent()).to.equal(true)
		expect(absent.isPresent()).to.equal(false)
		expect(() => absent.get()).to.throw()
	})

	it('should be the correct fallback value', () => {
		const empty1 = none<any>()
		expect(empty1.getOr('test1')).to.equal('test1')

		const empty2 = maybe(null)
		expect(empty2.getOr('test2')).to.equal('test2')
	})

	it('should be the correct fallback value (null)', () => {
		const empty1 = none<string>()
		expect(empty1.getOrNull()).to.equal(null)

		const empty2 = maybe(null)
		expect(empty2.getOrNull()).to.equal(null)
	})

	it('should be the correct fallback value (undefined)', () => {
		const empty1 = none<string>()
		expect(empty1.getOrUndefined()).to.equal(undefined)

		const empty2 = maybe(null)
		expect(empty2.getOrUndefined()).to.equal(undefined)
	})
})
