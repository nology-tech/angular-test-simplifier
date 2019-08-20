import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguredTestComp } from './base';

export class Component<CustomComponent> extends ConfiguredTestComp<CustomComponent> {
  public fixture: ComponentFixture<CustomComponent>;

  public initialise() {
    this.compileComponents();
    this.fixture = TestBed.createComponent(this.component);
    this.instance = this.fixture.componentInstance;
    this.element = this.fixture.nativeElement;
    this.updateFixture();
  }
}
