class BaseLevel {

    constructor(options) {
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


    createGrid() {
        for (var y = 0; y < _private(this).numRows; y++) {
            this.grid.push([]);

            for (var x = 0; x < _private(this).numCols; x++) {
                this.grid[y].push({
                    type: Math.random() < 0.9 ? _private(this).TYPE_EMPTY : _private(this).TYPE_WALL,
                    entity: null,
                });
            }
        }
    }

    draw() {
        this.bmd.clear();
        var ctx = this.bmd.ctx;
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';//'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        ctx.fillStyle = 'white';
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                ctx.beginPath();
                ctx.rect(
                    x * _private(this).colSize, y * _private(this).rowSize,
                    _private(this).colSize, _private(this).rowSize);
                ctx.closePath();
                if (this.grid[y][x].type == _private(this).TYPE_WALL) {
                    ctx.fill();
                }
                ctx.stroke();
            }
        }
        this.bmd.render();
    }

    prepForPathfinding() {
        var pGrid = [];
        for (var y = 0; y < this.grid.length; y++) {
            pGrid.push(_.pluck(this.grid[y], 'type'));
        }
        return pGrid;
    }

   findPath(startX, startY, endX, endY) {
        _private(this).easystar.setGrid(this.prepForPathfinding());

        _private(this).easystar.setAcceptableTiles([0]);
        // _private(this).easystar.enableDiagonals();

        _private(this).easystar.findPath(startX, startY, endX, endY, function (path) {
            App.path = path;
        });
        _private(this).easystar.calculate();
    }
};
