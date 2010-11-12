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
  },

  rollDown: function() {
    var value = this._stack.shift();
    this._stack.push(value);
    return this;
  },

  rollUp: function() {
    var value = this._stack.pop();
    this._stack.unshift(value);
    return this;
  }

};

var ServerMemory = function(url) {
  this.url = url;
  this._lastValue = null;
};

ServerMemory.prototype = {
  clear: function(callback) {
    var self = this;
    $.get(this.url + "/memory/clear", function(data) {
      self._setLastValue(data, callback);
    }, "jsonp");
    this._lastValue = null;
  },

  add: function(value, callback) {
    var self = this;
    $.get(this.url + "/memory/add/"+value, function(data) {
      self._setLastValue(data, callback);
    }, "jsonp");
  },

  subtract: function(value, callback) {
    var self = this;
    $.get(this.url + "/memory/subtract/"+value, function(data) {
      self._setLastValue(data, callback);
    }, "jsonp");
  },

  recall: function(callback) {
    var self = this;
    $.get(this.url + "/memory", function(data) {
      self._setLastValue(data, callback);
    }, "jsonp");
  },

  _setLastValue: function(data, callback) {
    this._lastValue = data;
    if (typeof callback === "function") {
      callback(data);
    }
  },

  isEmpty: function() {
    return this._lastValue === null;
  }
};

var Calculator = function(options) {
  var memoryUrl = options && options.memoryUrl || "http://localhost:8080";
  this.stack = new Stack;
  this.memory = new ServerMemory(memoryUrl);
};

_.extend(Calculator.prototype, Backbone.Events, {
  accumulator: function(value) {
    if (typeof value === "undefined") {
      return this.stack.peek();
    } else {
      this.stack.replaceTop(value);
      this.trigger("change:stack");
      return this;
    }
  },

  enter: function() {
    this.stack.push(this.stack.peek());
    this.trigger("change:stack");
    return this;
  },

  drop: function() {
    this.stack.pop();
    this.stack.initialize();
    this.trigger("change:stack");
    return this;
  },

  add: function() {
    return this._binaryOperation(function(lhs, rhs) {
      return lhs+rhs;
    });
  },

  subtract: function() {
    return this._binaryOperation(function(lhs, rhs) {
      return lhs-rhs;
    });
  },

  multiply: function() {
    return this._binaryOperation(function(lhs, rhs) {
      return lhs*rhs;
    });
  },

  divide: function() {
    return this._binaryOperation(function(lhs, rhs) {
      return lhs/rhs;
    });
  },

  _binaryOperation: function(implementation) {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    if (typeof lhs === "undefined") {
      this.stack.push(rhs);
    } else {
      this.stack.push(implementation(lhs,rhs));
    }
    this.trigger("change:stack");
    return this;
  },

  negate: function() {
    this.stack.replaceTop(-this.stack.peek());
    this.trigger("change:stack");
    return this;
  },

  memoryClear: function() {
    this.memory.clear();
    this.trigger("change:memory");
    return this;
  },

  memoryAdd: function() {
    var self = this;
    this.memory.add(this.stack.peek(), function(value) {
      self.trigger("change:memory");
    });
    return this;
  },

  memorySubtract: function() {
    var self = this;
    this.memory.subtract(this.stack.peek(), function(value) {
      self.trigger("change:memory");
    });
    return this;
  },

  memoryRecall: function() {
    var self = this;
    this.memory.recall(function(value) {
      self.trigger("change:memory");
      if (value !== null) {
        self.stack.replaceTop(value);
        self.trigger("change:stack");
      }
    });
    return this;
  },

  isMemoryEmpty: function() {
    return this.memory.isEmpty();
  },

  stackValues: function() {
    return this.stack.values();
  },

  swap: function() {
    var rhs = this.stack.pop(),
        lhs = this.stack.pop();
    this.stack.push(rhs);
    if (typeof lhs !== "undefined") this.stack.push(lhs);
    this.trigger("change:stack");
    return this;
  },

  rollDown: function() {
    this.stack.rollDown();
    this.trigger("change:stack");
    return this;
  },

  rollUp: function() {
    this.stack.rollUp();
    this.trigger("change:stack");
    return this;
  }
});
