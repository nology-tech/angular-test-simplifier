"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var testing_1 = require("@angular/core/testing");
var ConfiguredTestComp = /** @class */ (function () {
    function ConfiguredTestComp(_component) {
        this._component = _component;
        // declarations: any[];
        // imports: any[];
        this.config = {
            declarations: [],
            imports: [],
            schemas: [],
            providers: [],
        };
        this.config.declarations = [this._component];
    }
    ConfiguredTestComp.prototype.configure = function (extraConfig) {
        var _this = this;
        Object.keys(this.config)
            .filter(function (property) { return extraConfig.hasOwnProperty(property); })
            .forEach(function (property) { return (_this.config[property] = _this.config[property].concat(extraConfig[property])); });
    };
    ConfiguredTestComp.prototype.compileComponents = function () {
        testing_1.TestBed.configureTestingModule(this.config).compileComponents();
    };
    ConfiguredTestComp.prototype.updateFixture = function () {
        this.fixture.detectChanges();
    };
    ConfiguredTestComp.prototype.querySelector = function (element) {
        return this.element.querySelector(element);
    };
    ConfiguredTestComp.prototype.setProps = function (properties) {
        var _this = this;
        Object.entries(properties).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.instance[key] = value;
        });
        this.updateFixture();
    };
    ConfiguredTestComp.prototype.spyOn = function (methodReference) {
        spyOn(this.instance, methodReference);
        return this.instance[methodReference];
    };
    ConfiguredTestComp.prototype.triggerEvent = function (selector, eventType, value) {
        var targetElem = this.querySelector(selector);
        if (value) {
            targetElem.value = value;
        }
        targetElem.dispatchEvent(new Event(eventType));
        this.updateFixture();
    };
    return ConfiguredTestComp;
}());
var TestComponent = /** @class */ (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent(_component) {
        var _this = _super.call(this, _component) || this;
        _this._component = _component;
        return _this;
    }
    TestComponent.prototype.initialise = function () {
        this.compileComponents();
        this.fixture = testing_1.TestBed.createComponent(this._component);
        this.instance = this.fixture.componentInstance;
        this.element = this.fixture.nativeElement;
        this.updateFixture();
    };
    return TestComponent;
}(ConfiguredTestComp));
exports.default = TestComponent;
var WrappedTestComponent = /** @class */ (function (_super) {
    __extends(WrappedTestComponent, _super);
    function WrappedTestComponent(_component, _parentComponent) {
        var _this = _super.call(this, _component) || this;
        _this._component = _component;
        _this._parentComponent = _parentComponent;
        _this.config.declarations = _this.config.declarations.concat([_this._parentComponent]);
        return _this;
    }
    WrappedTestComponent.prototype.initialise = function () {
        this.compileComponents();
        this.fixture = testing_1.TestBed.createComponent(this._parentComponent);
        this.parentInstance = this.fixture.componentInstance;
        this.parentElement = this.fixture.nativeElement;
        var testedDebugElement = this.fixture.debugElement.query(platform_browser_1.By.directive(this._component));
        this.instance = testedDebugElement.injector.get(this._component);
        this.updateFixture();
    };
    WrappedTestComponent.prototype.setParentProps = function (properties) {
        var _this = this;
        Object.entries(properties).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.parentInstance[key] = value;
        });
        this.updateFixture();
    };
    return WrappedTestComponent;
}(ConfiguredTestComp));
exports.WrappedTestComponent = WrappedTestComponent;
