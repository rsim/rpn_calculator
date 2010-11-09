var Calculator = function() {
  this._stack = [0];
};

Calculator.prototype = {
  accumulator: function(value) {
    if (typeof value === "undefined")
      return this._stack[0];
    else {
      this._stack[0] = value;
      return this;
    }
  },

  enter: function() {
    this._stack.unshift(this._stack[0]);
    return this;
  },

  drop: function() {
    this._stack.shift();
    if (this._stack.length == 0)
      this._stack[0] = 0;
    return this;
  }
};
