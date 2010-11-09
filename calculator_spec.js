describe("Calculator", function() {
  var calculator;

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

  it("should allow to set multiple values in accumulator", function() {
    calculator
      .accumulator(42).enter()
      .accumulator(2).enter()
      .accumulator(3);
    expect(calculator.accumulator()).toEqual(3);
    calculator.drop();
    expect(calculator.accumulator()).toEqual(2);
    calculator.drop();
    expect(calculator.accumulator()).toEqual(42);
    calculator.drop();
    expect(calculator.accumulator()).toEqual(0);
  });

});
