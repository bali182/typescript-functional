/// <reference path="../src/Sequences" />
/// <reference path="jasmine.d.ts" />

module tsf.test {
	describe("Sequence#head", () => {
		it("should be the first element wrapped in an Optional", () => {
			expect(Sequences.ofValues("A").head().get()).toEqual("A");
			expect(Sequences.ofValues("A").head().isPresent()).toEqual(true);
			expect(Sequences.ofValues("A").head().isAbsent()).toEqual(false);

			expect(Sequences.ofValues("A", "B", "C").head().get()).toEqual("A");
			expect(Sequences.ofValues("A", "B", "C").head().isPresent()).toEqual(true);
			expect(Sequences.ofValues("A", "B", "C").head().isAbsent()).toEqual(false);
		});

		it("should be empty", () => {
			expect(Sequences.empty().head().isPresent()).toEqual(false);
		});

		it("should always be itself", () => {
			expect(Optional.empty<any>().head()).toEqual(Optional.empty<any>());

			var a = Optional.of('a');
			expect(a.head()).toEqual(a);
		});
	});
}