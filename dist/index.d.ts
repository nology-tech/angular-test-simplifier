import { ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';
interface IProps {
    [key: string]: any;
}
declare type EventTypes = 'input' | 'click' | 'change';
declare class ConfiguredTestComp<CustomComponent> {
    protected _component: Type<CustomComponent>;
    fixture: ComponentFixture<any>;
    instance: CustomComponent;
    element: any;
    protected config: TestModuleMetadata;
    constructor(_component: Type<CustomComponent>);
    configure(extraConfig: TestModuleMetadata): void;
    protected compileComponents(): void;
    updateFixture(): void;
    querySelector(element: string): any;
    setProps(properties: IProps): void;
    spyOn(methodReference: any): any;
    triggerEvent(selector: string, eventType: EventTypes, value?: string): void;
}
export default class TestComponent<CustomComponent> extends ConfiguredTestComp<CustomComponent> {
    protected _component: Type<CustomComponent>;
    fixture: ComponentFixture<CustomComponent>;
    constructor(_component: Type<CustomComponent>);
    initialise(): void;
}
export declare class WrappedTestComponent<CustomComponent, WrapperComponent> extends ConfiguredTestComp<CustomComponent> {
    protected _component: Type<CustomComponent>;
    protected _parentComponent: Type<WrapperComponent>;
    fixture: ComponentFixture<WrapperComponent>;
    parentInstance: WrapperComponent;
    parentElement: any;
    constructor(_component: Type<CustomComponent>, _parentComponent: Type<WrapperComponent>);
    initialise(): void;
    setParentProps(properties: IProps): void;
}
export {};
