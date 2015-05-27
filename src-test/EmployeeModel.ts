/** Main model class representing an employee. */
class Employee {
	name: String;
	profession: Profession;
	boss: Employee;
	salary: number;
}

/** Enum representing the profession of an employee. */
enum Profession {
	CLERK,
	SALESMAN,
	MANAGER,
	ANALYST,
	PRESIDENT
}