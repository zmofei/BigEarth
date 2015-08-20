define(['arrayPersent', 'lightPointCloudCreater'], function (arrayPersent, lc) {
    var light = new THREE.Object3D();
    var twinkle = new THREE.Object3D();
    light.add(twinkle);
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
        var material = {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.1,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        };
        //
        var verArr = arrayPersent('60,60,60,60,60,60,60,10,3,3', ret);

        for (var i in verArr) {
            var useMaterial = material;
            useMaterial.size = 1;
            useMaterial.opacity = (parseInt(i) + 1) * 0.1;
            var ligthLayer = lc(verArr[i], useMaterial);
            ligthLayer.name = i;
            light.add(ligthLayer);
            // twinkle
            if (i > 6) {
                useMaterial.size = 2;
                useMaterial.opacity = 1;
                var ligthLayer = lc(verArr[i], useMaterial);
                ligthLayer.name = 'tk_' + i;
                twinkle.add(ligthLayer)
            }
        }

        // for (var i in light.children) {
        //         moveStar(light.children[i]);
        // }

        // console.log(light.children)
        var time = 0;
        requirejs(['renderFcts'], function (fcts) {
            fcts.listen(function () {
                time++;
                if (time >= 99999) {
                    time = 0;
                }
                if (time % (60 * 1) === 0) {
                    for (var i in twinkle.children) {
                        moveStar(twinkle.children[i]);
                    }
                }
            })
        });

        console.timeEnd('total');
    });

    function moveStar(geo) {
        // console.log(geo.geometry.vertices);
        for (var i in geo.geometry.vertices) {
            if (Math.random() < 0.5) {
                geo.geometry.vertices[i].x = 0
                geo.geometry.vertices[i].y = 0
                geo.geometry.vertices[i].z = 0
            } else {
                geo.geometry.vertices[i].x = geo.geometry.vertices[i]._x
                geo.geometry.vertices[i].y = geo.geometry.vertices[i]._y
                geo.geometry.vertices[i].z = geo.geometry.vertices[i]._z
            }
        }
        geo.geometry.verticesNeedUpdate = true
    }

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
