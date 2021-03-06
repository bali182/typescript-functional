import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#limit', () => {
		it('should limit and endless Sequence', () => {
			expect(Sequences.repeat('A').limit(3).toArray()).toEqual(['A', 'A', 'A'])
			const i = 0
			expect(Sequences.generate(() => ++i).limit(5).toArray()).toEqual([1, 2, 3, 4, 5])
		})

		it('should imit ranges', () => {
			expect(Sequences.range(0, 10).limit(3).toArray()).toEqual([0, 1, 2])
			expect(Sequences.range(0, 10, 2).limit(3).toArray()).toEqual([0, 2, 4])
			expect(Sequences.range(10, 0, -2).limit(3).toArray()).toEqual([10, 8, 6])
		})

		it('should limit array', () => {
			expect(Sequences.ofArray(['A', 'B', 'C', 'D', 'E']).limit(3).toArray()).toEqual(['A', 'B', 'C'])
		})

		it('should limit after transformation and filter', () => {
			const result = Sequences.range(0, 20)
				.filter(n => n % 2 == 0)
				.map(n => n.toString())
				.limit(3)
				.toArray()
			expect(result).toEqual(['0', '2', '4'])
		})

		it('should(nt) limit empty', () => {
			expect(Sequences.empty<any>().limit(3).toArray()).toEqual([])
		})

		it('should limit of 100000 elements', () => {
			const joined = Sequences.repeat('A').limit(100000).join()
			const reference = ''
			for (const i = 0 i < 100000 i++) {
				reference += 'A'
			}
			expect(joined).toBe(reference)
		})

		it('should be empty on empty', () => {
			expect(Optional.empty<any>().limit(4)).toEqual(Optional.empty<any>())
		})

		it('should be empty on limiting non-empty to 0', () => {
			expect(Optional.of('a').limit(0)).toEqual(Optional.empty<any>())
		})

		it('should be itself on limiting non-empty to > 0', () => {
			const a = Optional.of('a')
			expect(a.limit(1)).toEqual(a)
			expect(a.limit(100)).toEqual(a)
		})
	})
}