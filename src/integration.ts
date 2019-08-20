import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfiguredTestComp } from './base';

interface IProps {
  [key: string]: any;
}

export class WrappedTestComponent<CustomComponent, WrapperComponent> extends ConfiguredTestComp<CustomComponent> {
  public fixture: ComponentFixture<WrapperComponent>;
  public parentInstance: WrapperComponent;
  public parentElement;

  constructor(protected component: Type<CustomComponent>, protected parentComponent: Type<WrapperComponent>) {
    super(component);
    this.config.declarations = [...this.config.declarations, this.parentComponent];
  }

  public initialise() {
    this.compileComponents();
    this.fixture = TestBed.createComponent(this.parentComponent);
    this.parentInstance = this.fixture.componentInstance;
    this.parentElement = this.fixture.nativeElement;
    const testedDebugElement = this.fixture.debugElement.query(By.directive(this.component));
    this.instance = testedDebugElement.injector.get(this.component);
    this.updateFixture();
  }

  public setParentProps(properties: IProps) {
    Object.entries(properties).forEach(([key, value]) => {
      this.parentInstance[key] = value;
    });
    this.updateFixture();
  }
}
