import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#last', () => {
		it('should fetch the last element from an array sequence', () => {
			expect(Sequences.ofArray(['A', 'B', 'C', 'D', 'E']).last().get()).toEqual('E')
			expect(Sequences.ofArray(['A', 'B', 'C', 'D']).last().get()).toEqual('D')
			expect(Sequences.empty().last().isAbsent()).toBe(true)
		})

		it('should fetch the last element of a sequence', () => {
			expect(Sequences.range(0, 5).last().get()).toEqual(5)
		})

		it('should fetch the last element of a limited endless sequence', () => {
			expect(Sequences.repeat('A').limit(4).last().get()).toEqual('A')
		})

		it('should be empty', () => {
			const last = Sequences.empty<string>().last()
			expect(last.isAbsent()).toBe(true)
		})

		it('should be the last element of a long range', () => {
			const last = Sequences.range(0, 100000).last()
			expect(last.isPresent()).toBe(true)
			expect(last.get()).toBe(100000)
		})

		it('should be empty on empty', () => {
			expect(Optional.empty<any>().last()).toEqual(Optional.empty<any>())
		})

		it('should be itself on non-empty', () => {
			const a = Optional.of('a')
			expect(a.last()).toEqual(a)
		})
	})
}