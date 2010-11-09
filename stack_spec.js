describe("Stack", function() {
  var stack;

  beforeEach(function() {
    stack = new Stack;
  });

  it("should initially have 0 top value", function() {
    expect(stack.peek()).toEqual(0);
  });

  it("should replace top value", function() {
    stack.replaceTop(42);
    expect(stack.peek()).toEqual(42);
  });

  it("should push new value", function() {
    stack.push(42);
    expect(stack.peek()).toEqual(42);
  });

  it("should pop value", function() {
    stack.push(42);
    expect(stack.pop()).toEqual(42);
    expect(stack.peek()).toEqual(0);
  });

  it("should pop value from initial stack", function() {
    expect(stack.pop()).toEqual(0);
  });

  it("should return initial list of values", function() {
    expect(stack.values()).toEqual([0]);
  });

  it("should return correct values after push", function() {
    stack.replaceTop(42).push(2).push(3);
    expect(stack.values()).toEqual([42,2,3]);
  });

  it("should return correct values after pop", function() {
    stack.replaceTop(42).push(2).push(3).pop();
    expect(stack.values()).toEqual([42,2]);
  });

});