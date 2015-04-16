(function(App) {
    var TYPE_EMPTY = 0;
    var TYPE_WALL = 1;
    var colSize = 10;
    var rowSize = 10;
    var numCols = 40;
    var numRows = 40;

    App.level = {};
    App.level.BaseLevel = function () {

        this.grid = [];
        this.bmd = App.Game.add.bitmapData(300, 300);
        this.createGrid();
        // this.draw();
        App.Game.add.sprite(0, 0, this.bmd);
    };

    App.level.BaseLevel.prototype.createGrid = function () {
        for (var y = 0; y < numRows; y++) {
            this.grid.push([]);

            for (var x = 0; x < numCols; x++) {
                this.grid[y].push({
                    type: Math.random() < 0.9 ? TYPE_EMPTY : TYPE_WALL,
                    entity: null,
                });
            }
        }
    }

    App.level.BaseLevel.prototype.draw = function () {
        this.bmd.clear();
        var ctx = this.bmd.ctx;
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';//'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        ctx.fillStyle = 'white';
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                ctx.beginPath();
                ctx.rect(
                    x * colSize, y * rowSize,
                    colSize, rowSize);
                ctx.closePath();
                if (this.grid[y][x].type == TYPE_WALL) {
                    ctx.fill();
                }
                ctx.stroke();
            }
        }
        this.bmd.render();
    }

})(window.App);
