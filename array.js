"use strict";

Array.prototype.sum = function() {
  return this.reduce((i, j) => i + j);
};

Array.prototype.maxBy = function(f) {
  return this.reduce((i, j) => f(i) > f(j) ? i : j);
};

Array.prototype.minBy = function(f) {
  return this.reduce((i, j) => f(i) < f(j) ? i : j);
};

Array.prototype.groupBy = function(f) {
  return this.reduce((r, i) => {
    let k = f(i);
    if (k in r[1]) {
      // handle the situation that js converts integer keys into string
      let q = r[1][k].find(i => i[0] === k);
      if (q !== undefined) {
        r[0][q[1]][1].push(i);
      } else {
        r[1][k].push([k, r[0].length]);
        r[0].push([k, [i]]);
      }
    } else {
      r[1][k] = [[k, r[0].length]];
      r[0].push([k, [i]]);
    }
    return r;
  }, [[], {}])[0];
};

Array.prototype.any = function(f) {
  return this.reduce((r, i) => r || f(i), false);
};

Array.prototype.all = function(f) {
  return this.reduce((r, i) => r && f(i), true);
};

Array.prototype.countBy = function(f) {
  return this.reduce((r, i) => (f(i) ? r + 1 : r), 0);
};

Array.prototype.uniqBy = function(f) {
  return this.reduce((r, i) => {
    let k = f(i), uniq = true;
    // handle the situation that js converts integer keys into string
    if (k in r[1])
      uniq = r[1][k].find(i => i === k) === undefined;
    if (uniq) {
      r[0].push(i);
      if (r[1][k] === undefined)
        r[1][k] = [];
      r[1][k].push(k);
    }
    return r;
  }, [[], {}])[0];
};

Array.prototype.zip = function(a) {
  return this.reduce((r, i) => {
    r.push([i, a[r.length]]);
    return r;
  }, []);
};

Array.prototype.indexed = function() {
  return this.zip([...Array(this.length).keys()]);
};

Array.prototype.toObject = function(f) {
  return this.reduce((r, i) => {
    r[i[0]] = i[1];
    return r;
  }, {});
};

if (Array.prototype.flat === undefined) {
  // to support old nodejs engine without flat function
  Array.prototype.flat = function(n = 1) {
    let a = this;
    return n <= 0 ? a : a.reduce((r, i) => {
      if (Array.isArray(i))
        r = r.concat(i.flat(n - 1));
      else
        r.push(i);
      return r;
    }, []);
  };
}
