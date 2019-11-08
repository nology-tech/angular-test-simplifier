# @nology/angular-test-simplifier

A typescript package built to sit on top of Jasmine in Angular with, the aim of reducing configuration of test components and simplifying testing syntax.

## Maintaining Jasmine functionality

The purpose of this package is to build on top of Jasmine functionality rather than replace it. As a result we give the user the option to use a-t-s syntax or to use any properties // methods available on a standard Jasmine test component as outlined in the Jasmine/Angular documentation.

## Current version and state of affairs

The current version number is 0.1.3 In it's current version the a-t-s is untested and therefore should not be used in a enterprise level production application. It is however being utilised in a number of projects to successfully replace existing tests written using Jasmine alone.

## Installation

To add a-t-s to your Angular project just run the following command relevant to your Java Script package manager:

`npm install @nology/angular-test-simplifier --save`

`yarn add @nology/angular-test-simplifier`

## TestComponent

The test component gives you a mock rendering of the desired component to run tests against.

### Configuration and initialisation:

In your test suite setup you need to instantiate the TestComponent class and pass the constructor the component class you want to test as an argument. You also need to pass this in as a type parameter.

Example implementation:

```
    testSearchBar = new TestComponent<SearchBarComponent>(SearchBarComponent);
```

At this stage you can also add specific configurations (such as additional imports, declarations, providers or schemas) to your test component using the .configure() method.

Parameters:

- extraConfig: Object

Example implementation:

```
    testSearchBar.configure({ imports: [FontAwesomeModule, FormsModule] });
```

Now that you have an instance of your TestComponent class with the correct configuration to match your component you need to initialise it before we can run the tests. In order to do this you can use the .initialise() method.

Example implementation:

```
    testSearchBar.initialise();
```

### Available methods:

#### .query( )

Method searches the test component element and returns a debug element matching the input css selector.

Parameters:

- cssSelector: string

Example implementation:

```
it("should render a HTML element, an element with a css class and an element with a custom directive", () => {

    // HTML element
    expect(testComp.query("h1")).toBeTruthy();

    // CSS class
    expect(testComp.query(".css-class")).toBeTruthy();

    //custom directive
    expect(testComp.query("app-custom-directive")).toBeTruthy();

});
```

#### .queryAll( )

Method searches the test component element and returns all debug elements matching the input css selector. This method currently needs to be wrapped in a fixture.whenStable() to allow the fixture time to update the number of items rendered.

Parameters:

- cssSelector: string

Example implementation:

```
it("should render two elements with the .active class", () => {

    testComp.fixture.whenStable().then(() => {
        expect(testBookList.queryAll("app-book").length).toEqual(mockBooks.length);
    });

});
```

#### .setProps( )

Parameters:

- properties: Object

Method assigns values to specified properties in the test component class and updates the fixture

Example implementation:

```
it("should ..............", () => {

    /////

    testComp.setProps({
        searchText: 'example string'
    })

    /////

});
```

#### .spyOn( )

Method takes in the name of a component method to spy on and returns the desired spy function.

Parameters:

- methodReference: string

Example implementation:

```
it("should ..............", () => {

    /////

    const spy = testComp.spyOn('handleInput');
    expect(spy).toHaveBeenCalledTimes(0);

    /////

    expect(spy).toHaveBeenCalledTimes(1);

    /////

});
```

#### .triggerEvent( )

Method takes in a target element and an event type (with an optional parameter of the event value) then triggers that event.

Parameters:

- cssSelector: string
- eventType: string
- (optional) value: string

Available Event Types: 
- 'input'
- 'click'
- 'change'

N.B. : 
- If the event type is 'change' or 'input', the optional value parameter can be set to a      value of what you want to pass through in the event (e.g. 'search content').
- If the event type is a 'click', no value parameter needs to be assigned.


Example implementations:

```
it("should ..............", () => {

    /////

    testComp.triggerEvent("button", "click");

    /////

    testComp.triggerEvent(".search-bar", "input", "test string");

    /////

    testComp.triggerEvent("input[type='range']", "change", "42");

    /////

});
```

#### .triggerKeyEvent( )

Method takes in a target element and an event type (with an optional parameter of the event value) then triggers that event.

Parameters:

- cssSelector: string
- eventType: string
- keycode: string

Available Event Types: 
- 'keydown'
- 'keyup'


Example implementations:

```
it("should ..............", () => {

    /////

    testComp.triggerKeyEvent("section", "keyup");

    /////

    testComp.triggerKeyEvent(".nav-bar", "keydown", 15);

    /////

});
```

### Example tests using Jamsine syntax

#### Searching for text content on page

The textContent rendered on the page can be accessed through the test component element property.c

```
it("should ..............", () => {

    /////

    const searchTerm: string = "Text to check for";

    expect(testComp.element.textContent).toContain(searchTerm);

    /////

});
```

#### Checking component property

Properties on the component class can be accessed through the test component instance property.

```
it("should ..............", () => {

    /////

    const expectedValue = "x";

    expect(testComp.instance.property).toEqual(expectedValue)

    /////

});
```

#### Calling component method

Methods on the component class can be accessed through the test component instance property.

```
it("should ..............", () => {

    /////

    expect(testComp.instance.property).toEqual(intialValue);

    testComp.instance.methodToBeCalled();

    expect(testComp.instance.property).toEqual(updatedValue);


    /////

});
```

## IntegrationComponent

The integration component provides a mock rendering of two components, one nested inside the other. This allows you to component component integration tests on the passage of data and event listening between the two.

### Configuration and initialisation:

In your test suite setup you need to instantiate the IntegratedComponent class and pass the constructor the child and parent component classes you want to test as arguments. You also need to pass these as type parameters.

Example implementation:

```
    testNavBar = new IntegrationComponent<NavBarComponent, ParentComponent>(ChildComponent, ParentComponent);
```

At this stage you can also add specific configurations (such as additional imports, declarations, providers or schemas) to your test component using the .configure() method.

Parameters:

- extraConfig: Object

Example implementation:

```
    testNavBar.configure({ imports: [FontAwesomeModule, FormsModule] });
```

Now that you have an instance of your IntegratedComponent class with the correct configuration to match your component you need to initialise it before we can run the tests. In order to do this you can use the .initialise() method.

Example implementation:

```
    testSearchBar.initialise();
```

### Available methods:

All the methods available on the TestComponent class are also available on the IntegratedComponent. Additional methods are listed below:

#### setParentProps

This method can be used to set the properties of the parent component class. This can be particularly useful when testing inputs to the child component.

Parameters:

- properties: Object

Example implementation:

```
    testComp.setParentProps({
      label: "Test string"
    });
    expect(testComp.instance.label).toBe("Test string");
```

### Example tests using Jamsine syntax

#### Searching for text content on page

```
it("should ..............", () => {

    /////

    const searchTerm: string = "Text to check for";

    expect(testComp.parentElement.textContent).toContain(searchTerm);

    /////

});
```

#### Spying on parent component method

Methods on the parent component class can be accessed through the IntegrationComponent parentInstance property.

```
it("should ..............", () => {

    /////

    const spy = spyOn(testIntegrationComp.parentInstance, "methodToBeSpiedOn");

    // Action takes place

    expect(spy).toHaveBeenCalled();

    /////

});
```
