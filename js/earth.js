define(function() {
    var earth = new THREE.Object3D();
    var light = new THREE.AmbientLight(0x888888)
    earth.add(light)
    var light = new THREE.DirectionalLight(0xcccccc, 1)
    light.position.set(0, 4000, 0)
    earth.add(light)

    var geometry = new THREE.SphereGeometry(300, 100, 50);
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthmap1k.png')
    });

    material.bumpMap = THREE.ImageUtils.loadTexture('img/earthbump1k.png')
    material.bumpScale = 0.05

    material.specularMap = THREE.ImageUtils.loadTexture('img/earthspec1k.png')
    material.specular = new THREE.Color('#333')

    var mesh = new THREE.Mesh(geometry, material);
    earth.add(mesh)

    var cloudGeometry = new THREE.SphereGeometry(310, 100, 50)
    var cloudMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('img/earthcloudmap.png'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthWrite  : false,
    })
    var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    earth.add(cloudMesh);

    earth.rotateY(-Math.PI/2)
    return earth;

    ////////////////

    var earthGeo = new THREE.SphereGeometry(300 * 0.99, 100, 50);
    var earth = THREE.SceneUtils.createMultiMaterialObject(earthGeo, [
        new THREE.MeshPhongMaterial({
            color: 0xfefefe,
            transparent: true,
            opacity: 0.5,
            combine: THREE.MultiplyOperation,
            name: 'earth1'
        }),
        new THREE.MeshBasicMaterial({
            color: 0x002A52,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            name: 'earth2'
        }),
        new THREE.MeshBasicMaterial({
            color: 0xf0f0f0,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
            wireframe: true,
            side: THREE.FrontSide,
            name: 'earth3'
        }),
    ]);
    return earth;
});
