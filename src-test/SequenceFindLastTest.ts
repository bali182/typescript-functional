import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#findLast', () => {
		const users: Array<{ name: String, age: number, children: number }> = [
			{ name: 'Angela', age: 20, children: 1 },
			{ name: 'Robert', age: 19, children: 0 },
			{ name: 'Bob', age: 31, children: 2 },
			{ name: 'Ed', age: 50, children: 5 },
		]

		it('should find the last adult', () => {
			const result = Sequences.ofArray(users).findLast(u => u.age >= 21)
			expect(result.isPresent()).toBe(true)
			expect(result.get().name).toBe('Ed')
		})

		it('should find the last even number', () => {
			const result = Sequences.ofValues(1, 3, 5, 7, 4, 2, 1).findLast(n => n % 2 === 0)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(2)
		})

		it('should find the last truthy', () => {
			const result = Sequences.ofValues('', null, undefined, 'A', null, 'B', '').findLast(s => !!s)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe('B')
		})

		it('should be empty', () => {
			const result = Sequences.empty<any>().findLast(_ => true)
			expect(result.isPresent()).toBe(false)
		})

		it('should find the last matching, in a large set of elements', () => {
			const result = Sequences.range(0, 110000).findLast(n => n > 99999)
			expect(result.isPresent()).toBe(true)
			expect(result.get()).toBe(110000)
		})

		it('should be empty on empty', () => {
			expect(Optional.empty<any>().findLast(e => true)).toBe(Optional.empty<any>())
		})

		it('should be empty on non matching filter', () => {
			expect(Optional.of('').findLast(e => e.length > 0)).toBe(Optional.empty<any>())
		})

		it('should be empty on empty', () => {
			const a = Optional.of('a')
			expect(a.findLast(e => e.length > 0)).toBe(a)
		})
	})
}