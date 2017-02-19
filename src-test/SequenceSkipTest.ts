import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#skip', () => {
		it('should skip endless Sequence', () => {
			expect(Sequences.repeat('A').skip(10).limit(3).toArray()).toEqual(['A', 'A', 'A'])
			const i = 0
			expect(Sequences.generate(() => ++i).skip(3).limit(5).toArray()).toEqual([4, 5, 6, 7, 8])
		})

		it('should skip ranges', () => {
			expect(Sequences.range(0, 10).skip(8).toArray()).toEqual([8, 9, 10])
			expect(Sequences.range(0, 10, 2).skip(2).toArray()).toEqual([4, 6, 8, 10])
			expect(Sequences.range(10, 0, -2).skip(2).toArray()).toEqual([6, 4, 2, 0])
		})

		it('should limit array sequence', () => {
			expect(Sequences.ofArray(['A', 'B', 'C', 'D', 'E']).skip(3).toArray()).toEqual(['D', 'E'])
		})

		it('should limit after transformation and filter', () => {
			const result = Sequences.range(0, 10)
				.filter(n => n % 2 == 0)
				.map(n => n.toString())
				.skip(3)
				.toArray()
			expect(result).toEqual(['6', '8', '10'])
		})

		it('should(nt) skip empty', () => {
			expect(Sequences.empty<string>().skip(3).toArray()).toEqual([])
		})

		it('should be empty when skipping in empty', () => {
			expect(Optional.empty<any>().skip(1)).toEqual(Optional.empty<any>())
			expect(Optional.empty<any>().skip(5)).toEqual(Optional.empty<any>())
			expect(Optional.empty<any>().skip(1000)).toEqual(Optional.empty<any>())
		})

		it('should be empty when skipping in non empty', () => {
			expect(Optional.of('a').skip(1)).toEqual(Optional.empty<any>())
			expect(Optional.of('a').skip(100)).toEqual(Optional.empty<any>())
		})

		it('should be itself when skipping 0 in non empty', () => {
			const a = Optional.of('a')
			expect(a.skip(0)).toEqual(a)
		})

	})
}