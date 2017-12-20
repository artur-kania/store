var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { select, SelectSignature } from '@ngrx/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Operator } from 'rxjs/Operator';
import { Action } from './dispatcher';
import { State } from './state';
import { ActionReducer } from './reducer';
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(_dispatcher, _reducer, state$) {
        var _this = _super.call(this) || this;
        _this._dispatcher = _dispatcher;
        _this._reducer = _reducer;
        _this.select = select.bind(_this);
        _this.source = state$;
        return _this;
    }
    Store.prototype.lift = function (operator) {
        var store = new Store(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    Store.prototype.replaceReducer = function (reducer) {
        this._reducer.next(reducer);
    };
    Store.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    Store.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    Store.prototype.complete = function () {
        // noop
    };
    return Store;
}(Observable));
export { Store };
//# sourceMappingURL=store.js.map