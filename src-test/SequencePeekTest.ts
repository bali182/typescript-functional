import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#peek', () => {
		it('should peek into array Sequence', () => {
			const concatenated = ''
			const Sequence = Sequences.ofArray(['A', 'B', 'C'])
				.peek(s => concatenated += s)
				.forEach(s => { })
			expect(concatenated).toBe('ABC')
		})

		it('should peek multiple times', () => {
			const concatenated = ''
			const Sequence = Sequences.ofArray(['A', 'B', 'C'])
				.peek(s => concatenated += s)
				.peek(s => concatenated += s)
				.forEach(s => { })
			expect(concatenated).toBe('AABBCC')
		})

		it('should peek into transformed', () => {
			const concatenated = ''
			const summed = 0

			const Sequence = Sequences.ofArray(['1', '2', '3'])
				.peek(s => concatenated += s)
				.map(s => parseInt(s))
				.peek(num => summed += num)
				.forEach(s => { })
			expect(concatenated).toBe('123')
			expect(summed).toBe(6)
		})

		it('should(nt) peek into  empty', () => {
			const count = 0
			Sequences.empty<number>().peek(n => count += n).forEach(n => { })
			expect(count).toBe(0)
		})

		it('should have no effect, when used on empty', () => {
			const guard = 0
			Optional.empty<number>().peek(e => guard++)
			expect(guard).toBe(0)
		})

		// This doesn't work yet
		/* it('should work with multiple peeking on non empty', () => {
			const guard = 0
			const o = Optional.of('o')
			Sequences.range(1, 10).forEach(i => {
				o = o.peek(e => guard++)
			})
			o.forEach(e => { })
			expect(guard).toBe(10)
		}) */
	})
}