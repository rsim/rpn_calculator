describe("Calculator", function() {
  var calculator;

  describe("after creation", function() {
    beforeEach(function() {
      calculator = new Calculator;
    });

    it("should have 0 in accumulator", function() {
      expect(calculator.accumulator()).toEqual(0);
    });

    it("should allow to set accumulator", function() {
      calculator.accumulator(42);
      expect(calculator.accumulator()).toEqual(42);
    });

  });

  describe("with three values", function() {
    var values = [42, 2, 3];

    beforeEach(function() {
      calculator = new Calculator;
      calculator
        .accumulator(values[0]).enter()
        .accumulator(values[1]).enter()
        .accumulator(values[2]);
    });

    it("should have last value in accumulator", function() {
      expect(calculator.accumulator()).toEqual(values[2]);
    });

    it("should have second value in accumulator after single drop", function() {
      calculator.drop();
      expect(calculator.accumulator()).toEqual(values[1]);
    });

    it("should have first value in accumulator after two drops", function() {
      calculator.drop().drop();
      expect(calculator.accumulator()).toEqual(values[0]);
    });

    it("should have 0 in accumulator after three drops", function() {
      calculator.drop().drop().drop();
      expect(calculator.accumulator()).toEqual(0);
    });

  });

  describe("with two operands", function() {
    beforeEach(function() {
      calculator = new Calculator;
      calculator.accumulator(3).enter().accumulator(4);
    });

    it("should add two numbers", function() {
      calculator.add();
      expect(calculator.accumulator()).toEqual(7);
    });

    it("should subtract two numbers", function() {
      calculator.subtract();
      expect(calculator.accumulator()).toEqual(-1);
    });

    it("should multiply two numbers", function() {
      calculator.multiply();
      expect(calculator.accumulator()).toEqual(12);
    });

    it("should divide two numbers", function() {
      calculator.divide();
      expect(calculator.accumulator()).toEqual(0.75);
    });

  });

  describe("with one operand", function() {
    beforeEach(function() {
      calculator = new Calculator;
      calculator.accumulator(3);
    });

    it("should change sign of number", function() {
      calculator.negate();
      expect(calculator.accumulator()).toEqual(-3);
    });

    it("should change twice sign of number", function() {
      calculator.negate().negate();
      expect(calculator.accumulator()).toEqual(3);
    });

    it("should not add", function() {
      calculator.add();
      expect(calculator.accumulator()).toEqual(3);
    });

    it("should not subtract", function() {
      calculator.subtract();
      expect(calculator.accumulator()).toEqual(3);
    });

    it("should not multiply", function() {
      calculator.multiply();
      expect(calculator.accumulator()).toEqual(3);
    });

    it("should not divide", function() {
      calculator.divide();
      expect(calculator.accumulator()).toEqual(3);
    });
  });

  describe("server memory", function() {
    var url = "http://localhost:8080",
        ajaxCall = function(param) {return jQuery.ajax.mostRecentCall.args[0][param];};

    beforeEach(function() {
      calculator = new Calculator;
      spyOn(jQuery, "ajax");
      calculator.memoryClear();
    });

    it("should initially be empty", function() {
      expect(ajaxCall("url")).toEqual(url+"/memory/clear");
      expect(calculator.isMemoryEmpty).toBeTruthy();
    });

    it("should add accumulator", function() {
      calculator
        .accumulator(42)
        .memoryAdd();
      expect(ajaxCall("url")).toEqual(url+"/memory/add/42");
      calculator
        .accumulator(0)
        .memoryRecall();
      expect(ajaxCall("url")).toEqual(url+"/memory");
      ajaxCall("success")(42);
      expect(calculator.accumulator()).toEqual(42);
    });

    it("should subtract accumulator", function() {
      calculator
        .accumulator(42)
        .memorySubtract();
      expect(ajaxCall("url")).toEqual(url+"/memory/subtract/42");
      calculator
        .accumulator(0)
        .memoryRecall();
      expect(ajaxCall("url")).toEqual(url+"/memory");
      ajaxCall("success")(-42);
      expect(calculator.accumulator()).toEqual(-42);
    });

  });

  describe("stack operations", function() {
    beforeEach(function() {
      calculator = new Calculator;
      calculator
        .accumulator(1).enter()
        .accumulator(2).enter()
        .accumulator(3);
    });

    it("should swap top values", function() {
      calculator.swap();
      expect(calculator.stackValues()).toEqual([1,3,2]);
    });

    it("should roll down", function() {
      calculator.rollDown();
      expect(calculator.stackValues()).toEqual([3,1,2]);
    });

    it("should roll up", function() {
      calculator.rollUp();
      expect(calculator.stackValues()).toEqual([2,3,1]);
    });

  });
});
