import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#zip', () => {
		it('should be empty, when zipping something with empty', () => {
			const as = Sequences.empty<string>()
			const bs = Sequences.ofValues('B', 'B', 'B')

			const zipped = as.zip(bs, (a, b) => a + b)
			expect(zipped.toArray()).toEqual([])
		})
		it('should be equal length result, when zipping array sequences of equal length', () => {
			const as = Sequences.ofValues('A', 'A', 'A')
			const bs = Sequences.ofValues('B', 'B', 'B')

			const zipped = as.zip(bs, (a, b) => a + b)
			expect(zipped.toArray()).toEqual(['AB', 'AB', 'AB'])
		})

		it('should be the length of the shorter, when zipping arrays of different length', () => {
			const as = Sequences.ofValues('A', 'A', 'A', 'B')
			const bs = Sequences.repeat('B').limit(2)

			const zipped = as.zip(bs, (a, b) => a + b)
			expect(zipped.toArray()).toEqual(['AB', 'AB'])
		})

		it('should zip endless sequences', () => {
			const as = Sequences.ofArray(['A', 'A', 'A'])
			const bs = Sequences.repeat('B')

			const zipped = as.zip(bs, (a, b) => a + b).limit(3)
			expect(zipped.toArray()).toEqual(['AB', 'AB', 'AB'])
		})

		it('should zip something zipped', () => {
			const as = Sequences.repeat('A')
			const bs = Sequences.repeat('B')
			const cs = Sequences.repeat('C')

			const zipped = as
				.zip(bs, (a, b) => a + b)
				.zip(cs, (ab, c) => ab + c)
				.limit(3)
			expect(zipped.join()).toEqual('ABCABCABC')
		})

		it('should(nt) zip empty', () => {
			const empty = Sequences.empty<string>()
			const bs = Sequences.repeat('B').limit(3)
			const zipped = empty.zip(bs, (a, b) => a + b).limit(3)
			expect(zipped.toArray()).toEqual([])
		})

		it('should be empty when one Optional is empty', () => {
			const empty = Optional.empty<string>()
			const bs = Sequences.repeat('B').limit(3)
			const zipped = empty.zip(bs, (a, b) => a + b)
			expect(zipped).toEqual(Optional.empty<string>())
		})

		it('should be a single value when none is empty', () => {
			const a = Optional.of('A')
			const b = Optional.of('B')
			const zipped = a.zip(b, (letterA, letterB) => letterA + letterB)
			expect(zipped.get()).toEqual('AB')
		})
	})
}