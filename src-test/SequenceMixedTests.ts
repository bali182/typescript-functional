import {  } from '../src/Sequences' 
import {  } from 'jasmine.d.ts' 

module tsf.test {
	describe('Sequence mixed examples', () => {
		it('should work the same way as the * operator', () => {
			const a = 6
			const b = 4
			const actual = Sequences.repeat(a)
				.limit(b)
				.sum(n => n)
			expect(actual).toEqual(a * b)
		})

		const users: Array<{ name: String, age: number }> = [
			{ name: 'Bob', age: 31 },
			{ name: 'Angela', age: 20 },
			{ name: 'Robert', age: 19 },
			{ name: 'Ed', age: 50 },
		]

		it('should join the names of people older than 20', () => {
			const names = Sequences.ofArray(users)
				.filter(u => u.age > 20)
				.map(u => u.name)
				.join(' and ')

			expect(names).toEqual('Bob and Ed')
		})

		it('should add the ages', () => {
			const ageSum = Sequences.ofArray(users)
				.sum(u => u.age)
			expect(ageSum).toEqual(120)
		})

		it('should generate a sequence of 'A' as long as the names combined', () => {
			const sequence = Sequences.ofArray(users)
				.map(u => u.name)
				.map(name => name.length)
				.map(length => Sequences.repeat('A').limit(length).join())
				.join(' ')

			expect(sequence).toEqual('AAA AAAAAA AAAAAA AA')
		})
	})
}