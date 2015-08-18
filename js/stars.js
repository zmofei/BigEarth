define(function() {
    var geometry = new THREE.Geometry();

    for (i = 0; i < 100000; i++) {

        var vertex = new THREE.Vector3();
        var width = 50000;
        vertex.x = width * 2 * Math.random() - width;
        vertex.y = width * 2 * Math.random() - width;
        vertex.z = width * 2 * Math.random() - width;

        geometry.vertices.push(vertex);

    }

    material = new THREE.PointCloudMaterial({
        size: 200,
        color: 0xFFFFFF,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        sizeAttenuation: true,
        map: THREE.ImageUtils.loadTexture(
            "img/star.png"
        ),
    });
    // material.color.setHSL(1.0, 0.3, 0.7);

    particles = new THREE.PointCloud(geometry, material);

    return particles;
});
