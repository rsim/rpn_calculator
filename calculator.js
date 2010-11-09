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

var ServerMemory = function(url) {
  this.url = url;
  this._lastValue = undefined;
};

ServerMemory.prototype = {
  clear: function() {
    $.get(this.url + "/memory/clear", this._setLastValue, "jsonp");
    this._lastValue = null;
  },

  add: function(value) {
    $.get(this.url + "/memory/add/"+value, this._setLastValue, "jsonp");
  },

  subtract: function(value) {
    $.get(this.url + "/memory/subtract/"+value, this._setLastValue, "jsonp");
  },

  recall: function(callback) {
    var self = this;
    $.get(this.url + "/memory", function(data) {
      self._setLastValue(data);
      callback(data);
    }, "jsonp");
  },

  _setLastValue: function(data) {
    this._lastValue = data;
  },

  isEmpty: function() {
    return this._lastValue === null;
  }
};

var Calculator = function() {
  this.stack = new Stack;
  this.memory = new ServerMemory("http://localhost:8080");
};

Calculator.prototype = {
  accumulator: function(value) {
    if (typeof value === "undefined") {
      return this.stack.peek();
    } else {
      this.stack.replaceTop(value);
      return this;
    }
  },

  enter: function() {
    this.stack.push(this.stack.peek());
    return this;
  },

  drop: function() {
    this.stack.pop();
    this.stack.initialize();
    return this;
  },

  add: function() {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    this.stack.push(lhs+rhs);
    return this;
  },

  subtract: function() {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    this.stack.push(lhs-rhs);
    return this;
  },

  multiply: function() {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    this.stack.push(lhs*rhs);
    return this;
  },

  divide: function() {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    this.stack.push(lhs/rhs);
    return this;
  },

  negate: function() {
    this.stack.replaceTop(-this.stack.peek());
    return this;
  },

  memoryClear: function() {
    this.memory.clear();
    return this;
  },

  memoryAdd: function() {
    this.memory.add(this.stack.peek());
    return this;
  },

  memorySubtract: function() {
    this.memory.subtract(this.stack.peek());
    return this;
  },

  memoryRecall: function() {
    var self = this;
    this.memory.recall(function(value) {
      self.stack.replaceTop(value);
    });
    return this;
  },

  isMemoryEmpty: function() {
    return this.memory.isEmpty();
  }
};
