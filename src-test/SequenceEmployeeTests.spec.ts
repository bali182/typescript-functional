import 'mocha'
import { expect } from 'chai'

import { ofArray } from '../src/seq'
import { Employee, Profession } from './EmployeeModel'

describe('Sequence test with simple model', () => {
	/** Random generated names & data */
	const brodyBurks = { name: 'Brody Burks', profession: Profession.MANAGER, boss: null, salary: 2800 }
	const isaiahNichols = { name: 'Isaiah Nichols', profession: Profession.MANAGER, boss: brodyBurks, salary: 2700 }
	const zacharyBaird = { name: 'Zachary Baird', profession: Profession.ANALYST, boss: isaiahNichols, salary: 2700 }
	const aaronTillman = { name: 'Aaron Tillman', profession: Profession.CLERK, boss: isaiahNichols, salary: 1400 }
	const erichColon = { name: 'Erich Colon', profession: Profession.SALESMAN, boss: aaronTillman, salary: 2700 }
	const illanaMiles = { name: 'Illana Miles', profession: Profession.PRESIDENT, boss: null, salary: 4000 }
	const alanTillman = { name: 'Alan Tillman', profession: Profession.PRESIDENT, boss: illanaMiles, salary: 2800 }
	const hectorHarrison = { name: 'Hector Harrison', profession: Profession.MANAGER, boss: alanTillman, salary: 4400 }
	const leilaniChapman = { name: 'Leilani Chapman', profession: Profession.ANALYST, boss: hectorHarrison, salary: 2600 }
	const josephineBeard = { name: 'Josephine Beard', profession: Profession.ANALYST, boss: brodyBurks, salary: 3300 }

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
		const earnsMoreThan2800 = ofArray(employees)
			.filter(e => e.salary > 2800)
			.toArray()

		expect(earnsMoreThan2800).to.deep.equal([hectorHarrison, josephineBeard, illanaMiles])
	})

	it('should be the person, who earns the most, Hector Harrison', () => {
		const earnsMost = ofArray(employees)
			.max((e1, e2) => e1.salary - e2.salary)

		expect(earnsMost.isPresent()).to.equal(true)
		expect(earnsMost.get()).to.equal(hectorHarrison)
	})

	it('should be the people, who earn more than their bosses (Hector Harrison, Josephine Beard)', () => {
		const earnsMoreThanTheBoss = ofArray(employees)
			.filter(e => !!e.boss)
			.filter(e => e.salary > e.boss.salary)
			.toArray()

		expect(earnsMoreThanTheBoss).to.deep.equal([erichColon, hectorHarrison, josephineBeard])
	})

	it('should be the best paid analyst, Josephine Beard', () => {
		const bestPaidAnalyst = ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.max((e1, e2) => e1.salary - e2.salary)

		expect(bestPaidAnalyst.isPresent()).to.equal(true)
		expect(bestPaidAnalyst.get()).to.equal(josephineBeard)
	})

	it('should be the average manager-salary (3300)', () => {
		const avgSalaryForManagers = ofArray(employees)
			.filter(e => e.profession === Profession.MANAGER)
			.average(e => e.salary)

		expect(avgSalaryForManagers).to.equal(3300)
	})

	it('should be the average salary in the company (2940)', () => {
		const avgSalaryForManagers = ofArray(employees)
			.average(e => e.salary)

		expect(avgSalaryForManagers).to.equal(2940)
	})

	it('should give a raise of 300 to all analysts, then decrease their salary to the original value', () => {
		ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.forEach(e => {
				e.salary += 300
			})
		expect(zacharyBaird.salary).to.equal(3000)
		expect(leilaniChapman.salary).to.equal(2900)
		expect(josephineBeard.salary).to.equal(3600)

		ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.forEach(e => {
				e.salary -= 300
			})
		expect(zacharyBaird.salary).to.equal(2700)
		expect(leilaniChapman.salary).to.equal(2600)
		expect(josephineBeard.salary).to.equal(3300)
	})
})
