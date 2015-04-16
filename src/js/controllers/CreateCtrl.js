(function(App) {
    App.CreateCtrl = new App.BaseCtrl(function () {
        App.Game.add.sprite(0, 0, 'baddie');
        App.level.LevelOne = new App.level.BaseLevel();
        // App.level.LevelOne
    });
})(window.App);
