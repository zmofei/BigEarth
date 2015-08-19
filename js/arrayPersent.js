define(function () {
    var arrRank = function (present, array) {
        var per = present.split(',');
        var total = 0;
        for (var i in per) {
            total += parseInt(per[i]);
        };

        var lenArr = [];
        var infactIen = 0;
        for (var i in per) {
            var len = Math.floor(parseInt(per[i]) / total * array.length);
            lenArr.push(len);
            infactIen += len;
        };

        if (infactIen !== array.length) {
            console.info('the result number is not fit the oright array length');
        }
        var result = [];
        var useArr = [].concat(array);
        for (var i in lenArr) {
            result.push(useArr.splice(0, lenArr[i]));
        }
        return result;
    }

    return arrRank;
});
