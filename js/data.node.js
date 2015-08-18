var fs = require('fs');
var radius = 300;
fs.readFile('lnglat_china.data', function(err, data) {
    console.log('data load ok');
    var data = data.toString();
    console.log('data formating');
    var datas = data.split('\n');
    var ret = {};
    datas.map(function(val, index) {
        var _d = val.split('\t');
        if (_d[2]) {
            var x = parseInt(_d[0] * 100).toString(36);
            var y = parseInt(_d[1] * 100).toString(36);
            var count = parseInt(_d[2] * 100).toString(36);
            ret[count] = ret[count] || []
            ret[count].push(x)
            ret[count].push(y)
        }
    });
    var retStr = '';
    for (var i in ret) {
        retStr += i + '|' + ret[i] + '\n';
    }
    console.log('data formated');
    console.log('saving');
    console.log(ret.length);
    fs.writeFile('./_test.data', retStr, function(err) {
        console.log('saved');
    });

    // function lonlatToVec(lon, lat) {
    //     var y = radius * Math.sin(lon * Math.PI / 180);
    //     var newRadius = radius * Math.cos(lon * Math.PI / 180);
    //     var x = newRadius * Math.sin(lat * Math.PI / 180);
    //     var z = newRadius * Math.cos(lat * Math.PI / 180);
    //     x = parseInt(x * 100).toString(36);
    //     y = parseInt(y * 100).toString(36);
    //     z = parseInt(z * 100).toString(36);

    //     var vertice = [x, y, z];
    //     return vertice;
    // }
});
