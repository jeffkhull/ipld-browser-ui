// https://2ality.com/2015/01/es6-set-operations.html

/**
 * Union (set1 ∪ set2): create a set that contains the elements of both set set1 and set2.
 */
export function union(set1: Set<any>, set2: Set<any>) {
  return new Set([...set1, ...set2])
}

/**
 * Intersection (set1 ∩ set2): create a set that contains those elements of set1 that are also in set2.
 */
export function intersection(set1: Set<any>, set2: Set<any>) {
  return new Set([...set1].filter((x) => set2.has(x)))
}

/**
 * Minus (set1 - set2): create a set that contains those elements of set1 that are not in set2. This operation is also sometimes called difference (\).
 */
export function minus(set1: Set<any>, set2: Set<any>) {
  return new Set([...set1].filter((x) => !set2.has(x)))
}
