(function(App) {
    console.log('y');
    App.PreloadCtrl = new App.BaseCtrl(function () {
        var x = this.game.load.image('baddie', '/assets/img/baddie.jpg');
    });
})(window.App);
