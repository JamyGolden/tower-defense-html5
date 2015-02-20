window.App = window.App || {};
(function(App) {
    App.BaseCtrl = function(args) {
        if (typeof args === 'object') {
            for (var k in args) {
                this[k] = args[k];
            }
        }
    }
})(window.App);
