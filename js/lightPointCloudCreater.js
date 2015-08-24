define(function () {
    var radius = 301;

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
    window.count = window.count || {};

    function pc(vertice, material) {
        // console.log(vertice, material);
        var geometry = new THREE.Geometry();
        for (var i in vertice) {
            var ver = lonlatToVec(vertice[i][1], vertice[i][0]);
            // geometry.vertices.push(ver);

            var times = parseInt(vertice[i][2] / 10000);
            times = Math.min(times, 1);
            times = Math.max(times, 1);
            // times = 10;
            for (var i = 0; i < times; i++) {
                geometry.vertices.push(ver);
            }

        }
        return new THREE.PointCloud(geometry, new THREE.PointCloudMaterial(material));
    }
    return pc;
});
