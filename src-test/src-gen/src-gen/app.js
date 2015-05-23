/// <reference path="Iterator" />
var ArrayIterator = (function () {
    function ArrayIterator(array, from, to, step) {
        this.mArray = array;
        this.mFrom = from || 0;
        this.mTo = to || array.length;
        this.mStep = step || 1;
        this.mIndex = this.mFrom;
    }
    ArrayIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No such element");
        }
        var currentIndex = this.mIndex;
        this.mIndex = this.mIndex + this.mStep;
        return this.mArray[currentIndex];
    };
    ArrayIterator.prototype.hasNext = function () {
        return this.mStep > 0 ? this.mIndex < this.mTo : this.mIndex >= this.mTo;
    };
    return ArrayIterator;
})();
/// <reference path="Collector" />
var SumCollector = (function () {
    function SumCollector() {
    }
    SumCollector.prototype.initial = function () {
        return 0;
    };
    SumCollector.prototype.accumulate = function (first, second) {
        return first + second;
    };
    SumCollector.prototype.finish = function (accumulated) {
        return accumulated;
    };
    return SumCollector;
})();
/// <reference path="SumCollector" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AveragingCollector = (function (_super) {
    __extends(AveragingCollector, _super);
    function AveragingCollector() {
        _super.apply(this, arguments);
        this.mCount = 0;
    }
    AveragingCollector.prototype.accumulate = function (first, second) {
        this.mCount++;
        return _super.prototype.accumulate.call(this, first, second);
    };
    AveragingCollector.prototype.finish = function (accumulated) {
        return accumulated / this.mCount;
    };
    return AveragingCollector;
})(SumCollector);
/// <reference path="Collector" />
var MinCollector = (function () {
    function MinCollector(comparator) {
        this.mStared = false;
        this.mComparator = comparator;
    }
    MinCollector.prototype.initial = function () {
        return undefined;
    };
    MinCollector.prototype.accumulate = function (first, second) {
        if (!this.mStared) {
            this.mStared = true;
            return second;
        }
        return this.mComparator(first, second) < 0 ? first : second;
    };
    MinCollector.prototype.finish = function (accumulated) {
        return Optional.ofNullable(accumulated);
    };
    return MinCollector;
})();
var Optional = (function () {
    function Optional(reference) {
        this.mReference = undefined;
        this.mReference = reference;
    }
    Optional.prototype.isPresent = function () {
        return !this.isAbsent();
    };
    Optional.prototype.isAbsent = function () {
        return this.mReference == undefined;
    };
    Optional.prototype.get = function () {
        if (this.isAbsent()) {
            throw new Error("absent");
        }
        return this.mReference;
    };
    Optional.prototype.or = function (fallback) {
        if (this.isPresent()) {
            return this.mReference;
        }
        return fallback;
    };
    Optional.of = function (item) {
        if (item == undefined) {
            throw new Error("undefined or null");
        }
        return new Optional(item);
    };
    Optional.ofNullable = function (item) {
        if (item == undefined) {
            return Optional.EMPTY;
        }
        return new Optional(item);
    };
    Optional.empty = function () {
        return Optional.EMPTY;
    };
    Optional.prototype.toString = function () {
        if (this.isPresent()) {
            return "Present {" + this.mReference.toString() + "}";
        }
        return "Absent {}";
    };
    Optional.EMPTY = new Optional(undefined);
    return Optional;
})();
/// <reference path="Collector" />
/// <reference path="Optional" />
var MaxCollector = (function () {
    function MaxCollector(comparator) {
        this.mStared = false;
        this.mComparator = comparator;
    }
    MaxCollector.prototype.initial = function () {
        return undefined;
    };
    MaxCollector.prototype.accumulate = function (first, second) {
        if (!this.mStared) {
            this.mStared = true;
            return second;
        }
        return this.mComparator(first, second) > 0 ? first : second;
    };
    MaxCollector.prototype.finish = function (accumulated) {
        return Optional.ofNullable(accumulated);
    };
    return MaxCollector;
})();
/// <reference path="Collector" />
var CounterCollector = (function () {
    function CounterCollector() {
    }
    CounterCollector.prototype.initial = function () {
        return 0;
    };
    CounterCollector.prototype.accumulate = function (countSoFar, input) {
        return countSoFar + 1;
    };
    CounterCollector.prototype.finish = function (accumulated) {
        return accumulated;
    };
    return CounterCollector;
})();
/// <reference path="Collector" />
var ToArrayCollector = (function () {
    function ToArrayCollector() {
    }
    ToArrayCollector.prototype.initial = function () {
        return [];
    };
    ToArrayCollector.prototype.accumulate = function (array, input) {
        array.push(input);
        return array;
    };
    ToArrayCollector.prototype.finish = function (array) {
        return array;
    };
    return ToArrayCollector;
})();
/// <reference path="Collector" />
/// <reference path="Optional" />
var JoiningCollector = (function () {
    function JoiningCollector(separator, prefix, suffix) {
        this.mSeparator = separator || "";
        this.mPrefix = prefix || "";
        this.mSuffix = suffix || "";
    }
    JoiningCollector.prototype.initial = function () {
        return this.mPrefix;
    };
    JoiningCollector.prototype.accumulate = function (accumulated, input) {
        if (!this.mStarted) {
            this.mStarted = true;
            return accumulated + this.toStringAny(input);
        }
        return accumulated + this.mSeparator + input;
    };
    JoiningCollector.prototype.finish = function (accumulated) {
        return accumulated + this.mSuffix;
    };
    JoiningCollector.prototype.toStringAny = function (input) {
        if (input === null) {
            return "null";
        }
        if (input === undefined) {
            return "undefined";
        }
        return input.toString();
    };
    return JoiningCollector;
})();
/// <reference path="Collector" />
/// <reference path="AveragingCollector" />
/// <reference path="MinCollector" />
/// <reference path="MaxCollector" />
/// <reference path="CounterCollector" />
/// <reference path="SumCollector" />
/// <reference path="ToArrayCollector" />
/// <reference path="JoiningCollector" />
var Collectors = (function () {
    function Collectors() {
    }
    Collectors.average = function () {
        return new AveragingCollector();
    };
    Collectors.sum = function () {
        return new SumCollector();
    };
    Collectors.min = function (comparator) {
        return new MinCollector(comparator);
    };
    Collectors.max = function (comparator) {
        return new MaxCollector(comparator);
    };
    Collectors.count = function () {
        return new CounterCollector();
    };
    Collectors.toArray = function () {
        return new ToArrayCollector();
    };
    Collectors.join = function (separator, prefix, suffix) {
        return new JoiningCollector(separator, prefix, suffix);
    };
    return Collectors;
})();
/// <reference path="Iterator" />
var MappingIterator = (function () {
    function MappingIterator(delegate, mapper) {
        this.mMapper = mapper;
        this.mDelegate = delegate;
    }
    MappingIterator.prototype.next = function () {
        return this.mMapper(this.mDelegate.next());
    };
    MappingIterator.prototype.hasNext = function () {
        return this.mDelegate.hasNext();
    };
    return MappingIterator;
})();
/// <reference path="Iterator" />
var DelegateIterator = (function () {
    function DelegateIterator(delegate) {
        this.mDelegate = delegate;
    }
    DelegateIterator.prototype.hasNext = function () {
        return this.mDelegate.hasNext();
    };
    DelegateIterator.prototype.next = function () {
        return this.mDelegate.next();
    };
    return DelegateIterator;
})();
/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />
var LimitingIterator = (function (_super) {
    __extends(LimitingIterator, _super);
    function LimitingIterator(delegate, limit) {
        _super.call(this, delegate);
        this.mLimit = limit;
        this.mIteratedCount = 0;
    }
    LimitingIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("no more elements");
        }
        var next = this.mDelegate.next();
        this.mIteratedCount++;
        return next;
    };
    LimitingIterator.prototype.hasNext = function () {
        return this.mDelegate.hasNext() && this.mIteratedCount < this.mLimit;
    };
    return LimitingIterator;
})(DelegateIterator);
/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />
var SkippingIterator = (function (_super) {
    __extends(SkippingIterator, _super);
    function SkippingIterator(delegate, skip) {
        _super.call(this, delegate);
        this.mSkip = skip;
        this.mSkiped = false;
    }
    SkippingIterator.prototype.hasNext = function () {
        if (!this.mSkiped) {
            var skipedCt = 0;
            while (this.mDelegate.hasNext() && skipedCt < this.mSkip) {
                this.mDelegate.next();
                skipedCt++;
            }
            this.mSkiped = true;
        }
        return this.mDelegate.hasNext();
    };
    SkippingIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No such element");
        }
        return this.mDelegate.next();
    };
    return SkippingIterator;
})(DelegateIterator);
/// <reference path="DelegateIterator" />
var FilteringIterator = (function (_super) {
    __extends(FilteringIterator, _super);
    function FilteringIterator(delegate, predicate) {
        _super.call(this, delegate);
        this.mConsumed = true;
        this.mPredicate = predicate;
    }
    FilteringIterator.prototype.hasNext = function () {
        if (this.mConsumed) {
            while (this.mDelegate.hasNext()) {
                var next = this.mDelegate.next();
                if (this.mPredicate(next)) {
                    this.mCurrent = next;
                    this.mConsumed = false;
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    FilteringIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No such element");
        }
        this.mConsumed = true;
        return this.mCurrent;
    };
    return FilteringIterator;
})(DelegateIterator);
/// <reference path="Iterator" />
/// <reference path="DelegateIterator" />
var PeekingIterator = (function (_super) {
    __extends(PeekingIterator, _super);
    function PeekingIterator(delegate, consumer) {
        _super.call(this, delegate);
        this.mConsumer = consumer;
    }
    PeekingIterator.prototype.next = function () {
        var next = _super.prototype.next.call(this);
        this.mConsumer(next);
        return next;
    };
    return PeekingIterator;
})(DelegateIterator);
/// <reference path="Iterator" />
/// <reference path="Optional" />
/// <reference path="MappingIterator" />
/// <reference path="ConcatenatingIterator" />
/// <reference path="LimitingIterator" />
/// <reference path="SkippingIterator" />
/// <reference path="FilteringIterator" />
/// <reference path="PeekingIterator" />
/// <reference path="Collector" />
var Iterators = (function () {
    function Iterators() {
    }
    Iterators.filter = function (iterator, predicate) {
        return new FilteringIterator(iterator, predicate);
    };
    Iterators.map = function (iterator, mapper) {
        return new MappingIterator(iterator, mapper);
    };
    Iterators.concatenate = function (iterators) {
        return new ConcatenatingIterator(iterators);
    };
    Iterators.peek = function (iterator, consumer) {
        return new PeekingIterator(iterator, consumer);
    };
    Iterators.all = function (iterator, predicate) {
        while (iterator.hasNext()) {
            if (!predicate(iterator.next())) {
                return false;
            }
        }
        return true;
    };
    Iterators.any = function (iterator, predicate) {
        while (iterator.hasNext()) {
            if (predicate(iterator.next())) {
                return true;
            }
        }
        return false;
    };
    Iterators.reduce = function (iterator, reducer, initial) {
        var current = initial;
        while (iterator.hasNext()) {
            current = reducer(current, iterator.next());
        }
        return current;
    };
    Iterators.head = function (iterator) {
        if (iterator.hasNext()) {
            return Optional.of(iterator.next());
        }
        return Optional.empty();
    };
    Iterators.tail = function (iterator) {
        if (iterator.hasNext()) {
            return Iterators.skip(iterator, 1);
        }
        return Iterators.empty();
    };
    Iterators.last = function (iterator) {
        var last = undefined;
        while (iterator.hasNext()) {
            last = iterator.next();
        }
        return Optional.ofNullable(last);
    };
    Iterators.limit = function (iterator, limit) {
        return new LimitingIterator(iterator, limit);
    };
    Iterators.skip = function (iterator, skipped) {
        return new SkippingIterator(iterator, skipped);
    };
    Iterators.forEach = function (iterator, consumer) {
        while (iterator.hasNext()) {
            consumer(iterator.next());
        }
    };
    Iterators.collect = function (iterator, collector) {
        var accumulated = collector.initial();
        while (iterator.hasNext()) {
            accumulated = collector.accumulate(accumulated, iterator.next());
        }
        return collector.finish(accumulated);
    };
    Iterators.zip = function (first, second, zipper) {
        return new MappingIterator(new ZipIterator(first, second), function (tuple) { return zipper(tuple.first, tuple.second); });
    };
    Iterators.empty = function () {
        return Iterators.EMPTY;
    };
    Iterators.EMPTY = {
        next: function () {
            throw new Error("no such element");
        },
        hasNext: function () {
            return false;
        }
    };
    return Iterators;
})();
/// <reference path="Iterator" />
/// <reference path="Iterators" />
var ConcatenatingIterator = (function () {
    function ConcatenatingIterator(iterators) {
        this.mCurrent = Iterators.empty();
        this.mIterators = iterators;
    }
    ConcatenatingIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No such element");
        }
        return this.mCurrent.next();
    };
    ConcatenatingIterator.prototype.hasNext = function () {
        var currentHasNext = false;
        while (!(currentHasNext = this.mCurrent.hasNext()) && this.mIterators.hasNext()) {
            this.mCurrent = this.mIterators.next();
        }
        return currentHasNext;
    };
    return ConcatenatingIterator;
})();
/// <reference path="Iterator" />
var EndlessIterator = (function () {
    function EndlessIterator(supplier) {
        this.mSupplier = supplier;
    }
    EndlessIterator.prototype.next = function () {
        return this.mSupplier();
    };
    EndlessIterator.prototype.hasNext = function () {
        return true;
    };
    return EndlessIterator;
})();
/// <reference path="Optional" />
/// <reference path="Collector" />
/// <reference path="Iterator" />
/// <reference path="Iterators" />
/// <reference path="Stream" />
/// <reference path="Collector" />
/// <reference path="Collectors" />
var IteratorStream = (function () {
    function IteratorStream(iterator, iterated) {
        this.mIterator = iterator;
        this.mIterated = !!iterated;
    }
    IteratorStream.prototype.checkIterated = function () {
        if (this.isIterated()) {
            throw new Error("Already iterated");
        }
    };
    IteratorStream.prototype.filter = function (predicate) {
        return new IteratorStream(Iterators.filter(this.mIterator, predicate), this.isIterated());
    };
    IteratorStream.prototype.map = function (mapper) {
        return new IteratorStream(Iterators.map(this.mIterator, mapper), this.isIterated());
    };
    IteratorStream.prototype.peek = function (consumer) {
        return new IteratorStream(Iterators.peek(this.mIterator, consumer), this.isIterated());
    };
    IteratorStream.prototype.limit = function (limit) {
        return new IteratorStream(Iterators.limit(this.mIterator, limit), this.isIterated());
    };
    IteratorStream.prototype.skip = function (amount) {
        return new IteratorStream(Iterators.skip(this.mIterator, amount), this.isIterated());
    };
    IteratorStream.prototype.tail = function () {
        return new IteratorStream(Iterators.tail(this.mIterator), this.isIterated());
    };
    IteratorStream.prototype.flatten = function (streamify) {
        return new IteratorStream(new ConcatenatingIterator(this.map(streamify).map(function (stream) { return stream.iterator(); }).iterator()), this.isIterated());
    };
    IteratorStream.prototype.zip = function (other, zipper) {
        return new IteratorStream(Iterators.zip(this.iterator(), other.iterator(), zipper), this.isIterated() || other.isIterated());
    };
    IteratorStream.prototype.iterator = function () {
        return this.mIterator;
    };
    IteratorStream.prototype.isIterated = function () {
        return this.mIterated;
    };
    IteratorStream.prototype.any = function (predicate) {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.any(this.mIterator, predicate);
    };
    IteratorStream.prototype.all = function (predicate) {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.all(this.mIterator, predicate);
    };
    IteratorStream.prototype.reduce = function (reducer, initial) {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.reduce(this.mIterator, reducer, initial);
    };
    IteratorStream.prototype.head = function () {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.head(this.mIterator);
    };
    IteratorStream.prototype.last = function () {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.last(this.mIterator);
    };
    IteratorStream.prototype.count = function () {
        return this.collect(Collectors.count());
    };
    IteratorStream.prototype.forEach = function (consumer) {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.forEach(this.mIterator, consumer);
    };
    IteratorStream.prototype.toArray = function () {
        return this.collect(Collectors.toArray());
    };
    IteratorStream.prototype.collect = function (collector) {
        this.checkIterated();
        this.mIterated = true;
        return Iterators.collect(this.mIterator, collector);
    };
    IteratorStream.prototype.min = function (comparator) {
        return this.collect(Collectors.min(comparator));
    };
    IteratorStream.prototype.max = function (comparator) {
        return this.collect(Collectors.max(comparator));
    };
    IteratorStream.prototype.average = function (mapper) {
        return this.map(mapper).collect(Collectors.average());
    };
    IteratorStream.prototype.sum = function (mapper) {
        return this.map(mapper).collect(Collectors.sum());
    };
    return IteratorStream;
})();
/// <reference path="Iterator" />
var RangeIterator = (function () {
    function RangeIterator(from, to, delta) {
        this.mTo = to;
        this.mFrom = from;
        this.mDelta = delta ? delta : 1;
        this.mCurrent = from;
    }
    RangeIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No more elements");
        }
        var current = this.mCurrent;
        this.mCurrent = this.mCurrent + this.mDelta;
        return current;
    };
    RangeIterator.prototype.hasNext = function () {
        return this.mDelta > 0 ? this.mCurrent <= this.mTo : this.mCurrent >= this.mTo;
    };
    return RangeIterator;
})();
/// <reference path="IteratorStream" />
/// <reference path="Iterators" />
/// <reference path="ArrayIterator" />
/// <reference path="EndlessIterator" />
/// <reference path="RangeIterator" />
var Streams = (function () {
    function Streams() {
    }
    Streams.ofIterator = function (iterator) {
        return new IteratorStream(iterator);
    };
    Streams.ofArray = function (array) {
        return Streams.ofIterator(new ArrayIterator(array));
    };
    Streams.ofValue = function (value) {
        return Streams.ofArray([value]);
    };
    Streams.ofValues = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i - 0] = arguments[_i];
        }
        return Streams.ofArray(values);
    };
    Streams.generate = function (supplier) {
        return Streams.ofIterator(new EndlessIterator(supplier));
    };
    Streams.repeat = function (value) {
        return Streams.generate(function () { return value; });
    };
    Streams.range = function (from, to, delta) {
        return Streams.ofIterator(new RangeIterator(from, to, delta));
    };
    Streams.concatenate = function () {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i - 0] = arguments[_i];
        }
        if (streams.length == 0) {
            return Streams.empty();
        }
        else if (streams.length == 1) {
            return streams[0];
        }
        else {
            return Streams.ofIterator(Iterators.concatenate(Iterators.map(new ArrayIterator(streams), function (s) { return s.iterator(); })));
        }
    };
    Streams.empty = function () {
        return Streams.ofIterator(Iterators.empty());
    };
    return Streams;
})();
/// <reference path="Iterator" />
var ZipIterator = (function () {
    function ZipIterator(first, second) {
        this.mFirst = first;
        this.mSecond = second;
    }
    ZipIterator.prototype.hasNext = function () {
        return this.mFirst.hasNext() && this.mSecond.hasNext();
    };
    ZipIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("No such element");
        }
        return { first: this.mFirst.next(), second: this.mSecond.next() };
    };
    return ZipIterator;
})();
/// <reference path="../Streams" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />
describe("Collectors", function () {
    it("Sum 0-5", function () {
        expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.sum())).toEqual(15);
        expect(Streams.range(0, 5).collect(Collectors.sum())).toEqual(15);
    });
    it("Average", function () {
        expect(Streams.ofValues(0, 1, 2, 3, 4, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
        expect(Streams.range(0, 5).collect(Collectors.average())).toBeCloseTo(2.5, 1);
        expect(Streams.repeat(5).limit(30).collect(Collectors.average())).toEqual(5);
    });
    it("Min", function () {
        var comparator = function (a, b) { return a < b ? -1 : (a > b ? +1 : 0); };
        var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
        expect(minPresent.isPresent()).toEqual(true);
        expect(minPresent.get()).toEqual(1);
        var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
        expect(minForSingle.isPresent()).toEqual(true);
        expect(minForSingle.get()).toEqual(5);
        var minForNone = Streams.empty().collect(Collectors.min(comparator));
        expect(minForNone.isPresent()).toEqual(false);
    });
    it("Max", function () {
        var comparator = function (a, b) { return a < b ? 1 : (a > b ? +-1 : 0); };
        var minPresent = Streams.ofValues(10, 7, 5, 1, 11, 6, 5).collect(Collectors.min(comparator));
        expect(minPresent.isPresent()).toEqual(true);
        expect(minPresent.get()).toEqual(11);
        var minForSingle = Streams.ofValue(5).collect(Collectors.min(comparator));
        expect(minForSingle.isPresent()).toEqual(true);
        expect(minForSingle.get()).toEqual(5);
        var minForNone = Streams.empty().collect(Collectors.min(comparator));
        expect(minForNone.isPresent()).toEqual(false);
    });
    it("Join", function () {
        expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join())).toEqual("ABC");
        expect(Streams.ofArray(["A", "B", "C"]).collect(Collectors.join(",", "[", "]"))).toEqual("[A,B,C]");
        expect(Streams.ofArray([1, 2, 3]).collect(Collectors.join(",", "["))).toEqual("[1,2,3");
    });
});
/// <reference path="jasmine.d.ts" />
/// <reference path="../Iterators" />
describe("Iterators", function () {
    it("ArrayIterator)", function () {
        var iterator = new ArrayIterator(["A", "B", "C"]);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("A");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("B");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("C");
        expect(iterator.hasNext()).toEqual(false);
    });
    it("DelegateIterator", function () {
        var delegate = new ArrayIterator([1, 2, 3]);
        var iterator = new DelegateIterator(delegate);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(1);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(3);
        expect(iterator.hasNext()).toEqual(false);
    });
    it("FilteringIterator", function () {
        var delegate = new ArrayIterator([1, 2, 3, 4, 5]);
        var iterator = new FilteringIterator(delegate, function (n) { return n % 2 == 0; });
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(4);
        expect(iterator.hasNext()).toEqual(false);
    });
    it("MappingIterator", function () {
        var delegate = new ArrayIterator([1, 2, 3]);
        var iterator = new MappingIterator(delegate, function (n) { return n + " is a string now"; });
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("1 is a string now");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("2 is a string now");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("3 is a string now");
        expect(iterator.hasNext()).toEqual(false);
    });
    it("ConcatenatingIterator", function () {
        var iterator = new ConcatenatingIterator(new ArrayIterator([
            new ArrayIterator(["A", "B"]),
            new ArrayIterator(["C"]),
            new ArrayIterator(["D", "E"])
        ]));
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("A");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("B");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("C");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("D");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("E");
        expect(iterator.hasNext()).toEqual(false);
    });
    it("RangeIterator", function () {
        var iterator = new RangeIterator(1, 3, 1);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(1);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(3);
        expect(iterator.hasNext()).toEqual(false);
    });
    it("LimitingIterator", function () {
        var delegate = new EndlessIterator(function () { return "A"; });
        var iterator = new LimitingIterator(delegate, 2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("A");
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual("A");
        expect(iterator.hasNext()).toEqual(false);
    });
    it("SkippingIterator", function () {
        var delegate = new ArrayIterator([0, 1, 2, 3]);
        var iterator = new SkippingIterator(delegate, 2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(2);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual(3);
        expect(iterator.hasNext()).toEqual(false);
    });
    it("ZippingIterator", function () {
        var first = new ArrayIterator(["A", "B", "C"]);
        var second = new ArrayIterator([1, 2, 3]);
        var iterator = new ZipIterator(first, second);
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual({ first: "A", second: 1 });
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual({ first: "B", second: 2 });
        expect(iterator.hasNext()).toEqual(true);
        expect(iterator.next()).toEqual({ first: "C", second: 3 });
        expect(iterator.hasNext()).toEqual(false);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#all", function () {
    it("Ranges", function () {
        expect(Streams.range(0, 10).all(function (n) { return n >= 0; })).toEqual(true);
        expect(Streams.range(0, 10).all(function (n) { return n % 2 == 0; })).toEqual(false);
    });
    it("Array", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).all(function (s) { return s.length > 0; })).toEqual(true);
        expect(Streams.ofArray(["A", "B", "", "D", "E"]).all(function (s) { return s.length > 0; })).toEqual(false);
    });
    it("After transformation and filter", function () {
        var result = Streams.range(0, 20)
            .filter(function (n) { return n % 2 == 0; })
            .map(function (n) { return n + 1; })
            .limit(3)
            .all(function (n) { return n % 2 != 0; });
        expect(result).toEqual(true);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#any", function () {
    it("Range", function () {
        expect(Streams.range(0, 10).any(function (n) { return n >= 0; })).toEqual(true);
        expect(Streams.range(0, 10).any(function (n) { return n % 2 == 0; })).toEqual(true);
        expect(Streams.range(0, 10).any(function (n) { return n > 10; })).toEqual(false);
    });
    it("Array", function () {
        expect(Streams.ofValues("A", "B", "C").any(function (s) { return s === "B"; }));
    });
    it("Values", function () {
        expect(Streams.ofArray(["A", "B", "C"]).any(function (s) { return s === "C"; }));
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#count", function () {
    it("Ranges", function () {
        expect(Streams.range(0, 10).count()).toEqual(11);
        expect(Streams.range(0, 10, 2).count()).toEqual(6);
        expect(Streams.range(10, 0, -2).count()).toEqual(6);
    });
    it("Array", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).count()).toEqual(5);
    });
    it("Filtered", function () {
        expect(Streams.ofValues(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).filter(function (n) { return n % 2 == 0; }).count()).toBe(6);
    });
    it("Mapped", function () {
        expect(Streams.range(1, 10).map(function (s) { return s.toString(); }).count()).toEqual(10);
        expect(Streams.ofValues(1, 2, 3, 4, 5).map(function (n) { return n.toString(); }).count()).toBe(5);
    });
    it("Skip & Limit", function () {
        expect(Streams.range(1, 10).skip(2).limit(6).count()).toBe(6);
    });
    it("After transformation and filter", function () {
        var result = Streams.range(0, 20)
            .filter(function (n) { return n % 2 == 0; })
            .map(function (n) { return n.toString(); })
            .limit(3)
            .skip(1)
            .count();
        expect(result).toEqual(2);
    });
});
/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />
describe("Streams#create", function () {
    it("ofArray()", function () {
        expect(Streams.ofArray([]).toArray()).toEqual([]);
        expect(Streams.ofArray(["A"]).toArray()).toEqual(["A"]);
        expect(Streams.ofArray([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
    });
    it("ofValues()", function () {
        expect(Streams.ofValues().toArray()).toEqual([]);
        expect(Streams.ofValues("A").toArray()).toEqual(["A"]);
        expect(Streams.ofValues(1, 2, 3).toArray()).toEqual([1, 2, 3]);
    });
    it("ofValue()", function () {
        expect(Streams.ofValue(1).toArray()).toEqual([1]);
    });
    it("range()", function () {
        expect(Streams.range(0, 5).toArray()).toEqual([0, 1, 2, 3, 4, 5]);
        expect(Streams.range(0, 8, 2).toArray()).toEqual([0, 2, 4, 6, 8]);
        expect(Streams.range(10, 5, -2).toArray()).toEqual([10, 8, 6]);
        expect(Streams.range(-5, 0).toArray()).toEqual([-5, -4, -3, -2, -1, 0]);
    });
    it("generate()", function () {
        expect(Streams.generate(function () { return "A"; }).limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"]);
        var i = 0;
        expect(Streams.generate(function () { return i++; }).limit(5).toArray()).toEqual([0, 1, 2, 3, 4]);
    });
    it("repeat()", function () {
        expect(Streams.repeat("A").limit(5).toArray()).toEqual(["A", "A", "A", "A", "A"]);
        expect(Streams.repeat([0]).limit(3).toArray()).toEqual([[0], [0], [0]]);
    });
});
/// <reference path="jasmine.d.ts" />
/// <reference path="../Streams" />
describe("Stream#filter", function () {
    it("Filter even / odd", function () {
        expect(Streams.ofValues(1, 2, 3, 4, 5).filter(function (n) { return n % 2 == 0; }).toArray()).toEqual([2, 4]);
        expect(Streams.ofValues(1, 2, 3, 4, 5).filter(function (n) { return n % 2 != 0; }).toArray()).toEqual([1, 3, 5]);
    });
    it("Filter that starts with A", function () {
        expect(Streams.ofValues("Apple", "Pear", "Astronaut", "Dog").filter(function (s) { return s.charAt(0) == 'A'; }).toArray()).toEqual(["Apple", "Astronaut"]);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#flatten", function () {
    it("Flatten array of array", function () {
        expect(Streams.ofValues([1, 2], [3], [4, 5]).flatten(function (a) { return Streams.ofArray(a); }).toArray()).toEqual([1, 2, 3, 4, 5]);
    });
    var users = [
        { name: "Bob", age: 31, children: 2 },
        { name: "Angela", age: 20, children: 1 },
        { name: "Robert", age: 19, children: 0 },
        { name: "Ed", age: 50, children: 5 },
    ];
    it("Flatten mapped values", function () {
        expect(Streams.ofArray(users).map(function (u) { return u.children; }).flatten(function (ch) { return Streams.repeat("a").limit(ch); }).toArray()).toEqual(["a", "a", "a", "a", "a", "a", "a", "a",]);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#forEach", function () {
    it("Range", function () {
        var counter = 0;
        Streams.range(0, 10).forEach(function (n) {
            expect(n).toBe(counter++);
        });
        expect(counter).toBe(11);
    });
    it("Endless", function () {
        var counter = 0;
        Streams.repeat("A").limit(3).forEach(function (str) {
            expect(str).toBe("A");
            counter++;
        });
        expect(counter).toBe(3);
    });
    it("Array", function () {
        var array = ["A", "B", "C"];
        var index = 0;
        Streams.ofArray(["A", "B", "C"]).forEach(function (str) {
            expect(str).toBe(array[index++]);
        });
    });
    it("Value", function () {
        Streams.ofValue("A").forEach(function (str) {
            expect(str).toBe("A");
        });
    });
    it("Values", function () {
        var array = ["A", "B", "C"];
        var index = 0;
        Streams.ofValues("A", "B", "C").forEach(function (str) {
            expect(str).toBe(array[index++]);
        });
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#head", function () {
    it("Head of non empty", function () {
        expect(Streams.ofValues("A").head().get()).toEqual("A");
        expect(Streams.ofValues("A").head().isPresent()).toEqual(true);
        expect(Streams.ofValues("A").head().isAbsent()).toEqual(false);
        expect(Streams.ofValues("A", "B", "C").head().get()).toEqual("A");
        expect(Streams.ofValues("A", "B", "C").head().isPresent()).toEqual(true);
        expect(Streams.ofValues("A", "B", "C").head().isAbsent()).toEqual(false);
    });
    it("Head of empty", function () {
        expect(Streams.empty().head().isPresent()).toEqual(false);
        expect(Streams.empty().head().isAbsent()).toEqual(true);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#last", function () {
    it("Array last", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).last().get()).toEqual("E");
        expect(Streams.ofArray(["A", "B", "C", "D"]).last().get()).toEqual("D");
        expect(Streams.empty().last().isAbsent()).toBe(true);
    });
    it("Range", function () {
        expect(Streams.range(0, 5).last().get()).toEqual(5);
    });
    it("Repeat & limit", function () {
        expect(Streams.repeat("A").limit(4).last().get()).toEqual("A");
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#limit", function () {
    it("Limit endless stream", function () {
        expect(Streams.repeat("A").limit(3).toArray()).toEqual(["A", "A", "A"]);
        var i = 0;
        expect(Streams.generate(function () { return ++i; }).limit(5).toArray()).toEqual([1, 2, 3, 4, 5]);
    });
    it("Limit ranges", function () {
        expect(Streams.range(0, 10).limit(3).toArray()).toEqual([0, 1, 2]);
        expect(Streams.range(0, 10, 2).limit(3).toArray()).toEqual([0, 2, 4]);
        expect(Streams.range(10, 0, -2).limit(3).toArray()).toEqual([10, 8, 6]);
    });
    it("Limit array", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).limit(3).toArray()).toEqual(["A", "B", "C"]);
    });
    it("Limit after transformation and filter", function () {
        var result = Streams.range(0, 20)
            .filter(function (n) { return n % 2 == 0; })
            .map(function (n) { return n.toString(); })
            .limit(3)
            .toArray();
        expect(result).toEqual(["0", "2", "4"]);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#map", function () {
    it("number to string", function () {
        expect(Streams.ofValues(1, 2, 3).map(function (n) { return n.toString(); }).toArray()).toEqual(["1", "2", "3"]);
    });
    it("parseInt", function () {
        expect(Streams.ofValues("1", "2", "3").map(function (s) { return parseInt(s); }).toArray()).toEqual([1, 2, 3]);
    });
});
/// <reference path="../Streams" />
/// <reference path="../Collectors" />
/// <reference path="jasmine.d.ts" />
describe("Stream complex examples", function () {
    it("Multiply", function () {
        var a = 6;
        var b = 4;
        expect(Streams.repeat(a).limit(b).reduce(function (x, y) { return x + y; }, 0)).toEqual(a * b);
    });
    var users = [
        { name: "Bob", age: 31 },
        { name: "Angela", age: 20 },
        { name: "Robert", age: 19 },
        { name: "Ed", age: 50 },
    ];
    it("Join names of older than 20", function () {
        var names = Streams.ofArray(users)
            .filter(function (u) { return u.age > 20; })
            .map(function (u) { return u.name; })
            .collect(Collectors.join(" "));
        expect(names).toEqual("Bob and Ed");
    });
    it("Add the ages", function () {
        expect(Streams.ofArray(users).map(function (u) { return u.age; }).reduce(function (a, b) { return a + b; }, 0)).toEqual(120);
    });
    it("Generate sequence of 'A' as long as the names combined", function () {
        var sequence = Streams.ofArray(users)
            .map(function (u) { return u.name; })
            .map(function (name) { return name.length; })
            .map(function (length) { return Streams.repeat("A").limit(length).collect(Collectors.join("")); })
            .collect(Collectors.join(" "));
        expect(sequence).toEqual("AAA AAAAAA AAAAAA AA");
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#reduce", function () {
    var sumReducer = function (a, b) { return a + b; };
    var emptyJoiner = function (a, b) { return a ? a + b : b; };
    it("Sum Ranges", function () {
        expect(Streams.range(0, 10).reduce(sumReducer, 0)).toEqual(55);
        expect(Streams.range(0, 10, 2).reduce(sumReducer, 0)).toEqual(30);
        expect(Streams.range(10, 0, -2).reduce(sumReducer, 0)).toEqual(30);
    });
    it("Join", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).reduce(emptyJoiner)).toEqual("ABCDE");
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#skip", function () {
    it("Skip endless stream", function () {
        expect(Streams.repeat("A").skip(10).limit(3).toArray()).toEqual(["A", "A", "A"]);
        var i = 0;
        expect(Streams.generate(function () { return ++i; }).skip(3).limit(5).toArray()).toEqual([4, 5, 6, 7, 8]);
    });
    it("Skip ranges", function () {
        expect(Streams.range(0, 10).skip(8).toArray()).toEqual([8, 9, 10]);
        expect(Streams.range(0, 10, 2).skip(2).toArray()).toEqual([4, 6, 8, 10]);
        expect(Streams.range(10, 0, -2).skip(2).toArray()).toEqual([6, 4, 2, 0]);
    });
    it("Limit array", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).skip(3).toArray()).toEqual(["D", "E"]);
    });
    it("Limit after transformation and filter", function () {
        var result = Streams.range(0, 10)
            .filter(function (n) { return n % 2 == 0; })
            .map(function (n) { return n.toString(); })
            .skip(3)
            .toArray();
        expect(result).toEqual(["6", "8", "10"]);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#tail", function () {
    it("Array", function () {
        expect(Streams.ofArray(["A", "B", "C", "D", "E"]).tail().toArray()).toEqual(["B", "C", "D", "E"]);
        expect(Streams.ofArray(["A", "E"]).tail().toArray()).toEqual(["E"]);
        expect(Streams.ofArray(["A"]).tail().toArray()).toEqual([]);
    });
    it("Range", function () {
        expect(Streams.range(0, 5).tail().toArray()).toEqual([1, 2, 3, 4, 5]);
        expect(Streams.range(0, 1).tail().toArray()).toEqual([1]);
    });
    it("Repeat & Limit", function () {
        expect(Streams.repeat("A").limit(5).tail().toArray()).toEqual(["A", "A", "A", "A"]);
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#zip", function () {
    it("zip something with empty", function () {
        var as = Streams.empty();
        var bs = Streams.ofValues("B", "B", "B");
        var zipped = as.zip(bs, function (a, b) { return a + b; });
        expect(zipped.toArray()).toEqual([]);
    });
    it("zip arrays of equal length", function () {
        var as = Streams.ofValues("A", "A", "A");
        var bs = Streams.ofValues("B", "B", "B");
        var zipped = as.zip(bs, function (a, b) { return a + b; });
        expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
    });
    it("zip arrays of different length", function () {
        var as = Streams.ofValues("A", "A", "A", "B");
        var bs = Streams.ofValues("B", "B");
        var zipped = as.zip(bs, function (a, b) { return a + b; });
        expect(zipped.toArray()).toEqual(["AB", "AB"]);
    });
    it("zip endless streams", function () {
        var as = Streams.repeat("A");
        var bs = Streams.repeat("B");
        var zipped = as.zip(bs, function (a, b) { return a + b; }).limit(3);
        expect(zipped.toArray()).toEqual(["AB", "AB", "AB"]);
    });
    it("zip something zipped", function () {
        var as = Streams.repeat("A");
        var bs = Streams.repeat("B");
        var cs = Streams.repeat("C");
        var zipped = as.zip(bs, function (a, b) { return a + b; }).zip(cs, function (ab, c) { return ab + c; }).limit(3);
        expect(zipped.collect(Collectors.join())).toEqual("ABCABCABC");
    });
});
/// <reference path="../Streams" />
/// <reference path="jasmine.d.ts" />
describe("Stream#peek", function () {
    it("peek into array stream", function () {
        var concatenated = "";
        var stream = Streams.ofArray(["A", "B", "C"]).peek(function (s) { return concatenated += s; }).forEach(function (s) { });
        expect(concatenated).toBe("ABC");
    });
});
