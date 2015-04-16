(function(App) {
    App.CreateCtrl = new App.BaseCtrl(function () {
        App.baddie = App.Game.add.sprite(0, 0, 'baddie');
        App.baddie.scale.set(0.5, 0.5);
        App.level.LevelOne = new App.level.BaseLevel();
        App.level.LevelOne.findPath(0,0, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30));
    });
})(window.App);
