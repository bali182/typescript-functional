import { Itr, empty, peek, append, singleton } from '../itr'
import { Sequence } from '../seq'
import { IterableSequence } from '../seq/IterableSequence'

export interface Option<T> extends Sequence<T> {

  /** Returns true, if there is a non-null and non-undefined reference present, false otherwise. */
  isPresent(): boolean

  /** Returns true, if there is no non-null and non-undefined reference present, false otherwise. */
  isAbsent(): boolean

  /** Returns the referenced value, if present, otherwise throws an error. */
  get(): T

  /** Returns the referenced value if present, undefined otherwise. */
  getOrUndefined(): T

  /** Returns the referenced value if present, null otherwise. */
  getOrNull(): T

  /** Returns the referenced value if present, throws the given Error otherwise. */
  getOrThrow(error: Error): T

	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
	 * @param fallback The fallback value to use, if the value is absent.
	 */
  getOr(fallback: T): T
}

abstract class BaseOption<T> implements Option<T>  {

  /** Returns true, if there is a non-null and non-undefined reference present, false otherwise. */
  abstract isPresent(): boolean

  /** Returns true, if there is no non-null and non-undefined reference present, false otherwise. */
  abstract isAbsent(): boolean

  /** Returns the referenced value, if present, otherwise throws an error. */
  abstract get(): T

  /** Returns the referenced value if present, undefined otherwise. */
  abstract getOrUndefined(): T

  /** Returns the referenced value if present, null otherwise. */
  abstract getOrNull(): T

  /** Returns the referenced value if present, throws the given Error otherwise. */
  abstract getOrThrow(error: Error): T

	/**
	 * Returns the referenced value if present, otherwise returns the fallback value.
	 * null or undefined is not acceptable as fallback value, use orNull() or orUndefined() instead.
	 * @param fallback The fallback value to use, if the value is absent.
	 */
  abstract getOr(fallback: T): T

  // These work for any Optional<T>, since value presence doesn't matter.
  max(comparator: (first: T, second: T) => number): Option<T> { return this }
  min(comparator: (first: T, second: T) => number): Option<T> { return this }
  head(): Option<T> { return this }
  last(): Option<T> { return this }
  tail(): Sequence<T> { return None }

  // Sadly abstract classes still won't allow to implement an interface, 
  // without redeclaring all the methods the interface has.
  abstract all(predicate: (input: T) => boolean): boolean
  abstract any(predicate: (input: T) => boolean): boolean
  abstract at(index: number): Option<T>
  abstract append(other: Sequence<T>): Sequence<T>
  abstract average(mapper: (input: T) => number): number
  abstract contains(item: T, equality?: (a: T, b: T) => boolean): boolean
  abstract count(): number
  abstract filter(predicate: (input: T) => boolean): Option<T>
  abstract findFirst(predicate: (input: T) => boolean): Option<T>
  abstract findLast(predicate: (input: T) => boolean): Option<T>
  abstract flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R>
  abstract fold<R>(reducer: (left: R, right: T) => R, initial: R): R
  abstract forEach(consumer: (input: T) => void): void
  abstract indexOf(item: T, equality?: (a: T, b: T) => boolean): Option<number>
  abstract iterator(): Itr<T>
  abstract join(separator?: string, prefix?: string, suffix?: string): string
  abstract limit(limit: number): Option<T>
  abstract map<R>(mapper: (input: T) => R): Option<R>
  abstract peek(consumer: (input: T) => void): Option<T>
  abstract reduce(reducer: (left: T, right: T) => T): Option<T>
  abstract skip(amount: number): Option<T>
  abstract skipWhile(predicate: (input: T) => boolean): Sequence<T>
  abstract sum(mapper: (input: T) => number): number
  abstract takeWhile(predicate: (input: T) => boolean): Sequence<T>
  abstract toArray(): Array<T>
  abstract zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Option<E>
}

/** Optional with a present value. */
class Some<T> extends BaseOption<T> {
  /** The reference to the value. */
  private mReferenced: T

  /** The Itr factory. */
  private mItrFactory: () => Itr<T>

	/** 
	 * Constructor.
	 * @param reference The referenced object.
	 */
  constructor(reference: T, ItrFactory?: () => Itr<T>) {
    super()
    this.mReferenced = reference
    this.mItrFactory = ItrFactory ? ItrFactory : () => singleton(this.mReferenced)
  }

