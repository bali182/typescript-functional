/// <reference path="../Optional" />
/// <reference path="jasmine.d.ts" />

describe("Optional", () => {
	it("present of", () => {
		var present = Optional.of("A")
		expect(present.isPresent()).toBe(true)
		expect(present.isAbsent()).toBe(false)
		expect(present.get()).toBe("A");
	});

	it("absent ofNullable null", () => {
		var absent = Optional.ofNullable<any>(null);
		expect(absent.isAbsent()).toBe(true);
		expect(absent.isPresent()).toBe(false);
		expect(() => absent.get()).toThrow();
	});

	it("absent ofNullable undefined", () => {
		var absent = Optional.ofNullable<any>(undefined);
		expect(absent.isAbsent()).toBe(true);
		expect(absent.isPresent()).toBe(false);
		expect(() => absent.get()).toThrow();
	});

	it("absent of null", () => {
		expect(() => { Optional.of<any>(null) }).toThrow();
	});

	it("absent of undefined", () => {
		expect(() => { Optional.of<any>(undefined) }).toThrow();
	});
})