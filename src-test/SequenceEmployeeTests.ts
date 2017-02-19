import {  } from 'jasmine.d.ts' 
import {  } from '../src/Sequences' 
import {  } from 'EmployeeModel' 

module tsf.test {
	describe('Sequence test with simple model', () => {
		/** Random generated names & data */
		const zacharyBaird = { name: 'Zachary Baird', profession: Profession.ANALYST, boss: isaiahNichols, salary: 2700 }
		const erichColon = { name: 'Erich Colon', profession: Profession.SALESMAN, boss: aaronTillman, salary: 2700 }
		const aaronTillman = { name: 'Aaron Tillman', profession: Profession.CLERK, boss: isaiahNichols, salary: 1400 }
		const alanTillman = { name: 'Alan Tillman', profession: Profession.PRESIDENT, boss: illanaMiles, salary: 2800 }
		const hectorHarrison = { name: 'Hector Harrison', profession: Profession.MANAGER, boss: alanTillman, salary: 4400 }
		const isaiahNichols = { name: 'Isaiah Nichols', profession: Profession.MANAGER, boss: brodyBurks, salary: 2700 }
		const leilaniChapman = { name: 'Leilani Chapman', profession: Profession.ANALYST, boss: hectorHarrison, salary: 2600 }
		const brodyBurks = { name: 'Brody Burks', profession: Profession.MANAGER, boss: null, salary: 2800 }
		const josephineBeard = { name: 'Josephine Beard', profession: Profession.ANALYST, boss: brodyBurks, salary: 3300 }
		const illanaMiles = { name: 'Illana Miles', profession: Profession.PRESIDENT, boss: null, salary: 4000 }
	
		const employees: Array<Employee> = [
			zacharyBaird,
			erichColon,
			aaronTillman,
			alanTillman,
			hectorHarrison,
			isaiahNichols,
			leilaniChapman,
			brodyBurks,
			josephineBeard,
			illanaMiles
		]
	
		// Better examples would require distinct() + groupBy() - so a set and map datatype.
		
		it('should be the people who earn more than 2800 (Hector Harrison, Josephine Beard, Illana Miles)', () => {
			const earnsMoreThan2800 = Sequences.ofArray(employees)
				.filter(e => e.salary > 2800)
				.toArray()
	
			expect(earnsMoreThan2800).toEqual([hectorHarrison, josephineBeard, illanaMiles])
		})
	
		it('should be the person, who earns the most, Hector Harrison', () => {
			const earnsMost = Sequences.ofArray(employees)
				.max((e1, e2) => e1.salary - e2.salary)
	
			expect(earnsMost.isPresent()).toBe(true)
			expect(earnsMost.get()).toBe(hectorHarrison)
		})
	
		it('should be the people, who earn more than their bosses (Hector Harrison, Josephine Beard)', () => {
			const earnsMoreThanTheBoss = Sequences.ofArray(employees)
				.filter(e => !!e.boss)
				.filter(e => e.salary > e.boss.salary)
				.toArray()
	
			expect(earnsMoreThanTheBoss).toEqual([hectorHarrison, josephineBeard])
		})
	
		it('should be the best paid analyst, Josephine Beard', () => {
			const bestPaidAnalyst = Sequences.ofArray(employees)
				.filter(e => e.profession === Profession.ANALYST)
				.max((e1, e2) => e1.salary - e2.salary)
	
			expect(bestPaidAnalyst.isPresent()).toBe(true)
			expect(bestPaidAnalyst.get()).toBe(josephineBeard)
		})
	
		it('should be the average manager-salary (3300)', () => {
			const avgSalaryForManagers = Sequences.ofArray(employees)
				.filter(e => e.profession === Profession.MANAGER)
				.average(e => e.salary)
	
			expect(avgSalaryForManagers).toBe(3300)
		})
	
		it('should be the average salary in the company (2940)', () => {
			const avgSalaryForManagers = Sequences.ofArray(employees)
				.average(e => e.salary)
	
			expect(avgSalaryForManagers).toBe(2940)
		})
	
		it('should give a raise of 300 to all analysts, then decrease their salary to the original value', () => {
			Sequences.ofArray(employees)
				.filter(e => e.profession === Profession.ANALYST)
				.forEach(e => {
					e.salary += 300
				})
			expect(zacharyBaird.salary).toBe(3000)
			expect(leilaniChapman.salary).toBe(2900)
			expect(josephineBeard.salary).toBe(3600)
	
			Sequences.ofArray(employees)
				.filter(e => e.profession === Profession.ANALYST)
				.forEach(e => {
					e.salary -= 300
				})
			expect(zacharyBaird.salary).toBe(2700)
			expect(leilaniChapman.salary).toBe(2600)
			expect(josephineBeard.salary).toBe(3300)
		})
	
	})
}