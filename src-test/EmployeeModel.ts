module tsf.test {
	/** Main model class representing an employee. */
	export class Employee {
		name: String
		profession: Profession
		boss: Employee
		salary: number
	}
	
	/** Enum representing the profession of an employee. */
	export enum Profession {
		CLERK,
		SALESMAN,
		MANAGER,
		ANALYST,
		PRESIDENT
	}
}