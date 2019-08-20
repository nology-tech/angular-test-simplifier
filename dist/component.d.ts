import { ComponentFixture } from '@angular/core/testing';
import { ConfiguredTestComp } from './base';
export declare class Component<CustomComponent> extends ConfiguredTestComp<CustomComponent> {
    fixture: ComponentFixture<CustomComponent>;
    initialise(): void;
}
