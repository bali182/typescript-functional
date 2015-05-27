/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />

describe("Stream#head", () => {
	it("Head of non empty", () => {
		expect(Streams.ofValues("A").head().get()).toEqual("A");
		expect(Streams.ofValues("A").head().isPresent()).toEqual(true);
		expect(Streams.ofValues("A").head().isAbsent()).toEqual(false);

		expect(Streams.ofValues("A", "B", "C").head().get()).toEqual("A");
		expect(Streams.ofValues("A", "B", "C").head().isPresent()).toEqual(true);
		expect(Streams.ofValues("A", "B", "C").head().isAbsent()).toEqual(false);
	});

	it("Head of empty", () => {
		expect(Streams.empty().head().isPresent()).toEqual(false);
	});
})