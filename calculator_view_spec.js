describe("Calculator view", function() {
  var view;

  describe("after creation", function() {
    beforeEach(function() {
      view = new CalculatorView;
    });

    it("should not have entered number", function() {
      expect(view.enteredNumber).not.toBeDefined();
    });

    it("should have 0 in stack", function() {
      expect(view.calculator.stackValues()).toEqual([0]);
    });
  });

  describe("number entering", function() {
    beforeEach(function() {
      view = new CalculatorView;
    });

    it("should store first entered digit", function() {
      view.numberEntered("1");
      expect(view.enteredNumber).toEqual("1");
    });

    it("should store next entered digit", function() {
      view.numberEntered("1");
      view.numberEntered("2");
      expect(view.enteredNumber).toEqual("12");
    });

    it("should store decimal point", function() {
      view.numberEntered("1");
      view.numberEntered(".");
      expect(view.enteredNumber).toEqual("1.");
    });

    it("should not store second decimal point", function() {
      view.numberEntered("1");
      view.numberEntered(".");
      view.numberEntered("1");
      view.numberEntered(".");
      expect(view.enteredNumber).toEqual("1.1");
    });

    it("should clear entered number when clear button pressed", function() {
      view.numberEntered("1");
      view.clear();
      expect(view.enteredNumber).not.toBeDefined();
    });
  });

  describe("operations", function() {
    beforeEach(function() {
      view = new CalculatorView;
      view.numberEntered("3");
      view.operation("enter");
      view.numberEntered("4");
      view.operation("add");
    });

    it("should perform operation and update stack", function() {
      expect(view.calculator.stackValues()).toEqual([7]);
    });

    it("should clear entered number", function() {
      expect(view.enteredNumber).not.toBeDefined();
    });

    it("should do automatic enter when new number entered", function() {
      view.numberEntered("5");
      expect(view.calculator.stackValues()).toEqual([7,7]);
    });
  });

});
