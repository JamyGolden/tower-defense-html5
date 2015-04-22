(function(preload, create, update) {
    App.Game = new Phaser.Game(800, 600, Phaser.AUTO);

    var GameState = function() {
        this.preload = App.PreloadCtrl;
        this.create = App.CreateCtrl;
        this.update = App.UpdateCtrl;
    }

    App.Game.state.add('game', GameState, true);

})(App.preload, App.create, App.update);
