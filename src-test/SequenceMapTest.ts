import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence#map', () => {
		it('should number to string', () => {
			expect(Sequences.ofValues(1, 2, 3)
				.map(n => n.toString())
				.toArray())
				.toEqual(['1', '2', '3'])
		})

		it('should map using parseInt', () => {
			expect(Sequences.ofValues('1', '2', '3')
				.map(s => parseInt(s))
				.toArray())
				.toEqual([1, 2, 3])
		})

		const users: Array<{ name: String, age: number }> = [
			{ name: 'Bob', age: 31 },
			{ name: 'Ed', age: 50 },
			{ name: 'Angela', age: 20 },
			{ name: 'Robert', age: 19 }
		]

		it('should map people to their name', () => {
			const result = Sequences.ofArray(users).map(u => u.name)
			expect(result.toArray()).toEqual(['Bob', 'Ed', 'Angela', 'Robert'])
		})

		it('should(nt) map empty', () => {
			expect(Sequences.empty<string>().map(s => parseInt(s)).toArray()).toEqual([])
		})

		it('should map a large amount of elements', () => {
			expect(Sequences.repeat(1)
				.limit(100000)
				.map(n => n.toString())
				.toArray()
			).toEqual(Sequences.repeat('1')
				.limit(100000)
				.toArray()
			)
		})

		it('should be empty on empty', () => {
			expect(Optional.empty<string>().map(e => e.length)).toEqual(Optional.empty<number>())
		})

		// This needs revision, might not be what is expected.
		it('should be empty on mapping to null or undefined', () => {
			const a = Optional.of('a')
			expect(a.map(e => <any>null)).toEqual(Optional.empty<any>())
			expect(a.map(e => <any>undefined)).toEqual(Optional.empty<any>())
		})

		it('should be itself on limiting non-empty to > 0', () => {
			const a = Optional.of('a')
			expect(a.map(e => e.length).get()).toEqual(1)
		})
	})
}