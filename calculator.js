var Calculator = function() {
  this.accumulator = 0;
};

Calculator.prototype = {
  setAccumulator: function(value) {
    this.accumulator = value;
  }
};
