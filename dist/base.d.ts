import { Type } from '@angular/core';
import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
interface IProps {
    [key: string]: any;
}
declare type EventTypes = 'input' | 'click' | 'change';
export declare class ConfiguredTestComp<CustomComponent> {
    protected component: Type<CustomComponent>;
    fixture: ComponentFixture<any>;
    instance: CustomComponent;
    element: any;
    protected config: TestModuleMetadata;
    constructor(component: Type<CustomComponent>);
    configure(extraConfig: TestModuleMetadata): void;
    updateFixture(): void;
    querySelector(element: string): any;
    setProps(properties: IProps): void;
    spyOn(methodReference: any): any;
    triggerEvent(selector: string, eventType: EventTypes, value?: string): void;
    protected compileComponents(): void;
}
export {};
