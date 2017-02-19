import 'mocha'
import { expect } from 'chai'

import { MappingItr } from '../src/itr/MappingItr'
import { DelegateItr } from '../src/itr/DelegateItr'
import { EmptyItr } from '../src/itr/EmptyItr'
import { ConcatenatingItr } from '../src/itr/ConcatenatingItr'
import { LimitingItr } from '../src/itr/LimitingItr'
import { SkippingItr } from '../src/itr/SkippingItr'
import { FilteringItr } from '../src/itr/FilteringItr'
import { PeekingItr } from '../src/itr/PeekingItr'
import { ArrayItr } from '../src/itr/ArrayItr'
import { RangeItr } from '../src/itr/RangeItr'
import { EndlessItr } from '../src/itr/EndlessItr'
import { ZipItr } from '../src/itr/ZipItr'

describe('Itrs', () => {
	describe('ArrayItr', () => {
		it('should have 3 items)', () => {
			const it = new ArrayItr(['A', 'B', 'C'])
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('A')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('B')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('C')
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('DelegateItr', () => {
		it('should delegate correctly to the underlyig ArrayItr', () => {
			const delegate = new ArrayItr([1, 2, 3])
			const it = new DelegateItr(delegate)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(1)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(3)
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('FilteringItr', () => {
		it('should filter the only emit even numbers', () => {
			const delegate = new ArrayItr([1, 2, 3, 4, 5])
			const it = new FilteringItr(delegate, n => n % 2 == 0)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(4)
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('MappingItr', () => {
		it('should map the elements to strings', () => {
			const delegate = new ArrayItr([1, 2, 3])
			const it = new MappingItr(delegate, n => n + ' is a string now')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('1 is a string now')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('2 is a string now')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('3 is a string now')
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('ConcatenatingItr', () => {
		it('should concatenate the 3 Itrs, and have 5 elements', () => {
			const it = new ConcatenatingItr(
				new ArrayItr([
					new ArrayItr(['A', 'B']),
					new ArrayItr(['C']),
					new ArrayItr(['D', 'E'])
				])
			)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('A')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('B')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('C')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('D')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('E')
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('RangeItr', () => {
		it('should emit the elements from 1 to 3 inclusive', () => {
			const it = new RangeItr(1, 3, 1)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(1)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(3)
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('LimitingItr', () => {
		it('should limit the endless Itr to 2 elements', () => {
			const delegate = new EndlessItr(() => 'A')
			const it = new LimitingItr(delegate, 2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('A')
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal('A')
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('SkippingItr', () => {
		it('should skip the first 2 elements, and emit 2 and 3 only', () => {
			const delegate = new ArrayItr([0, 1, 2, 3])
			const it = new SkippingItr(delegate, 2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(2)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.equal(3)
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('ZipItr', () => {
		it('should zip the 2 Itrs', () => {
			const first = new ArrayItr(['A', 'B', 'C'])
			const second = new ArrayItr([1, 2, 3])
			const it = new ZipItr(first, second)
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.deep.equal(['A', 1])
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.deep.equal(['B', 2])
			expect(it.hasNext()).to.equal(true)
			expect(it.next()).to.deep.equal(['C', 3])
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})

	describe('EmptyItr', () => {
		it('should be empty', () => {
			const it = EmptyItr.instance<any>()
			expect(it.hasNext()).to.equal(false)
			expect(() => it.next()).to.throw()
		})
	})
})
