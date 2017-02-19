import { describe, it, expect } from 'jasmine'
import { maybe, some, none } from '../src/option'

describe('Optional', () => {
	it('should be present, shouldn\'t be absent, should throw no exception, and value should be "A"', () => {
		const present = some('A')
		expect(present.isPresent()).toBe(true)
		expect(present.isAbsent()).toBe(false)
		expect(present.get()).toBe('A')
	})

	it('should be absent, shouldn\'t be present, and should throw an exception (null)', () => {
		const absent = maybe(null)
		expect(absent.isAbsent()).toBe(true)
		expect(absent.isPresent()).toBe(false)
		expect(() => absent.get()).toThrow()
	})

	it('should be absent, shouldn\'t be present, and should throw an exception (undefined)', () => {
		const absent = maybe(undefined)
		expect(absent.isAbsent()).toBe(true)
		expect(absent.isPresent()).toBe(false)
		expect(() => absent.get()).toThrow()
	})

	it('should throw an exception', () => {
		expect(() => { some(null) }).toThrow()
	})

	it('should throw an exception', () => {
		expect(() => { some(undefined) }).toThrow()
	})

	it('should be the correct fallback value', () => {
		const empty1 = none<any>()
		expect(empty1.getOr('test1')).toBe('test1')

		const empty2 = maybe(null)
		expect(empty2.getOr('test2')).toBe('test2')
	})

	it('should be the correct fallback value (null)', () => {
		const empty1 = none<string>()
		expect(empty1.getOrNull()).toBe(null)

		const empty2 = maybe(null)
		expect(empty2.getOrNull()).toBe(null)
	})

	it('should be the correct fallback value (undefined)', () => {
		const empty1 = none<string>()
		expect(empty1.getOrUndefined()).toBe(undefined)

		const empty2 = maybe(null)
		expect(empty2.getOrUndefined()).toBe(undefined)
	})
})
