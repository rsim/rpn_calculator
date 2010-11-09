var Stack = function() {
  this._stack = [];
  this.initialize();
};

Stack.prototype = {
  initialize: function() {
    if (this._stack.length == 0) this._stack[0] = 0;
    return this;
  },

  peek: function() {
    return this._stack[0];
  },

  replaceTop: function(value) {
    this._stack[0] = value;
    return this;
  },

  push: function(value) {
    this._stack.unshift(value);
    return this;
  },

  pop: function() {
    var value = this._stack.shift();
    return value;
  },

  values: function() {
    return _.clone(this._stack).reverse();
  }
};

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
