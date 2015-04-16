(function(App) {
    console.log('y');
    App.PreloadCtrl = new App.BaseCtrl(function () {
        this.game.load.image('baddie', '/assets/img/baddie.jpg');
    });
})(window.App);
