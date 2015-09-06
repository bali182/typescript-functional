Functional TypeScript  [![Build Status](https://travis-ci.org/bali182/typescript-functional.svg)](https://travis-ci.org/bali182/typescript-functional)
=============================

The aim of this project is to bring real lazy functional stuff to java(type)script. It started out as a learning project, but it works pretty well&fast, so I tought I share it.

As a Java developer, I took what I tought was best from the functional part of Googles [Guava](https://github.com/google/guava) Oracles [Stream API](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html), and Scala.

#Getting started
 - Clone the repository: `git clone https://github.com/bali182/typescript-functional`
 - Install Node and NPM if you haven't done so already
 - Navigate to the folder of the cloned repo
 - Install dependecies: `npm install`
 - Run build: `npm run build`
 - Tun tests: `npm test`

#TODO list

What is done, and what is planned:

##General

- [x] Switch to a standard build system
- [ ] Create an extensive documentation
- [x] Tests

##Sequence

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
- [x] `zip()`
- [x] `findFirst()`
- [x] `findLast()`
- [x] `append()`
- [x] `flatten()`
- [x] `partition()`
- [x] `peek()`
- [ ] `reverse()` 
- [ ] `sort()`
- [ ] `distinct()` - Maybe with a `Collector` - needs a `Set` datatype. Can't be done lazily.
- [ ] `groupBy()` - Maybe with a `Collector` - needs a `Map` datatype. Can't be done lazily.

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
