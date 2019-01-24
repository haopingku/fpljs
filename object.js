"use strict";

Object.prototype.size = function() {
  return Object.keys(this).length;
};

Object.prototype.keys = function() {
  return Object.keys(this);
};

Object.prototype.values = function() {
  return Object.values(this);
};

Object.prototype.map = function(f) {
  return this.keys().map(k => f(k, this[k]));
};

Object.prototype.toArray = function() {
  return this.map((k, v) => [k, v]);
};
