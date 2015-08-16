define(function() {

    function Fcts() {
        this.listenList = {};
    }

    Fcts.prototype.listen = function(fn) {
        // add listen
        var self = this;
        var id = (Math.random() * 10e4 | 0).toString(36) + (+new Date()).toString(36);
        self.listenList[id] = fn;
        return id;
    }

    Fcts.prototype.update = function() {
        // console.log('update');
        // update all the lesten
        var self = this;
        for (var i in self.listenList) {
            self.listenList[i] && self.listenList[i]();
        }
    }

    return new Fcts();
});
