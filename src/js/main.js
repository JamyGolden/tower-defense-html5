console.log('x');
(function(preload, create, update) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO);

    var GameState = function() {
        this.preload = App.PreloadCtrl;
        this.create = App.CreateCtrl;
        this.update = App.UpdateCtrl;
    }
    console.log(App.UpdateCtrl);
    game.state.add('game', GameState, true);
    App.Game = game;

})(App.preload, App.create, App.update);
