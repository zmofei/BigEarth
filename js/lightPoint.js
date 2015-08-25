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
    $.get('js/lnglat_china2.data', function (data) {
        // console.time('worker format data');
        // //
        // var myWorkder = new Worker('js/WFormartData.js');
        // myWorkder.onmessage = function (argument) {
        //     console.timeEnd('worker format data');
        //     // console.log('ret', argument);
        // }
        // myWorkder.postMessage({
        //     'data': data
        // });
        //
        console.timeEnd('get data');
        // return false
        console.time('format data');
        var datas = data.split('\n');
        var ret = [];
        datas.map(function (val, index) {
            if (val.length >= 3) {
                ret.push(val.split('\t'));
            }
        })
        ret.sort(function (a, b) {
            // console.log(a)
            return parseInt(a[2]) - parseInt(b[2])
        });
        console.timeEnd('format data'); //3400
        // console.info('the data and length is :', ret, ret.length);
        console.time('render point');
        // put data to geometry
        var material = {
            size: 1,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.1,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle5.png"
            ),
        };
        //
        var verArr = arrayPersent('60,60,60,60,60,60,60,10,3,3', ret);
        var border = 6;
        for (var i in verArr) {
            var useMaterial = material;
            if (i <= border) {
                useMaterial.size = 0.8;
                useMaterial.opacity = (parseInt(i) + 1) * 0.1;
                // useMaterial.opacity = 1;
                var ligthLayer = lc(verArr[i], useMaterial);
                ligthLayer.name = i;
                light.add(ligthLayer);
            }

            // twinkle
            if (i > border) {
                useMaterial.size = 3;
                useMaterial.opacity = 1;
                // useMaterial.map = THREE.ImageUtils.loadTexture(
                //     "img/particle.jpg"
                // );
                var ligthLayer = lc(verArr[i], useMaterial);
                // ligthLayer.name = 'tk_' + i;
                twinkle.add(ligthLayer)
            }
        }
        console.timeEnd('render point'); //5000
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

    return light;
})
