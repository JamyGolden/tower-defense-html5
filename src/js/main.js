// (function(preload, create, update) {
//     import Game from Game;

//     var GameState = function() {
//         this.preload = App.PreloadCtrl;
//         this.create = App.CreateCtrl;
//         this.update = App.UpdateCtrl;
//     }

//     App.Game.state.add('game', GameState, true);

// })(App.preload, App.create, App.update);
// import Game from 'base/Game';
class Main {

    constructor () {
        var GameState = function() {
            this.preload = preload;
            this.create = create;
            this.update = update;
        }
        Game.state.add('game', GameState, true);
    }

    preload () {
        console.log('preloading');
    }

    create () {
        console.log('create');  
    }

    update () {
        console.log('update');  
    }
}

module.exports = {};