"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ConfiguredTestComp = /** @class */ (function () {
    function ConfiguredTestComp(component) {
        this.component = component;
        // declarations: any[];
        // imports: any[];
        this.config = {
            declarations: [],
            imports: [],
            providers: [],
            schemas: [],
        };
        this.config.declarations = [this.component];
    }
    ConfiguredTestComp.prototype.configure = function (extraConfig) {
        var _this = this;
        Object.keys(this.config)
            .filter(function (property) { return extraConfig.hasOwnProperty(property); })
            .forEach(function (property) { return (_this.config[property] = _this.config[property].concat(extraConfig[property])); });
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
    ConfiguredTestComp.prototype.compileComponents = function () {
        testing_1.TestBed.configureTestingModule(this.config).compileComponents();
    };
    return ConfiguredTestComp;
}());
exports.ConfiguredTestComp = ConfiguredTestComp;
