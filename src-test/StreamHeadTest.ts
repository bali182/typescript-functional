/// <reference path="../Sequences" />
/// <reference path="jasmine.d.ts" />

describe("Stream#head", () => {
	it("Head of non empty", () => {
		expect(Sequences.ofValues("A").head().get()).toEqual("A");
		expect(Sequences.ofValues("A").head().isPresent()).toEqual(true);
		expect(Sequences.ofValues("A").head().isAbsent()).toEqual(false);

		expect(Sequences.ofValues("A", "B", "C").head().get()).toEqual("A");
		expect(Sequences.ofValues("A", "B", "C").head().isPresent()).toEqual(true);
		expect(Sequences.ofValues("A", "B", "C").head().isAbsent()).toEqual(false);
	});

	it("Head of empty", () => {
		expect(Sequences.empty().head().isPresent()).toEqual(false);
	});
})