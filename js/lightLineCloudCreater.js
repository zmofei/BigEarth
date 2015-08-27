define(function () {
    var radius = 301;

    function lonlatToVec(lon, lat, radius) {
        var y = radius * Math.sin(lon * Math.PI / 180);
        var newRadius = radius * Math.cos(lon * Math.PI / 180);
        var x = newRadius * Math.sin(lat * Math.PI / 180);
        var z = newRadius * Math.cos(lat * Math.PI / 180);
        return [x, y, z];
    }
    window.count = window.count || {};

    function pc(vertice, material) {

        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({
            vertexColors: THREE.VertexColors,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.1,
            transparent: true,
        });

        var positions = new Float32Array(vertice.length * 3 * 2);
        var colors = new Float32Array(vertice.length * 3 * 2);

        for (var i in vertice) {
            var pos = lonlatToVec(vertice[i][1], vertice[i][0], 300 + (vertice[i][0] / 100) * 200);
            positions[(i * 2) * 3] = pos[0]
            positions[(i * 2) * 3 + 1] = pos[1]
            positions[(i * 2) * 3 + 2] = pos[2]
            colors[(i * 2) * 3] = 1;
            colors[(i * 2) * 3 + 1] = 1;
            colors[(i * 2) * 3 + 2] = 1;

            // var pos = lonlatToVec(vertice[i][1], vertice[i][0], 350);
            positions[(i * 2 - 1) * 3] = 0
            positions[(i * 2 - 1) * 3 + 1] = 0
            positions[(i * 2 - 1) * 3 + 2] = 0
            colors[(i * 2 - 1) * 3] = 1;
            colors[(i * 2 - 1) * 3 + 1] = 1;
            colors[(i * 2 - 1) * 3 + 2] = 1;
            // var geometry = new THREE.Geometry();
            // geometry.vertices.push(
            //     lonlatToVec(vertice[i][1], vertice[i][0], 300),
            //     lonlatToVec(vertice[i][1], vertice[i][0], 400)
            // );
            // var line = new THREE.Line(geometry, material);
            // lineGroup.add(line);
        }
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingSphere();

        mesh = new THREE.Line(geometry, material);
        return mesh;
    }
    return pc;
});
