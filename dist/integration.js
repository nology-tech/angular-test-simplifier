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
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var base_1 = require("./base");
var WrappedComponent = /** @class */ (function (_super) {
    __extends(WrappedComponent, _super);
    function WrappedComponent(component, parentComponent) {
        var _this = _super.call(this, component) || this;
        _this.component = component;
        _this.parentComponent = parentComponent;
        _this.config.declarations = _this.config.declarations.concat([_this.parentComponent]);
        return _this;
    }
    WrappedComponent.prototype.initialise = function () {
        this.compileComponents();
        this.fixture = testing_1.TestBed.createComponent(this.parentComponent);
        this.parentInstance = this.fixture.componentInstance;
        this.parentElement = this.fixture.nativeElement;
        var testedDebugElement = this.fixture.debugElement.query(platform_browser_1.By.directive(this.component));
        this.instance = testedDebugElement.injector.get(this.component);
        this.updateFixture();
    };
    WrappedComponent.prototype.setParentProps = function (properties) {
        var _this = this;
        Object.entries(properties).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.parentInstance[key] = value;
        });
        this.updateFixture();
    };
    return WrappedComponent;
}(base_1.ConfiguredTestComp));
exports.WrappedComponent = WrappedComponent;
