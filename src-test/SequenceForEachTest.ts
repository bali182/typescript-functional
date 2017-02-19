import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#forEach', () => {
		it('should iterate on a range', () => {
			const counter = 0
			Sequences.range(0, 10).forEach(n => {
				expect(n).toBe(counter++)
			})
			expect(counter).toBe(11)
		})

		it('should iterate limited endless sequence', () => {
			const counter = 0
			Sequences.repeat('A').limit(3).forEach(str => {
				expect(str).toBe('A')
				counter++
			})
			expect(counter).toBe(3)
		})

		it('should iterate on a sequence composed from an array', () => {
			const array = ['A', 'B', 'C']
			const index = 0
			Sequences.ofArray(['A', 'B', 'C']).forEach(str => {
				expect(str).toBe(array[index++])
			})
		})

		it('should iterate on a sequence composed of a single element', () => {
			Sequences.ofValue('A').forEach(str => {
				expect(str).toBe('A')
			})
		})

		it('should iterate on a sequence composed by varargs', () => {
			const array = ['A', 'B', 'C']
			const index = 0
			Sequences.ofValues('A', 'B', 'C').forEach(str => {
				expect(str).toBe(array[index++])
			})
		})

		it('should(nt) iterate an empty sequence', () => {
			const sum = 0
			Sequences.empty<number>().forEach(n => sum += n)
			expect(sum).toBe(0)
		})

		it('should correctly iterate 100000 elements', () => {
			const sum = 0
			Sequences.repeat(1).limit(100000).forEach(n => sum += n)
			expect(sum).toBe(100000)
		})

		it('should not touch guard', () => {
			const guard = -1
			Optional.empty<any>().forEach(e => guard = e)
			expect(guard).toBe(-1)
		})

		it('should set guard to 10', () => {
			const guard = -1
			Optional.of(10).forEach(e => guard = e)
			expect(guard).toBe(10)
		})
	})
}