import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';

interface IProps {
  [key: string]: any;
}

type EventTypes = 'input' | 'click' | 'change';

class ConfiguredTestComp<CustomComponent> {
  fixture: ComponentFixture<any>;
  instance: CustomComponent;
  element;
  // declarations: any[];
  // imports: any[];
  protected config: TestModuleMetadata = {
    declarations: [],
    imports: [],
    schemas: [],
    providers: [],
  };

  constructor(protected _component: Type<CustomComponent>) {
    this.config.declarations = [this._component];
  }

  public configure(extraConfig: TestModuleMetadata) {
    Object.keys(this.config)
      .filter((property: string) => extraConfig.hasOwnProperty(property))
      .forEach(property => (this.config[property] = [...this.config[property], ...extraConfig[property]]));
  }

  protected compileComponents() {
    TestBed.configureTestingModule(this.config).compileComponents();
  }

  updateFixture() {
    this.fixture.detectChanges();
  }

  querySelector(element: string) {
    return this.element.querySelector(element);
  }

  setProps(properties: IProps) {
    Object.entries(properties).forEach(([key, value]) => {
      this.instance[key] = value;
    });
    this.updateFixture();
  }

  spyOn(methodReference) {
    spyOn(this.instance, methodReference);
    return this.instance[methodReference];
  }

  triggerEvent(selector: string, eventType: EventTypes, value?: string) {
    const targetElem = this.querySelector(selector);
    if (value) {
      targetElem.value = value;
    }
    targetElem.dispatchEvent(new Event(eventType));
    this.updateFixture();
  }
}

export default class TestComponent<CustomComponent> extends ConfiguredTestComp<CustomComponent> {
  fixture: ComponentFixture<CustomComponent>;

  constructor(protected _component: Type<CustomComponent>) {
    super(_component);
  }

  initialise() {
    this.compileComponents();
    this.fixture = TestBed.createComponent(this._component);
    this.instance = this.fixture.componentInstance;
    this.element = this.fixture.nativeElement;
    this.updateFixture();
  }
}

export class WrappedTestComponent<CustomComponent, WrapperComponent> extends ConfiguredTestComp<CustomComponent> {
  fixture: ComponentFixture<WrapperComponent>;
  parentInstance: WrapperComponent;
  parentElement;

  constructor(protected _component: Type<CustomComponent>, protected _parentComponent: Type<WrapperComponent>) {
    super(_component);
    this.config.declarations = [...this.config.declarations, this._parentComponent];
  }

  initialise() {
    this.compileComponents();
    this.fixture = TestBed.createComponent(this._parentComponent);
    this.parentInstance = this.fixture.componentInstance;
    this.parentElement = this.fixture.nativeElement;
    const testedDebugElement = this.fixture.debugElement.query(By.directive(this._component));
    this.instance = testedDebugElement.injector.get(this._component);
    this.updateFixture();
  }

  setParentProps(properties: IProps) {
    Object.entries(properties).forEach(([key, value]) => {
      this.parentInstance[key] = value;
    });
    this.updateFixture();
  }
}
