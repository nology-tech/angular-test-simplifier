import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ConfiguredTestComp } from './base';
interface IProps {
    [key: string]: any;
}
export declare class WrappedComponent<CustomComponent, WrapperComponent> extends ConfiguredTestComp<CustomComponent> {
    protected component: Type<CustomComponent>;
    protected parentComponent: Type<WrapperComponent>;
    fixture: ComponentFixture<WrapperComponent>;
    parentInstance: WrapperComponent;
    parentElement: any;
    constructor(component: Type<CustomComponent>, parentComponent: Type<WrapperComponent>);
    initialise(): void;
    setParentProps(properties: IProps): void;
}
export {};
