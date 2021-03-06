import { InjectionToken, NgModule, ModuleWithProviders } from '@angular/core';
import { Reducer } from './reducer';
import { Dispatcher } from './dispatcher';
import { Store } from './store';
import { State } from './state';
import { combineReducers } from './utils';
export var INITIAL_REDUCER = new InjectionToken('Token ngrx/store/reducer');
export var INITIAL_STATE = new InjectionToken('Token ngrx/store/initial-state');
export var _INITIAL_REDUCER = new InjectionToken('Token _ngrx/store/reducer');
export var _INITIAL_STATE = new InjectionToken('Token _ngrx/store/initial-state');
export function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return combineReducers(reducer);
}
export function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: Dispatcher.INIT });
    }
    return initialState;
}
export function _storeFactory(dispatcher, reducer, state$) {
    return new Store(dispatcher, reducer, state$);
}
export function _stateFactory(initialState, dispatcher, reducer) {
    return new State(initialState, dispatcher, reducer);
}
export function _reducerFactory(dispatcher, reducer) {
    return new Reducer(dispatcher, reducer);
}
;
/**
 * @deprecated, use StoreModule.provideStore instead!
 */
export function provideStore(_reducer, _initialState) {
    return [
        Dispatcher,
        { provide: Store, useFactory: _storeFactory, deps: [Dispatcher, Reducer, State] },
        { provide: Reducer, useFactory: _reducerFactory, deps: [Dispatcher, INITIAL_REDUCER] },
        { provide: State, useFactory: _stateFactory, deps: [INITIAL_STATE, Dispatcher, Reducer] },
        { provide: INITIAL_REDUCER, useFactory: _initialReducerFactory, deps: [_INITIAL_REDUCER] },
        { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE, INITIAL_REDUCER] },
        { provide: _INITIAL_STATE, useValue: _initialState },
        { provide: _INITIAL_REDUCER, useValue: _reducer }
    ];
}
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule.provideStore = function (_reducer, _initialState) {
        return {
            ngModule: StoreModule,
            providers: provideStore(_reducer, _initialState)
        };
    };
    StoreModule.decorators = [
        { type: NgModule, args: [{},] },
    ];
    /** @nocollapse */
    StoreModule.ctorParameters = function () { return []; };
    return StoreModule;
}());
export { StoreModule };
//# sourceMappingURL=ng2.js.map