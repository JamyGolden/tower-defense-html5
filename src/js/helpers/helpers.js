App.privateState = new WeakMap();

function createPrivateState(o){
     App.privateState.set(o, {});
}

function _private(o){ // "private" is a reserved keyword
     return App.privateState.get(o);
}
