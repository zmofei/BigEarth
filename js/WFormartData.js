onmessage = function (msg) {

    var data = msg.data.data;
    var datas = data.split('\n');
    var ret = [];
    datas.map(function (val, index) {
        if (val.length >= 3) {
            ret.push(val.split('\t'));
        }
    })
    postMessage({
        'data': ret
    })

}
