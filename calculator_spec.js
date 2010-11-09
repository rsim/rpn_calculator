describe("Calculator", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator;
  });

  it("should have 0 in accumulator", function() {
    expect(calculator.accumulator).toEqual(0);
  });

  it("should allow to set accumulator", function() {
    calculator.setAccumulator(42);
    expect(calculator.accumulator).toEqual(42);
  });

});
