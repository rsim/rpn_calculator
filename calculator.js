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
  }
};
