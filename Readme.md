Functional TypeScript  [![Build Status](https://travis-ci.org/bali182/typescript-functional.svg)](https://travis-ci.org/bali182/typescript-functional)
=============================

The aim of this project is to bring real lazy functional stuff to java(type)script. It started out as a learning project, but it works pretty well&fast, so I tought I share it.

As a Java developer, I took what I tought was best from the functional part of Googles [Guava](https://github.com/google/guava) and Oracles [Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html).

#TODO list

What is done, and what is planned:

##General

- [ ] Switch to a standard build system
- [ ] Create an extensive documentation

##Iterators

- [x] `forEach()`
- [x] `map()`
- [x] `filter()`
- [x] `limit()`
- [x] `skip()`
- [x] `all()`
- [x] `any()`
- [x] `reduce()`
- [x] `head()`
- [x] `tail()`
- [x] `last()`
- [x] `collect()`
- [x] `empty()`

##Stream

- [x] `forEach()`
- [x] `map()`
- [x] `filter()`
- [x] `limit()`
- [x] `skip()`
- [x] `all()`
- [x] `any()`
- [x] `reduce()`
- [x] `head()`
- [x] `tail()`
- [x] `last()`
- [x] `collect()`
- [x] `min()` - using a `Collector`
- [x] `max()` - using a `Collector`
- [x] `average()` - using a `Collector`
- [x] `sum()` - using a `Collector`
- [x] `count()` - using a `Collector`
- [x] `toArray()` - using a `Collector`
- [ ] `cast()` - Does it even make sense?
- [ ] `zip()` - 2 Streams to 1
- [ ] `reverse()` 
- [ ] `sort()`
- [x] `flatten()`
- [ ] `distinct()` - Maybe with a `Collector` - needs a `Set` datatype.
- [ ] `groupBy()` - Maybe with a `Collector` - needs a `Map` datatype.

##Collectors

- [x] `toArray()`
- [x] `sum()` 
- [x] `average()` 
- [x] `min()` 
- [x] `max()` 
- [x] `count()` 
- [x] `join()` 
- [ ] `groupBy()` 
- [ ] `distinct()`

##Tests

###For Iterators
- [x] `ArrayIterator`
- [x] `DelegateIterator`
- [x] `FilteringIterator`
- [x] `ConcatenatingIterator`
- [x] `RangeIterator`
- [x] `LimitingIterator`
- [x] `SkippingIterator`
- [ ] `EndlessIterator` - Bunch of stuff tests it implicitly, but how to test it individually?

###For Collectors
- [x] `AverageCollector`
- [x] `SumCollector`
- [x] `MinCollector`
- [x] `MaxCollector`
- [x] `CounterCollector`
- [x] `ToArrayCollector`
- [x] `JoiningCollector`

###For Streams

- [ ] `forEach()`
- [x] `map()`
- [x] `filter()`
- [x] `limit()`
- [x] `skip()`
- [x] `all()`
- [ ] `any()`
- [x] `reduce()`
- [x] `head()`
- [ ] `tail()`
- [ ] `last()`
- [x] `collect()`
- [x] `min()`
- [x] `max()`
- [x] `average()`
- [x] `sum()` 
- [x] `count()`
- [x] `toArray()`
- [x] `flatten()`
