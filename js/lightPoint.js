define(['arrayPersent', 'lightPointCloudCreater'], function (arrayPersent, lc) {
    var light = new THREE.Object3D();
    var geometrySmall = new THREE.Geometry();
    var geometryBig = new THREE.Geometry();

    var radius = 300;

    function lonlatToVec(lon, lat) {
        var y = radius * Math.sin(lon * Math.PI / 180);
        var newRadius = radius * Math.cos(lon * Math.PI / 180);
        var x = newRadius * Math.sin(lat * Math.PI / 180);
        var z = newRadius * Math.cos(lat * Math.PI / 180);

        var vertice = new THREE.Vector3(x, y, z);
        vertice._x = x;
        vertice._y = y;
        vertice._z = z;
        return vertice;
    }

    // get data
    console.time('get data');
    $.get('js/lnglat_china.data', function (data) {
        console.timeEnd('get data');
        console.time('format data');
        var datas = data.split('\n');
        var ret = [];
        datas.map(function (val, index) {
            if (val.length >= 3) {
                ret.push(val.split('\t'));
            }
        })
        console.timeEnd('format data');

        ret.sort(function (a, b) {
            // console.log(a)
            return parseInt(a[2]) - parseInt(b[2])
        });
        console.info('the data and length is :', ret, ret.length);

        // put data to geometry

        //
        var verArr = arrayPersent('6,6,6,6,6,6,3,1', ret);
        var materialOptions = [{
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.1,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.2,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.3,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.4,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.5,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.6,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.7,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }, {
            size: 2,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.8,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }]

        for (var i in verArr) {
            var ligthLayer = lc(verArr[i], materialOptions[i]);
            light.add(ligthLayer);
        }

        console.timeEnd('total');
    });


    // animate
    // setInterval(function () {
    //     for (var i in geometryBig.vertices) {
    //         if (Math.random() < 0.5) {
    //             geometryBig.vertices[i].x = 0
    //             geometryBig.vertices[i].y = 0
    //             geometryBig.vertices[i].z = 0
    //         } else {
    //             geometryBig.vertices[i].x = geometryBig.vertices[i]._x
    //             geometryBig.vertices[i].y = geometryBig.vertices[i]._y
    //             geometryBig.vertices[i].z = geometryBig.vertices[i]._z
    //         }
    //     }
    //     geometryBig.verticesNeedUpdate = true
    // }, 1000);

    return light;
})
