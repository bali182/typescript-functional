import 'mocha'
import { expect } from 'chai'
import { range, ofArray, empty, repeat, generate, ofValue, ofValues } from '../src/seq'

describe('Creating sequence', () => {
	describe('Sequences#ofArray', () => {
		it('should be [], ["A"], [1, 2, 3]', () => {
			expect(ofArray([]).toArray()).to.deep.equal([])
			expect(ofArray(['A']).toArray()).to.deep.equal(['A'])
			expect(ofArray([1, 2, 3]).toArray()).to.deep.equal([1, 2, 3])
		})
	})

	describe('Sequences#ofValues (varargs)', () => {
		it('should be [], ["A"], [1, 2, 3]', () => {
			expect(ofValues().toArray()).to.deep.equal([])
			expect(ofValues('A').toArray()).to.deep.equal(['A'])
			expect(ofValues(1, 2, 3).toArray()).to.deep.equal([1, 2, 3])
		})
	})

	describe('Sequences#ofValue', () => {
		it('should be [1]', () => {
			expect(ofValue(1).toArray()).to.deep.equal([1])
		})
	})

	describe('Sequences#range', () => {
		it('should match the limits of the ranges', () => {
			expect(range(0, 5).toArray()).to.deep.equal([0, 1, 2, 3, 4, 5])
			expect(range(0, 8, 2).toArray()).to.deep.equal([0, 2, 4, 6, 8])
			expect(range(10, 5, -2).toArray()).to.deep.equal([10, 8, 6])
			expect(range(-5, 0).toArray()).to.deep.equal([-5, -4, -3, -2, -1, 0])
		})
	})

	describe('Sequences#generate', () => {
		it('should generate an endless sequence with the given supplier, which is limited', () => {
			expect(generate(() => 'A').limit(5).toArray()).to.deep.equal(['A', 'A', 'A', 'A', 'A'])
			let i = 0
			expect(generate(() => i++).limit(5).toArray()).to.deep.equal([0, 1, 2, 3, 4])
		})
	})

	describe('Sequences#repeat', () => {
		it('should endlessly repeat the given element in a sequence, which is limited', () => {
			expect(repeat('A').limit(5).toArray()).to.deep.equal(['A', 'A', 'A', 'A', 'A'])
			expect(repeat([0]).limit(3).toArray()).to.deep.equal([[0], [0], [0]])
		})
	})

	describe('Sequences#empty', () => {
		it('should be empty', () => {
			expect(empty<any>().toArray()).to.deep.equal([])
		})
	})
})
