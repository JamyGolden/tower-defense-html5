window.App = window.App || {};
(function(App) {
    var _mapper = [];

    App.BaseKeyMapper = function(args) {
        if (typeof args === 'object') {
            for (var k in args) {
                this[k] = args[k];
            }
        }
    }

    App.BaseKeyMapper.prototype.addObj = function(item) {
        _mapper.append(item);
    }

    App.BaseKeyMapper.prototype.removeObjById = function(id) {
        var index;
        var item = _.find(_mapper, function(obj, i) {
            if (obj.id === id) {
                index = i;
                return true;
            } else {
                return false;
            }
        });

        _mapper.splice(index, 1);
    }

    App.BaseKeyMapper.prototype.removeObjBy = function(args) {
        var result = _(_mapper)
            .chain()
            .where(args)
            .reverse()
            .value();

        _.each(result, function(item){
            var index = _.indexOf(_mapper, item);
            _mapper.splice(index, 1)
        });
    }

    App.BaseKeyMapper.prototype.getAll = function() {
        return _mapper;
    }

    App.BaseKeyMapper.prototype.removeAll = function() {
        _mapper.length = 0;
    }

    App.BaseKeyMapper.prototype.getObjectbyId = function(id) {
        var item = _.find(_mapper, {id: id});
        //console.timeEnd('BaseServiceFactory(' + this.name + ').getById');
        return item;
    }

    App.BaseKeyMapper.prototype.hasObject = function(args) {
        console.log('hello')
    }

    App.BaseKeyMapper.prototype.getFirst = function() {
        console.log('hello')
    }

    App.BaseKeyMapper.prototype.getLast = function() {
        console.log('hello')
    }

    App.BaseKeyMapper.prototype.getNext = function() {
        console.log('hello')
    }

    App.BaseKeyMapper.prototype.getPrevious = function() {
        console.log('hello')
    }

    App.BaseKeyMapper.prototype.numberOfObjs = function() {
        console.log('hello')
    }



})(window.App);
