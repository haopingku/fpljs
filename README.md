# FPLJS
This is a function programming language (FPL) programming style library for Javascript. Which is inspired by Haskell's function programming and some of functions are inspired by Ruby.

## usage
Include by `require()`.

## example
For example, if we want to count the max appearence of the elements in `v` by field `a`.
```javascript
let v = [
  {a: 3, b: 2},
  {a: 3, b: 3},
  {a: 4, b: 3}
];
// we want a function which finds the
// max amount of "a"'s value and returns
{
  val: 1,
  count: 2,
  vals: [{a: 1, b: 2}, {a: 1, b: 3}]
}
```
In a C-style code, we might have
```javascript
function getMaxByA(ary) {
  let g = {}, maxLen = 0, maxVal;
  for (let i of ary) {
    if (i.a in g)
      g[i.a].push(i);
    else
      g[i.a] = [i];
  }
  for (let i of Object.keys(g)) {
    if (g[i].length > maxLen) {
      maxLen = g[i].length;
      maxVal = i;
    }
  }
  return {val: maxVal, vals: g[maxVal], count: maxLen};
}

```
In FPL style,
```javascript
function getMaxByA(a) {
  return a.groupBy(i => i.a)
    .map(i => ({val: i[0], vals: i[1], count: i[1].length}))
    .maxBy(i => i.count);
}
```
it's more readable and the code is shorter.