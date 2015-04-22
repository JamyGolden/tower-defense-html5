"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (preload, create, update) {
    App.Game = new Phaser.Game(800, 600, Phaser.AUTO);

    var GameState = function GameState() {
        this.preload = App.PreloadCtrl;
        this.create = App.CreateCtrl;
        this.update = App.UpdateCtrl;
    };

    App.Game.state.add("game", GameState, true);
})(App.preload, App.create, App.update);

(function (App) {
    App.BaseCtrl = function (args) {

        // if (typeof args === 'object') {
        //     for (var k in args) {
        //         this[k] = args[k];
        //     }
        // }
        return args;
    };
})(window.App);

var BaseEntity = function BaseEntity() {
    _classCallCheck(this, BaseEntity);
};

window.App = window.App || {};
(function (App) {
    var _mapper = [];

    App.BaseKeyMapper = function (args) {
        if (typeof args === "object") {
            for (var k in args) {
                this[k] = args[k];
            }
        }
    };

    App.BaseKeyMapper.prototype.addObj = function (item) {
        _mapper.append(item);
    };

    App.BaseKeyMapper.prototype.removeObjById = function (id) {
        var index;
        var item = _.find(_mapper, function (obj, i) {
            if (obj.id === id) {
                index = i;
                return true;
            } else {
                return false;
            }
        });

        _mapper.splice(index, 1);
    };

    App.BaseKeyMapper.prototype.removeObjBy = function (args) {
        var result = _(_mapper).chain().where(args).reverse().value();

        _.each(result, function (item) {
            var index = _.indexOf(_mapper, item);
            _mapper.splice(index, 1);
        });
    };

    App.BaseKeyMapper.prototype.getAll = function () {
        return _mapper;
    };

    App.BaseKeyMapper.prototype.removeAll = function () {
        _mapper.length = 0;
    };

    App.BaseKeyMapper.prototype.getObjectbyId = function (id) {
        var item = _.find(_mapper, { id: id });
        //console.timeEnd('BaseServiceFactory(' + this.name + ').getById');
        return item;
    };

    App.BaseKeyMapper.prototype.hasObject = function (args) {
        console.log("hello");
    };

    App.BaseKeyMapper.prototype.getFirst = function () {
        console.log("hello");
    };

    App.BaseKeyMapper.prototype.getLast = function () {
        console.log("hello");
    };

    App.BaseKeyMapper.prototype.getNext = function () {
        console.log("hello");
    };

    App.BaseKeyMapper.prototype.getPrevious = function () {
        console.log("hello");
    };

    App.BaseKeyMapper.prototype.numberOfObjs = function () {
        console.log("hello");
    };
})(window.App);

var BaseLevel = (function () {
    function BaseLevel(options) {
        _classCallCheck(this, BaseLevel);

        createPrivateState(this);

        _private(this).easystar = new EasyStar.js();
        _private(this).TYPE_EMPTY = 0;
        _private(this).TYPE_WALL = 1;
        _private(this).colSize = 30;
        _private(this).rowSize = 30;
        _private(this).numCols = 40;
        _private(this).numRows = 40;

        this.grid = [];
        this.bmd = App.Game.add.bitmapData(900, 900);
        this.createGrid();
        // this.draw();
        App.Game.add.sprite(0, 0, this.bmd);
        App.level = {};
    }

    _createClass(BaseLevel, {
        createGrid: {
            value: function createGrid() {
                for (var y = 0; y < _private(this).numRows; y++) {
                    this.grid.push([]);

                    for (var x = 0; x < _private(this).numCols; x++) {
                        this.grid[y].push({
                            type: Math.random() < 0.9 ? _private(this).TYPE_EMPTY : _private(this).TYPE_WALL,
                            entity: null });
                    }
                }
            }
        },
        draw: {
            value: function draw() {
                this.bmd.clear();
                var ctx = this.bmd.ctx;
                ctx.lineWidth = 1;
                ctx.strokeStyle = "white"; //'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
                ctx.fillStyle = "white";
                for (var y = 0; y < this.grid.length; y++) {
                    for (var x = 0; x < this.grid[y].length; x++) {
                        ctx.beginPath();
                        ctx.rect(x * _private(this).colSize, y * _private(this).rowSize, _private(this).colSize, _private(this).rowSize);
                        ctx.closePath();
                        if (this.grid[y][x].type == _private(this).TYPE_WALL) {
                            ctx.fill();
                        }
                        ctx.stroke();
                    }
                }
                this.bmd.render();
            }
        },
        prepForPathfinding: {
            value: function prepForPathfinding() {
                var pGrid = [];
                for (var y = 0; y < this.grid.length; y++) {
                    pGrid.push(_.pluck(this.grid[y], "type"));
                }
                return pGrid;
            }
        },
        findPath: {
            value: function findPath(startX, startY, endX, endY) {
                _private(this).easystar.setGrid(this.prepForPathfinding());

                _private(this).easystar.setAcceptableTiles([0]);
                // _private(this).easystar.enableDiagonals();

                _private(this).easystar.findPath(startX, startY, endX, endY, function (path) {
                    App.path = path;
                });
                _private(this).easystar.calculate();
            }
        }
    });

    return BaseLevel;
})();

;

(function (App) {
    App.CreateCtrl = new App.BaseCtrl(function () {
        App.baddie = App.Game.add.sprite(0, 0, "baddie");
        App.baddie.scale.set(0.5, 0.5);

        var levelOne = new LevelOne();
        levelOne.draw();

        App.level = {
            levelOne: new BaseLevel()
        };
        App.level.levelOne.findPath(0, 0, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30));
    });
})(window.App);

(function (App) {
    App.PreloadCtrl = new App.BaseCtrl(function () {
        var x = this.game.load.image("baddie", "/assets/img/baddie.jpg");
    });
})(window.App);

(function (App) {
    var it = 0;

    App.UpdateCtrl = new App.BaseCtrl(function () {
        var path = App.path;
        var baddie = App.baddie;

        baddie.x = path[it].x * 30;
        baddie.y = path[it].y * 30;
        it++;
        if (it >= path.length - 1) it = 0;
    });
})(window.App);

App.privateState = new WeakMap();

function createPrivateState(o) {
    App.privateState.set(o, {});
}

function _private(o) {
    // "private" is a reserved keyword
    return App.privateState.get(o);
}

var LevelOne = (function (_BaseLevel) {
    function LevelOne(options) {
        _classCallCheck(this, LevelOne);

        _get(Object.getPrototypeOf(LevelOne.prototype), "constructor", this).call(this, options);
    }

    _inherits(LevelOne, _BaseLevel);

    return LevelOne;
})(BaseLevel);
//# sourceMappingURL=app.js.map