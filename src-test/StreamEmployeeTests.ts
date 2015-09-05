/// <reference path="jasmine.d.ts" />
/// <reference path="../Sequences" />
/// <reference path="EmployeeModel" />

describe("Stream test with simple model", () => {
	/** Random generated names & data */
	var zacharyBaird = { name: 'Zachary Baird', profession: Profession.ANALYST, boss: isaiahNichols, salary: 2700 };
	var erichColon = { name: 'Erich Colon', profession: Profession.SALESMAN, boss: aaronTillman, salary: 2700 };
	var aaronTillman = { name: 'Aaron Tillman', profession: Profession.CLERK, boss: isaiahNichols, salary: 1400 };
	var alanTillman = { name: 'Alan Tillman', profession: Profession.PRESIDENT, boss: illanaMiles, salary: 2800 };
	var hectorHarrison = { name: 'Hector Harrison', profession: Profession.MANAGER, boss: alanTillman, salary: 4400 };
	var isaiahNichols = { name: 'Isaiah Nichols', profession: Profession.MANAGER, boss: brodyBurks, salary: 2700 };
	var leilaniChapman = { name: 'Leilani Chapman', profession: Profession.ANALYST, boss: hectorHarrison, salary: 2600 };
	var brodyBurks = { name: 'Brody Burks', profession: Profession.MANAGER, boss: null, salary: 2800 };
	var josephineBeard = { name: 'Josephine Beard', profession: Profession.ANALYST, boss: brodyBurks, salary: 3300 };
	var illanaMiles = { name: 'Illana Miles', profession: Profession.PRESIDENT, boss: null, salary: 4000 };

	var employees: Array<Employee> = [
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
	];

	// Better examples would require distinct() + Collectors#groupBy() - so a set and map datatype.
	
	it("Who earns more than 2800?", () => {
		var earnsMoreThan2800 = Sequences.ofArray(employees)
			.filter(e => e.salary > 2800)
			.toArray();

		expect(earnsMoreThan2800).toEqual([hectorHarrison, josephineBeard, illanaMiles]);
	});

	it("Who earns the most?", () => {
		var earnsMost = Sequences.ofArray(employees)
			.max((e1, e2) => e1.salary - e2.salary);

		expect(earnsMost.isPresent()).toBe(true);
		expect(earnsMost.get()).toBe(hectorHarrison);
	});

	it("Who earns more than his/her boss?", () => {
		var earnsMoreThanTheBoss = Sequences.ofArray(employees)
			.filter(e => !!e.boss)
			.filter(e => e.salary > e.boss.salary)
			.toArray();

		expect(earnsMoreThanTheBoss).toEqual([hectorHarrison, josephineBeard])
	});

	it("Who is the best paid analyst?", () => {
		var bestPaidAnalyst = Sequences.ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.max((e1, e2) => e1.salary - e2.salary);

		expect(bestPaidAnalyst.isPresent()).toBe(true);
		expect(bestPaidAnalyst.get()).toBe(josephineBeard);
	});

	it("What is the average salary for a manager (using the data available)?", () => {
		var avgSalaryForManagers = Sequences.ofArray(employees)
			.filter(e => e.profession === Profession.MANAGER)
			.average(e => e.salary);

		expect(avgSalaryForManagers).toBe(3300);
	});

	it("What is the average salary in the company", () => {
		var avgSalaryForManagers = Sequences.ofArray(employees)
			.average(e => e.salary);

		expect(avgSalaryForManagers).toBe(2940);
	});

	it("Give a raise to all analyst of 300, the decrease it to their original", () => {
		Sequences.ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.forEach(e => {
				e.salary += 300
			})
		expect(zacharyBaird.salary).toBe(3000);
		expect(leilaniChapman.salary).toBe(2900);
		expect(josephineBeard.salary).toBe(3600);

		Sequences.ofArray(employees)
			.filter(e => e.profession === Profession.ANALYST)
			.forEach(e => {
				e.salary -= 300
			})
		expect(zacharyBaird.salary).toBe(2700);
		expect(leilaniChapman.salary).toBe(2600);
		expect(josephineBeard.salary).toBe(3300);
	});

});