var CalculatorView = Backbone.View.extend({
  initialize: function() {
    this.calculator = new Calculator;
    this.enteredNumber = undefined;
    this.render();

    _.bindAll(this, "renderStack", "renderMemoryIndicator", "keyDown", "keyUp");

    this.calculator.bind("change:stack", this.renderStack);
    this.calculator.bind("change:memory", this.renderMemoryIndicator);

    $(document).keydown(this.keyDown).keyup(this.keyUp);
  },

  events: {
    "click button"  : "buttonPressed"
  },

  render: function() {
    this.renderStack();
    this.renderMemoryIndicator();
  },

  renderStack: function() {
    var values = this.calculator.stackValues();
    // show at least 4 rows
    while (values.length < 4) values.unshift("");
    var html = _.map(values, function(value) {
          return "<li>"+value+"</li>";
        }).join("\n");
    this.$("#stack-list").html(html);
    var $stack = this.$("#stack");
    $stack.attr({scrollTop: $stack.attr("scrollHeight") });
  },

  renderMemoryIndicator: function() {
    // check if memory is set or not
    if (this.calculator.isMemoryEmpty()) {
      this.$("#memory-indicator").hide();
    } else {
      this.$("#memory-indicator").show();
    }
  },

  renderEnteredNumber: function() {
    this.$("#stack-list li:last").html(this.enteredNumber || "0");
  },

  buttonPressed: function(e) {
    var $target = $(e.target),
        name = ($target.attr("name"));
    this.buttonEvent(name);
  },

  buttonEvent: function(name) {
    // digit or decimal point
    if (name.match(/\d|\./)) {
      this.numberEntered(name);
    } else if (name == 'clear') {
      this.clear();
    } else {
      this.operation(name);
    }
  },

  keyCodeToButton: {
    48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 190: ".",
    96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 110: ".",
    13: "enter", 27: "clear", 8: "drop", 46: "drop",
    107: "add", 109: "subtract", 189: "subtract", 106: "multiply", 111: "divide", 191: "divide"
  },

  shiftKeyCodeToButton: {
    107: "add", 187: "add", 56: "multiply"
  },

  keyDown: function(e) {
    var keyCode = e.originalEvent.keyCode,
        name = this._shiftKey ? this.shiftKeyCodeToButton[keyCode] : this.keyCodeToButton[keyCode];
    if (keyCode == 16) {
      this._shiftKey = true;
    } else if (name) {
      this.buttonEvent(name);
      e.preventDefault();
    }
  },

  keyUp: function(e) {
    if (e.originalEvent.keyCode == 16) this._shiftKey = false;
  },

  numberEntered: function(number) {
    if (typeof this.enteredNumber === "undefined") {
      if (this._enterOnNewNumber) {
        this.calculator.enter();
        this._enterOnNewNumber = false;
      }
      this.enteredNumber = "";
    }
    // if decimal point already entered then do nothing
    if (number == '.' && this.enteredNumber.indexOf('.') >= 0) return;
    this.enteredNumber += number;
    this.renderEnteredNumber();
  },

  clear: function() {
    this.enteredNumber = undefined;
    this._enterOnNewNumber = false;
    this.calculator.accumulator(0);
  },

  operation: function(name) {
    // set accumulator to entered number
    if (this.enteredNumber) {
      this.calculator.accumulator(parseFloat(this.enteredNumber));
      this.enteredNumber = undefined;
    }
    this.calculator[name]();
    if (_.include(['add','subtract','multiply','divide','negate'], name)) {
      this._enterOnNewNumber = true;
    } else if (_.include(['swap','rollDown','rollUp','drop'], name)) {
      this._enterOnNewNumber = false;
    }
  }
});