  isPresent(): boolean { return true }
  isAbsent(): boolean { return false }
  get(): T { return this.mReferenced }
  getOr(fallback: T): T { return this.get() }
  getOrUndefined(): T { return this.get() }
  getOrNull(): T { return this.get() }
  getOrThrow(error: Error): T { return this.get() }
  toString(): String { return `some(${this.get()})` }
  all(predicate: (input: T) => boolean): boolean { return predicate(this.get()) }
  any(predicate: (input: T) => boolean): boolean { return this.all(predicate) }
  at(index: number): Option<T> { return (index === 0) ? this : None }
  average(mapper: (input: T) => number): number { return mapper(this.get()) }
  contains(item: T, equality: (a: T, b: T) => boolean): boolean { return this.indexOf(item, equality).isPresent() }
  count(): number { return 1 }
  filter(predicate: (input: T) => boolean): Option<T> { return predicate(this.get()) ? this : None }
  findFirst(predicate: (input: T) => boolean): Option<T> { return this.filter(predicate) }
  findLast(predicate: (input: T) => boolean): Option<T> { return this.filter(predicate) }
  flatten<R>(sequencify: (input: T) => Sequence<R>): Sequence<R> { return sequencify(this.get()) }
  fold<R>(reducer: (left: R, right: T) => R, initial: R): R { return reducer(initial, this.get()) }
  forEach(consumer: (input: T) => void): void { consumer(this.get()) }
  indexOf(item: T, equality?: (a: T, b: T) => boolean): Option<number> { return (equality || ((a: T, b: T): boolean => a === b)(item, this.get()) ? new Some(0) : None) }
  iterator(): Itr<T> { return this.mItrFactory() }
  join(separator?: string, prefix?: string, suffix?: string): string { return (prefix || '') + this.get().toString() + (suffix || '') }
  limit(limit: number): Option<T> { return limit > 0 ? this : None }
  map<R>(mapper: (input: T) => R): Option<R> { return maybe(mapper(this.get())) }
  peek(consumer: (input: T) => void): Option<T> { return new Some(this.get(), () => peek(this.iterator(), consumer)) }
  reduce(reducer: (left: T, right: T) => T): Option<T> { return this }
  skip(amount: number): Option<T> { return amount === 0 ? this : None }
  skipWhile(predicate: (input: T) => boolean): Option<T> { return predicate(this.get()) ? None : this }
  sum(mapper: (input: T) => number): number { return mapper(this.get()) }
  takeWhile(predicate: (input: T) => boolean): Option<T> { return this.filter(predicate) }
  toArray(): Array<T> { return [this.get()] }
  append(other: Sequence<T>): Sequence<T> { return new IterableSequence(() => append(this.iterator(), other.iterator())) }
  zip<R, E>(other: Sequence<R>, combiner: (first: T, second: R) => E): Option<E> {
    var otherIt = other.iterator()
    return otherIt.hasNext() ? maybe(combiner(this.get(), otherIt.next())) : None
  }
}

/** Absent singleton optional. Shouldn't be used/changed from outside of this context directly. */
const None: Option<any> = {
  isPresent(): boolean { return false },
  isAbsent(): boolean { return true },
  get(): any { throw new Error(this.toString()) },
  getOr(fallback: any): any { return fallback },
  getOrUndefined(): any { return undefined },
  getOrNull(): any { return null },
  getOrThrow(error: Error): any { throw error },
  toString(): string { return 'none()' },
  all(predicate: (input: any) => boolean): boolean { return true },
  any(predicate: (input: any) => boolean): boolean { return false },
  at(): any { return this },
  append(other: Sequence<any>): Sequence<any> { return other },
  average(mapper: (input: any) => number): number { return 0 },
  contains(item: any, equality?: (a: any, b: any) => boolean): boolean { return false },
  count(): number { return 0 },
  filter(predicate: (input: any) => boolean): Option<any> { return this },
  findFirst(predicate: (input: any) => boolean): Option<any> { return this },
  findLast(predicate: (input: any) => boolean): Option<any> { return this },
  flatten<R>(sequencify: (input: any) => Sequence<R>): Sequence<R> { return this },
  fold<R>(reducer: (left: R, right: any) => R, initial: R): R { return initial },
  forEach(consumer: (input: any) => void): void { /* no operation */ },
  head(): Option<any> { return this },
  indexOf(item: any, equality?: (a: any, b: any) => boolean): Option<number> { return this },
  iterator(): Itr<any> { return empty() },
  join(separator?: string, prefix?: string, suffix?: string): string { return (prefix || '') + (suffix || '') },
  last(): Option<any> { return this },
  limit(limit: number): Option<any> { return this },
  map<R>(mapper: (input: any) => R): Option<R> { return this },
  max(comparator: (first: any, second: any) => number): Option<any> { return this },
  min(comparator: (first: any, second: any) => number): Option<any> { return this },
  peek(consumer: (input: any) => void): Option<any> { return this },
  reduce(reducer: (left: any, right: any) => any): Option<any> { return this },
  skip(amount: number): Option<any> { return this },
  skipWhile(predicate: (input: any) => boolean): Option<any> { return this },
  sum(mapper: (input: any) => number): number { return 0 },
  tail(): Option<any> { return this },
  takeWhile(predicate: (input: any) => boolean): Option<any> { return this },
  toArray(): Array<any> { return [] },
  zip<R, E>(other: Sequence<R>, combiner: (first: any, second: R) => E): Option<E> { return this }
}

/**
 * Constructs an optional from the given value, which may be null.
 * @param input The referenced value. Can be null.
 */
export function maybe<T>(input: T): Option<T> {
  if (input === undefined || input === null) {
    return None
  }
  return new Some(input)
}

export function none<T>(): Option<T> {
  return None
}

export function some<T>(value: T): Option<T> {
  return new Some(value)
}