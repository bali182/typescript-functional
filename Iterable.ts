/// <reference path="Iterator.ts"/>

interface Iterable<T> {
	iterator(): Iterator<T>
}