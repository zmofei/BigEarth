define(function () {
    var earth = new THREE.Object3D();
    var light = new THREE.AmbientLight(0xFFFFFF)
    earth.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 4000, 0)
    earth.add(light)

    var geometry = new THREE.SphereGeometry(300, 100, 50);
    var material = new THREE.MeshPhongMaterial({
        // map: THREE.ImageUtils.loadTexture('img/earthmap1k.png')
        map: THREE.ImageUtils.loadTexture('img/night.png')
    });

    // material.bumpMap = THREE.ImageUtils.loadTexture('img/earthbump1k.png')
    // material.bumpScale = 0.05

    material.specularMap = THREE.ImageUtils.loadTexture('img/earthspec1k.png')
    material.specular = new THREE.Color('#444')

    var mesh = new THREE.Mesh(geometry, material);
    earth.add(mesh)

    // cloud
    var cloudGeometry = new THREE.SphereGeometry(310, 100, 50)
    var cloudMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthcloudmap.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
    })
    var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    earth.add(cloudMesh);
    //
    earth.rotateY(-Math.PI / 2);

    requirejs(['renderFcts'], function (fcts) {
        fcts.listen(function () {
            cloudMesh.rotateY(0.0002);
            //
            var x = camera.position.x;
            var y = camera.position.y;
            var z = camera.position.z;
            var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 2);
            var alpha;
            if (d >= 600) {
                alpha = 1
            } else if (d <= 470) {
                alpha = 0.2
            } else {
                alpha = (d - 470) / (600 - 470) * 0.8 + 0.2;
            }
            cloudMesh.material.opacity = alpha;
        })
    });

    return earth;

    ////////////////
});
