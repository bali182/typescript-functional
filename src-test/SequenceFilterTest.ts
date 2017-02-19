import {  } from 'jasmine.d.ts' 
import {  } from '../src/Sequences' 

module tsf.test {
	describe('Sequence#filter', () => {
		it('should filter even and odd numbers', () => {
			expect(Sequences.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 == 0).toArray()).toEqual([2, 4])
			expect(Sequences.ofValues(1, 2, 3, 4, 5).filter(n => n % 2 != 0).toArray()).toEqual([1, 3, 5])
		})

		it('should filter words, that start with an 'A'', () => {
			expect(Sequences.ofValues('Apple', 'Pear', 'Astronaut', 'Dog').filter(s => s.charAt(0) == 'A').toArray()).toEqual(['Apple', 'Astronaut'])
		})

		it('should filter empty', () => {
			expect(Sequences.empty<string>().filter(s => s.length > 0).toArray()).toEqual([])
		})

		it('should filter a large amount of elements', () => {
			const elements = Sequences.range(1, 100000).toArray()
			const even = Sequences.ofArray(elements).filter(n => n % 2 == 0).toArray()
			expect(even).toEqual(Sequences.range(2, 100000, 2).toArray())
		})

		it('should be empty on empty', () => {
			expect(Optional.empty<any>().filter(e => true)).toEqual(Optional.empty<any>())
		})

		it('should be empty on non matching filter', () => {
			expect(Optional.of('').filter(s => s.length > 0)).toEqual(Optional.empty<any>())
		})

		it('should be itself on matching filter', () => {
			const a = Optional.of('a')
			expect(a.filter(s => s.length > 0)).toEqual(a)
		})
	})
}