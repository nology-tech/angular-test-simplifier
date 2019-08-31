import { Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

interface IProps {
  [key: string]: any;
}

type EventTypes = 'input' | 'click' | 'change';

export class ConfiguredTestComp<CustomComponent> {
  public fixture: ComponentFixture<any>;
  public instance: CustomComponent;
  public element;
  protected config: TestModuleMetadata = {
    declarations: [],
    imports: [],
    providers: [],
    schemas: [],
  };

  constructor(protected component: Type<CustomComponent>) {
    this.config.declarations = [this.component];
  }

  public configure(extraConfig: TestModuleMetadata) {
    Object.keys(this.config)
      .filter((property: string) => extraConfig.hasOwnProperty(property))
      .forEach(property => (this.config[property] = [...this.config[property], ...extraConfig[property]]));
  }

  public updateFixture() {
    this.fixture.detectChanges();
  }

  public querySelector(element: string) {
    return this.element.querySelector(element);
  }

  public queryElementCount(cssSelector: string) {
    return this.fixture.debugElement.queryAll(By.css(cssSelector)).length;
  }

  public setProps(properties: IProps) {
    Object.entries(properties).forEach(([key, value]) => {
      this.instance[key] = value;
    });
    this.updateFixture();
  }

  public spyOn(methodReference) {
    spyOn(this.instance, methodReference);
    return this.instance[methodReference];
  }

  public triggerEvent(selector: string, eventType: EventTypes, value?: string) {
    const targetElem = this.querySelector(selector);
    if (value) {
      targetElem.value = value;
    }
    targetElem.dispatchEvent(new Event(eventType));
    this.updateFixture();
  }

  protected compileComponents() {
    TestBed.configureTestingModule(this.config).compileComponents();
  }
}
