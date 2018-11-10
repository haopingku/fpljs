# FPLJS
This is a function programming language (FPL) programming style library for Javascript. Which is inspired by Haskell's function programming.

## usage
Include by `require()`.

## example
For example, if we want to count the max appearence of the elements in `v` by field `a`.
```javascript
let v = [
  {a: 1, b: 2},
  {a: 1, b: 3},
  {a: 2, b: 3}
];
// we want a function which finds by "a" and returns
{
  val: 1,
  count: 2,
  vals: [{a: 1, b: 2}, {a: 1, b: 3}]
}
```
In a C-style code, we might have
```javascript
function getMaxByA(ary) {
  let g = {}, max = 0;
  for (let i of ary)
    if (i.a in g)
      g[i.a].push(i);
    else
      g[i.a] = [i];
  for (let i of Object.keys(g))
    if (g[i].length > max) {
      max = i;
    }
  return {val: max, vals: g[max], count: g[max].length};
}

```
In FPL style
```javascript
function getMaxByA(a) {
  return a.groupBy(i => i.a)
    .map(i => ({val: i[0], vals: i[1], count: i[1].length}))
    .maxBy(i => i.count);
}
```
It's more readable and the code is shorter.