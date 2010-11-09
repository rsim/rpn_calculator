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
});
