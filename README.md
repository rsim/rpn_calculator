# RPN Calculator application and TDD demo 

Demo of building [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation) calculator in JavaScript using test-driven development (TDD) approach.

Components used in demo:

* [Jasmine testing framework](http://pivotal.github.com/jasmine/)
* [Backbone.js](http://documentcloud.github.com/backbone/) and [jQuery](http://jquery.com/) for user interface
* [node.js](http://nodejs.org/) for memory server component

Idea for TDD demo using calculator application taken from [RpnCalculator in Java screencasts](http://www.vimeo.com/album/205252).
User interface is made to simulate Mac OS X calculator RPN mode.

## Demo

Visit [calculator demo page](http://rsim.github.com/rpn_calculator/calculator.html) to see final result of calculator application.

Visit [tests page](http://rsim.github.com/rpn_calculator/tests.html) to see execution result of all tests.

## Following steps of building application

Clone repository locally with

    git clone git@github.com:rsim/rpn_calculator.git
    cd rpn_calculator

Now you can review each step of building application (main steps are tagged with corresponding tag in git repository).

    git checkout t0_initial

Initial empty application in `calculator.js` and empty tests in `calculator_spec.js`. You can run tests after each step by opening `tests.html`.

    git checkout t1_set_accumulator

Initial simple implementation of setting accumulator.

    git checkout t2_set_multiple_values

Changed accumulator getter/setter API and implemented entering and dropping of values in stack.

    t3_reorganized_multiple_values

Reorganized multiple stack values test.

    git checkout t4_extracted_stack

Refactored stack implementation and extracted in separate Stack object.

    git checkout t5_two_operand_operations

Implemented basic two operand operations.

    git checkout t6_memory_server

Sample external memory service that will be accessed from calculator application using JSONP interface. You can run memory server with `node memory_server.js` (you need node.js installed).

    git checkout t7a_testing_server_api

Initial exploring of memory service API using tests.

    git checkout t7b_server_memory_async_testing

Implemented ServerMemory objects and testing it in asynchronous way.

    git checkout t7c_server_memory_ajax_mocking

Mocking of Ajax calls in tests to speed up testing and remove dependency of actual memory service when running tests.

    git checkout t8_ui_design

User interface implementation in HTML/CSS.

    git checkout t9_change_events

Added stack and memory change events to calculator using Backbone.js events system.

    git checkout t10_calculator_view

Implemented Calculator view using Backbone.js to bind user interface to calculator logic.

## Additional tools

It is recommended to use Firefox with [XRefresh plugin](http://xrefresh.binaryage.com/) and open `tests.html` file which will run tests every time when implementation or tests are changed (need to run also XRefresh server in project directory which will monitor changed files).

