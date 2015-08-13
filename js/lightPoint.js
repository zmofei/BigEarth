define(function() {
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
    $.get('js/lnglat_china.data', function(data) {
        console.timeEnd('get data');
        console.time('format data');
        var datas = data.split('\n');
        var ret = [];
        datas.map(function(val, index) {
            ret.push(val.split('\t'));
        })
        console.timeEnd('format data');
        console.log(ret)

        // put data to geometry
        for (var i in ret) {
            var ver = lonlatToVec(ret[i][1], ret[i][0]);
            if (ret[i][2] < 400000) {
                geometrySmall.vertices.push(ver);
            } else if (ret[i][2] > 400000) {
                geometryBig.vertices.push(ver);
            }
        }
        //
        var meshSmall = new THREE.PointCloud(geometrySmall, new THREE.PointCloudMaterial({
            size: 0.5,
            color: 'skyblue',
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.4,
            transparent: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }));
        meshSmall.name = "small";
        var meshBig = new THREE.PointCloud(geometryBig, new THREE.PointCloudMaterial({
            size: 2,
            color: 0xFFFFFF,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            sizeAttenuation: true,
            map: THREE.ImageUtils.loadTexture(
                "img/particle.png"
            ),
        }));
        meshBig.name = "big";
        light.add(meshSmall);
        light.add(meshBig);

        camera.position.x = 434.25;
        camera.position.y = 251.38;
        camera.position.z = -108.54;

        console.timeEnd('total');
    });


    // animate
    setInterval(function() {
        for (var i in geometryBig.vertices) {
            if (Math.random() < 0.5) {
                geometryBig.vertices[i].x = 0
                geometryBig.vertices[i].y = 0
                geometryBig.vertices[i].z = 0
            } else {
                geometryBig.vertices[i].x = geometryBig.vertices[i]._x
                geometryBig.vertices[i].y = geometryBig.vertices[i]._y
                geometryBig.vertices[i].z = geometryBig.vertices[i]._z
            }
        }
        geometryBig.verticesNeedUpdate = true
    }, 1000);

    return light;
})
