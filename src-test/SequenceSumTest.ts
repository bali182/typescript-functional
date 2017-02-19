import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#sum', () => {
		it('should sum a range', () => {
			const sum = Sequences.range(1, 3).sum(n => n)
			expect(sum).toBe(6)
		})

		it('should sum the length of strings', () => {
			const sum = Sequences.ofValues('', 'A', 'BB', 'CCC', '', 'D')
				.sum(s => s.length)
			expect(sum).toBe(7)
		})

		it('should sum the length of strings', () => {
			const sum = Sequences.ofValues('', 'A', 'BB', 'CCC', '', 'D')
				.sum(s => s.length)
			expect(sum).toBe(7)
		})

		const users: Array<{ name: String, age: number }> = [
			{ name: 'Bob', age: 31 },
			{ name: 'Ed', age: 50 },
			{ name: 'Angela', age: 20 },
			{ name: 'Robert', age: 19 }
		]

		it('should sum the ages of people', () => {
			const sum = Sequences.ofArray(users)
				.sum(s => s.age)
			expect(sum).toBe(120)
		})

		it('should(nt) sum empty', () => {
			const sum = Sequences.empty<number>().sum(n => n)
			expect(sum).toBe(0)
		})

		it('should be 0 when empty', () => {
			expect(Optional.empty<any>().sum(e => 100)).toBe(0)
		})

		it('should be the mapped value when non-empty', () => {
			expect(Optional.of('test').sum(e => e.length)).toBe(4)
		})
	})
}